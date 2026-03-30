import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLikeThunk, deleteLikeThunk, getStoryLikesThunk } from "../comments/comment-thunks";

const LikeButton = ({ storyId }) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const { likes } = useSelector((state) => state.likes);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const userLiked = likes.some(like => like.username === currentUser.username);
        setIsLiked(userLiked);
    }, [likes, currentUser]);

    const handleToggle = async () => {
        if (isLiked) {
            await dispatch(deleteLikeThunk(storyId));
            setIsLiked(false);
        } else {
            await dispatch(createLikeThunk(storyId));
            setIsLiked(true);
        }
        dispatch(getStoryLikesThunk(storyId));
    };

    return (
        <button
            className={`sc-like-btn${isLiked ? ' liked' : ''}`}
            onClick={handleToggle}
            aria-label={isLiked ? 'Unlike story' : 'Like story'}>
            <span className="heart">{isLiked ? '♥' : '♡'}</span>
            {isLiked ? 'Liked' : 'Like'}
        </button>
    );
};

export default LikeButton;
