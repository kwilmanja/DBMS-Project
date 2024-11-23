import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    createReviewThunk,
    deleteReviewThunk,
    findReviewsFromTrailIDThunk
} from "../reviews/review-thunks";
import {findFollowedThunk, findFollowerThunk} from "../follows/follows-thunks";
import {Link} from "react-router-dom";
import {trailSearchID, trailSearchLatLng} from "../trails/trail-service";
import DetailsReview from "./DetailsReview";
import DetailsTrail from "./DetailsTrail";

function Details() {

    const {currentUser} = useSelector((state) => state.auth);
    const {listedReviews} = useSelector((state) => state.reviews);

    const {trailID} = useParams();
    const [trail, setTrail] = useState();
    //const [trail, setTrail] = useState({_id: trailID, name: 'MockTrail'});

    const [content, setContent] = useState('');
    const [privacy, setPrivacy] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        findTrailReviews();
        findTrailByID();
    }, []);


    const post = () => {
        if(content.length === 0){
            return;
        }
        const review ={
            content: content,
            username: currentUser.username,
            trailID: trailID,
            trailName: trail.name,
            public: privacy
        }

        dispatch(createReviewThunk(review));
        findTrailReviews()
        setContent('');
    }

    const findTrailByID = async () => {
        if(!trail){
            console.log("Calling API");
            const response = await trailSearchID(trailID);
            const trail = response.data[0];
            setTrail(trail);
        }
    }

    const findTrailReviews = () => {
        dispatch(findReviewsFromTrailIDThunk(trailID));
    }

    const textboxStyle = {
        "width": "70%"
    }

    const privacyStyle = {
        "position": "relative",
        "top": "7px",
        "left": "10px"
    }

    return (
        <div className="mb-5">
            {trail && (
                <div>

                    <DetailsTrail trail={trail}/>

                    <hr/>

                    <div>
                        {currentUser && (
                            <div>
                                <div>
                                <h5>Write a Review: </h5>
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

                                    <span className="form-check float-end" style={privacyStyle}>
                                        <label className="form-check-label"
                                               htmlFor="flexCheckChecked">
                                            public
                                        </label>
                                        <input className="form-check-input" type="checkbox"
                                               checked={privacy}
                                               onChange={() => setPrivacy(!privacy)}/>
                                    </span>

                                    <div>

                                        <button type="button" className="btn btn-primary d-inline" onClick={post}>
                                                Post Review</button>
                                    </div>



                                </div>



                            </div>

                        )}
                    </div>

                    <hr/>

                    <div>

                        {listedReviews.map(review =>
                            <DetailsReview review={review}/>
                        )}




                    </div>
                </div>
                )}

        </div>
    );
}

export default Details;