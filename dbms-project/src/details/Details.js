import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoryMetadataThunk, getStoryPassagesThunk } from "../stories/stories-thunks";
import DetailsPassageCard from "./DetailsPassageCard.js";
import { createCommentThunk, getStoryCommentsThunk, getStoryLikesThunk } from "../comments/comment-thunks.js";
import DetailsReview from "./DetailsReview.js";
import LikeButton from "./LikeButton.js";

function Details() {
    const { currentUser } = useSelector((state) => state.auth);
    const { comments } = useSelector((state) => state.comments);
    const { likes } = useSelector((state) => state.likes);

    const { storyId } = useParams();
    const [story, setStory] = useState();
    const [passages, setPassages] = useState();
    const [content, setContent] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const metaAction = await dispatch(getStoryMetadataThunk(storyId));
            setStory(metaAction.payload);
            const passagesAction = await dispatch(getStoryPassagesThunk(storyId));
            setPassages(passagesAction.payload.slice());
            await dispatch(getStoryCommentsThunk(storyId));
            await dispatch(getStoryLikesThunk(storyId));
        }
        fetchData();
    }, []);

    const post = async () => {
        if (!content.trim()) return;
        await dispatch(createCommentThunk({ story_id: story.story_id, text: content }));
        await dispatch(getStoryCommentsThunk(storyId));
        setContent('');
    };

    if (!story || !passages) {
        return <div className="sc-page"><div className="sc-loading">Loading story…</div></div>;
    }

    const themes = story.themes
        ? story.themes.split(',').map(t => t.trim()).filter(Boolean)
        : [];

    return (
        <div className="sc-page">
            {/* Story header */}
            <h1 className="sc-page-title" style={{ textAlign: 'left', marginBottom: '6px' }}>
                {story.title}
            </h1>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px 20px',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                marginBottom: '16px'
            }}>
                {story.username && (
                    <span>by <Link to={'/profile/' + story.username}>{story.username}</Link></span>
                )}
                {story.prompt_name && <span>prompt: {story.prompt_name}</span>}
            </div>

            {themes.length > 0 && (
                <div className="sc-tags" style={{ marginBottom: '24px' }}>
                    {themes.map((t, i) => <span key={i} className="sc-tag">{t}</span>)}
                </div>
            )}

            {/* Call to action */}
            <p style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                marginBottom: '28px'
            }}>
                {currentUser
                    ? 'Click any passage to branch the story from that point.'
                    : <><Link to="/login">Login</Link> to continue the story from any passage.</>
                }
            </p>

            {/* Passages */}
            <div style={{ marginBottom: '32px' }}>
                {passages.map((passage, i) => (
                    <React.Fragment key={passage.id}>
                        <DetailsPassageCard passage={passage} />
                        {i < passages.length - 1 && (
                            <div className="sc-passage-connector">│</div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <hr className="sc-divider" />

            {/* Likes section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div className="sc-likes">
                    <span>♥</span>
                    <span>{likes.length} {likes.length === 1 ? 'like' : 'likes'}</span>
                </div>
                {currentUser && <LikeButton storyId={storyId} />}
            </div>

            <hr className="sc-divider" />

            {/* Comment form */}
            {currentUser && (
                <div style={{ marginBottom: '32px' }}>
                    <h3 className="sc-section-title" style={{ marginTop: 0 }}>Leave a comment</h3>
                    <textarea
                        className="sc-textarea"
                        rows="4"
                        value={content}
                        placeholder="Share your thoughts on this story…"
                        onChange={(e) => setContent(e.target.value)}
                        style={{ marginBottom: '12px', width: '100%' }}
                    />
                    <button className="sc-btn sc-btn-primary" onClick={post}>
                        Post Comment
                    </button>
                </div>
            )}

            {/* Comments */}
            {comments.length > 0 && (
                <div>
                    <h3 className="sc-section-title">
                        Comments <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 400, fontSize: '0.85rem', color: 'var(--text-muted)' }}>({comments.length})</span>
                    </h3>
                    {comments.map(comment => (
                        <DetailsReview key={comment.id} comment={comment} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Details;
