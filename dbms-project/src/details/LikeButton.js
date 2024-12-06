import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLikeThunk, deleteLikeThunk, getStoryLikesThunk } from "../comments/comment-thunks";

const LikeButton = ({ storyId }) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { likes } = useSelector((state) => state.likes);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const userLiked = likes.filter(like => like.username === currentUser.username).length > 0;
    setIsLiked(userLiked);
  }, [likes]);

  const handleLikeToggle = async () => {
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
    <button onClick={handleLikeToggle} className="btn">
      <i
        className={`bi ${isLiked ? "bi-heart-fill" : "bi-heart"}`}
        style={{ color: isLiked ? "red" : "gray", fontSize: "2rem" }}
      />
    </button>
  );
};

export default LikeButton;