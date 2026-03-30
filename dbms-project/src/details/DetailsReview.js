import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateCommentThunk, getStoryCommentsThunk, deleteCommentThunk } from "../comments/comment-thunks";

function DetailsReview({ comment }) {
    const { currentUser } = useSelector((state) => state.auth);
    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const dispatch = useDispatch();

    if (!comment) return null;

    const isOwner = currentUser && currentUser.username === comment.username;

    if (editing) {
        return (
            <div className="sc-comment">
                <textarea
                    className="sc-textarea"
                    rows="3"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                <div className="sc-btn-row">
                    <button
                        className="sc-btn sc-btn-success sc-btn-sm"
                        onClick={async () => {
                            setEditing(false);
                            await dispatch(updateCommentThunk({ ...comment, text: editContent }));
                            dispatch(getStoryCommentsThunk(comment.story_id));
                        }}>
                        Save
                    </button>
                    <button
                        className="sc-btn sc-btn-ghost sc-btn-sm"
                        onClick={() => setEditing(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="sc-comment">
            {isOwner && (
                <div className="sc-comment-actions">
                    <button
                        className="sc-btn sc-btn-ghost sc-btn-sm"
                        onClick={() => { setEditing(true); setEditContent(comment.text); }}>
                        Edit
                    </button>
                    <button
                        className="sc-btn sc-btn-danger sc-btn-sm"
                        onClick={async () => {
                            await dispatch(deleteCommentThunk(comment.id));
                            dispatch(getStoryCommentsThunk(comment.story_id));
                        }}>
                        Delete
                    </button>
                </div>
            )}
            <p className="sc-comment-text">{comment.text}</p>
            <div className="sc-comment-author">
                <Link to={'/profile/' + comment.username}>{comment.username}</Link>
            </div>
        </div>
    );
}

export default DetailsReview;
