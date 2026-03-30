import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { createPromptThunk, getAllGenresThunk } from "../stories/stories-thunks.js";

export default function PromptCreate() {
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [promptName, setPromptName] = useState('');
    const [promptDescription, setPromptDescription] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            const action = await dispatch(getAllGenresThunk());
            setGenres(action.payload.map(g => g.name));
        }
        fetchData();
    }, []);

    const handleCreate = async () => {
        if (!promptName.trim() || !promptDescription.trim()) {
            setError('Please fill out both name and description.');
            return;
        }
        if (promptName.length > 120 || promptDescription.length > 512) {
            setError('Name or description exceeds character limit.');
            return;
        }
        if (!currentUser) {
            setError('You must be logged in.');
            return;
        }
        try {
            await dispatch(createPromptThunk({
                name: promptName,
                description: promptDescription,
                genres: selectedGenres
            }));
            navigate('/prompts');
        } catch {
            setError('Failed to create prompt. Please try again.');
        }
    };

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        setSelectedGenres(prev =>
            checked ? [...prev, value] : prev.filter(o => o !== value)
        );
    };

    return (
        <div className="sc-page">
            <h1 className="sc-page-title" style={{ textAlign: 'left', marginBottom: '8px' }}>
                Create a Prompt
            </h1>
            <p className="sc-page-subtitle" style={{ textAlign: 'left', marginBottom: '32px' }}>
                Inspire others to tell stories
            </p>

            {error && <p className="sc-error" style={{ marginBottom: '20px' }}>{error}</p>}

            <div className="sc-field">
                <label className="sc-label">Prompt Name <span style={{ color: 'var(--text-muted)' }}>max 128 chars</span></label>
                <input
                    className="sc-input"
                    type="text"
                    value={promptName}
                    onChange={e => setPromptName(e.target.value)}
                    maxLength="128"
                    placeholder="A compelling prompt title…"
                />
            </div>

            <div className="sc-field">
                <label className="sc-label">Description <span style={{ color: 'var(--text-muted)' }}>max 512 chars</span></label>
                <textarea
                    className="sc-textarea"
                    rows="5"
                    value={promptDescription}
                    onChange={e => setPromptDescription(e.target.value)}
                    maxLength="512"
                    placeholder="Describe the setting, conflict, or starting scenario…"
                />
            </div>

            <div className="sc-field">
                <label className="sc-label">Genres</label>
                <div className="sc-checkbox-grid">
                    {genres.map(genre => (
                        <div key={genre} className="sc-checkbox-pill">
                            <input
                                type="checkbox"
                                id={`genre-${genre}`}
                                value={genre}
                                checked={selectedGenres.includes(genre)}
                                onChange={handleCheckbox}
                            />
                            <label htmlFor={`genre-${genre}`}>{genre}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sc-btn-row" style={{ marginTop: '28px' }}>
                <button
                    className="sc-btn sc-btn-primary"
                    onClick={handleCreate}
                    disabled={!promptName.trim() || !promptDescription.trim()}>
                    Create Prompt
                </button>
                <button
                    className="sc-btn sc-btn-ghost"
                    onClick={() => navigate('/prompts')}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
