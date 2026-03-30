import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getAllStoriesByPromptIdThunk, getPromptByIdThunk } from "../stories/stories-thunks.js";
import HomeStoryCard from "../home/HomeStoryCard.js";

export default function PromptStories() {
    const { currentUser } = useSelector((state) => state.auth);
    const { promptId } = useParams();
    const [prompt, setPrompt] = useState();
    const [stories, setStories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const storiesAction = await dispatch(getAllStoriesByPromptIdThunk(promptId));
                setStories(storiesAction.payload.slice());
                const promptAction = await dispatch(getPromptByIdThunk(promptId));
                setPrompt(promptAction.payload);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);

    if (!prompt) {
        return <div className="sc-page"><div className="sc-loading">Loading…</div></div>;
    }

    const genres = prompt.genres
        ? prompt.genres.split(',').map(g => g.trim()).filter(Boolean)
        : [];

    return (
        <div className="sc-page">
            <h1 className="sc-page-title" style={{ textAlign: 'left', marginBottom: '8px' }}>
                {prompt.name}
            </h1>

            {genres.length > 0 && (
                <div className="sc-tags" style={{ marginBottom: '12px' }}>
                    {genres.map((g, i) => <span key={i} className="sc-tag">{g}</span>)}
                </div>
            )}

            {prompt.description && (
                <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-dim)',
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    marginBottom: '24px'
                }}>
                    {prompt.description}
                </p>
            )}

            {currentUser && (
                <div style={{ marginBottom: '32px' }}>
                    <button
                        className="sc-btn sc-btn-primary"
                        onClick={() => navigate('/make/begin/' + promptId)}>
                        Start a story from this prompt →
                    </button>
                </div>
            )}

            <hr className="sc-divider" />

            <h3 className="sc-section-title" style={{ marginTop: '8px' }}>
                Published Stories
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 400, fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '10px' }}>
                    ({stories.length})
                </span>
            </h3>

            {stories.length === 0 ? (
                <div className="sc-empty">
                    No stories yet — be the first to write one.
                </div>
            ) : (
                stories.map(story => (
                    <div key={story.story_id} style={{ marginBottom: '16px' }}>
                        <HomeStoryCard story={story} />
                    </div>
                ))
            )}
        </div>
    );
}
