import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoryMetadataThunk, getStoryPassagesThunk } from "../stories/stories-thunks";
import { getStoryPassages } from "../stories/stories-service";
import DetailsPassageCard from "./DetailsPassageCard.js";
import { header } from "../style/styles.js";
import { createCommentThunk, getStoryCommentsThunk, getStoryLikesThunk } from "../comments/comment-thunks.js";
import DetailsReview from "./DetailsReview.js";
import LikeButton from "./LikeButton.js";
import { current } from "@reduxjs/toolkit";


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
            const metadataAction = await dispatch(getStoryMetadataThunk(storyId));
            const metadata = metadataAction.payload;
            setStory(metadata);
            const passagesAction = await dispatch(getStoryPassagesThunk(storyId));
            const passages = passagesAction.payload.slice();
            setPassages(passages);
            await dispatch(getStoryCommentsThunk(storyId));
            await dispatch(getStoryLikesThunk(storyId));
        }
        fetchData();
    }, []);


    const post = async () => {
        if (content.length === 0) {
            return;
        }

        const review = {
            story_id: story.story_id,
            text: content
        }
        await dispatch(createCommentThunk(review));
        await dispatch(getStoryCommentsThunk(storyId));
        setContent('');
    }

    const numberOfLikes = likes.length;


    const textboxStyle = {
        "width": "100%"
    }

    const privacyStyle = {
        "position": "relative",
        "top": "7px",
        "left": "10px"
    }

    return (
        <div className="mb-5">
            {story && passages && (


                <div className="row">

                    <div className="col-md-1 col-lg-2 col-xl-3">

                    </div>





                    <div className="col-auto col-md-10 col-lg-8 col-xl-6">
                        <h3 className="text-center" style={header}>{story.title} </h3>

                        {currentUser ?
                            <p className="text-center">Click a passage below to begin creating your own story!</p>
                            :
                            <p className="text-center">Login to create your own story!</p>
                        }


                    



                        {passages && passages.map((passage) =>
                            <DetailsPassageCard passage={passage} />
                        )}

                        <hr />

                        <div>
                            <h5>Likes: {numberOfLikes}</h5>
                            {currentUser && (
                                <LikeButton storyId={storyId} />
                            )}
                        </div>

                        <div>
                            {currentUser && (
                                <div>
                                    <div>
                                        <h5>Write a Comment: </h5>
                                        <textarea
                                            style={textboxStyle}
                                            rows="4"
                                            value={content}
                                            onChange={(event) => {
                                                setContent(event.target.value);
                                            }}
                                        />
                                    </div>

                                    <div style={textboxStyle}>
                                        <div>

                                            <button type="button" className="btn btn-primary d-inline" onClick={post}>
                                                Post Comment</button>
                                        </div>



                                    </div>



                                </div>

                            )}
                        </div>

                        <hr />

                        <div>
                            {comments.map(comment =>
                                <DetailsReview comment={comment} />
                            )}
                        </div>
                    </div>


                    <div className="col-md-1 col-lg-2 col-xl-3">

                    </div>

                </div>



            )}

        </div>
    );
}

export default Details;



