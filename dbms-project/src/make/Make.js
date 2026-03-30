import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MakeStoryCard from "./MakeStoryCard";
import {
    getPromptByIdThunk, getPassageByIdThunk,
    createPassageThunk, getNextPassagesThunk,
    publishStoryThunk, getAllThemesThunk
} from "../stories/stories-thunks";
import { useNavigate, useParams } from "react-router-dom";

export default function Make() {
    const { currentUser } = useSelector((state) => state.auth);
    const { prompt } = useSelector((state) => state.stories);
    const { nextPassages } = useSelector((state) => state.stories);

    const { passageId, promptId } = useParams();

    const [passage, setPassage] = useState({});
    const [newPassage, setNewPassage] = useState({});
    const [content, setContent] = useState('');
    const [failed, setFailed] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [themes, setThemes] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (passageId) {
                const passageAction = await dispatch(getPassageByIdThunk(passageId));
                setPassage(passageAction.payload);
                dispatch(getPromptByIdThunk(passageAction.payload.prompt));
            } else {
                setPassage(null);
                dispatch(getPromptByIdThunk(promptId));
            }
            dispatch(getNextPassagesThunk({ previousPassageId: passageId, promptId }));
            const themesAction = await dispatch(getAllThemesThunk());
            setThemes(themesAction.payload.map(t => t.name));
            setContent('');
            setFailed(false);
        }
        fetchData();
    }, [passageId]);

    const createPassage = async () => {
        if (!content.trim()) return;
        const passageToCreate = {
            text: content,
            username: currentUser.username,
            previousPassage: passageId,
            prompt: prompt.id
        };
        try {
            const action = await dispatch(createPassageThunk(passageToCreate));
            navigate('/make/' + action.payload.id);
        } catch {
            setFailed(true);
        }
    };

    const beginPublishing = () => {
        if (!content.trim()) return;
        setNewPassage({
            text: content,
            username: currentUser.username,
            previousPassage: passageId,
            prompt: prompt.id
        });
        setPublishing(true);
        setFailed(false);
    };

    const publishStory = async () => {
        if (!title.trim() || !description.trim()) return;
        try {
            const action = await dispatch(publishStoryThunk({
                passage: newPassage,
                title,
                description,
                themes: selectedThemes
            }));
            navigate('/details/' + action.payload);
        } catch {
            setFailed(true);
            setPublishing(false);
        }
    };

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        setSelectedThemes(prev =>
            checked ? [...prev, value] : prev.filter(o => o !== value)
        );
    };

    return (
        <div className="sc-page">
            <h1 className="sc-page-title" style={{ textAlign: 'left', marginBottom: '6px' }}>
                {publishing ? 'Publish your story' : (passage ? 'Continue the story' : 'Begin the story')}
            </h1>
            <p className="sc-page-subtitle" style={{ textAlign: 'left', marginBottom: '32px' }}>
                {publishing
                    ? 'Give your story a title and description'
                    : (passage ? 'Add the next passage or branch from another' : 'Write the opening passage')}
            </p>

            {/* Prompt card */}
            {prompt && <MakeStoryCard passage={prompt} />}

            {publishing ? (
                <div>
                    {failed && <p className="sc-error">That passage already exists — check below.</p>}

                    {newPassage && (
                        <div style={{ margin: '20px 0' }}>
                            <div className="sc-passage-connector">│</div>
                            <MakeStoryCard passage={newPassage} />
                        </div>
                    )}

                    <div className="sc-publish-panel">
                        <h3 className="sc-publish-title">Story details</h3>

                        <div className="sc-field">
                            <label className="sc-label">Title</label>
                            <input
                                className="sc-input"
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Give your story a title"
                            />
                        </div>

                        <div className="sc-field">
                            <label className="sc-label">Description</label>
                            <textarea
                                className="sc-textarea"
                                rows="3"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="A short description of your story"
                            />
                        </div>

                        <div className="sc-field">
                            <label className="sc-label">Themes</label>
                            <div className="sc-checkbox-grid">
                                {themes.map(theme => (
                                    <div key={theme} className="sc-checkbox-pill">
                                        <input
                                            type="checkbox"
                                            id={`theme-${theme}`}
                                            value={theme}
                                            checked={selectedThemes.includes(theme)}
                                            onChange={handleCheckbox}
                                        />
                                        <label htmlFor={`theme-${theme}`}>{theme}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sc-btn-row" style={{ marginTop: '20px' }}>
                            <button className="sc-btn sc-btn-primary" onClick={publishStory}
                                disabled={!title.trim() || !description.trim()}>
                                Publish Story
                            </button>
                            <button className="sc-btn sc-btn-ghost"
                                onClick={() => setPublishing(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* Current passage (back-navigation) */}
                    {passage && (
                        <div style={{ margin: '20px 0' }}>
                            <div className="sc-passage-connector">│</div>
                            <div
                                className="sc-passage link-passage"
                                onClick={() => {
                                    if (passage.previous_passage) {
                                        navigate('/make/' + passage.previous_passage);
                                    } else {
                                        navigate('/make/begin/' + prompt.id);
                                    }
                                }}>
                                <div className="sc-passage-author">
                                    {passage.username}
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                                        · click to go back
                                    </span>
                                </div>
                                <p className="sc-passage-text">{passage.text}</p>
                            </div>
                        </div>
                    )}

                    {/* Writing area */}
                    {currentUser ? (
                        <div style={{ margin: '20px 0' }}>
                            <div className="sc-passage-connector">│</div>
                            <div className="sc-editor-wrap">
                                <div className="sc-editor-header">
                                    <span className="sc-editor-dot" />
                                    Your passage
                                </div>
                                <textarea
                                    className="sc-editor-textarea"
                                    rows="6"
                                    value={content}
                                    placeholder="Write your passage here…"
                                    onChange={e => setContent(e.target.value)}
                                />
                            </div>

                            {failed && <p className="sc-error">That passage already exists — check the options below.</p>}

                            <div className="sc-btn-row">
                                <button className="sc-btn sc-btn-ghost" onClick={createPassage}
                                    disabled={!content.trim()}>
                                    Finish Passage
                                </button>
                                <button className="sc-btn sc-btn-primary" onClick={beginPublishing}
                                    disabled={!content.trim()}>
                                    Publish Story →
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontStyle: 'italic', margin: '24px 0' }}>
                            Log in to contribute to this story.
                        </p>
                    )}

                    {/* Other passages to branch from */}
                    {nextPassages && nextPassages.length > 0 && (
                        <div style={{ marginTop: '32px' }}>
                            <hr className="sc-divider" />
                            <p style={{
                                fontFamily: 'var(--font-ui)',
                                fontSize: '0.78rem',
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                marginBottom: '16px'
                            }}>
                                Or continue from another passage
                            </p>
                            {nextPassages.map(p => (
                                <div
                                    key={p.id}
                                    className="sc-passage link-passage"
                                    style={{ marginBottom: '12px' }}
                                    onClick={() => navigate('/make/' + p.id)}>
                                    <div className="sc-passage-author">{p.username}</div>
                                    <p className="sc-passage-text">{p.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
