import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {findAllReviewsThunk, findReviewsFromUsernameThunk} from "../reviews/review-thunks";
import {Link} from "react-router-dom";
import DetailsReview from "../details/DetailsReview";
import {trailSearchID} from "../trails/trail-service";
import {findReviewsFromUsername} from "../reviews/review-service";
import {collectTrailIDs, findTrails} from "../utility";
import UserReview from "./UserReview";
import HomeTrailCard from "../home/HomeTrailCard";



function UserReviewList({username}) {
    const [userReviews, setUserReviews] = useState(null);
    const [trails, setTrails] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserReviews = async () => {
        // dispatch(findReviewsFromUsernameThunk(username));
        const reviewsAction = await dispatch(findReviewsFromUsernameThunk(username));
        const reversedReviews = reviewsAction.payload;
        const reviews = reversedReviews.slice();
        reviews.reverse();
        setUserReviews(reviews);
        const trailIDs = collectTrailIDs(reviews);
        const newTrails = await findTrails(trailIDs)
        setTrails(newTrails);
    }

    useEffect(() => {
        getUserReviews();
    }, [username]);

    const link = {
        "text-decoration": "none",
        "color": "black"
    }


    return (
        <div>
            <h1>User Ride Reviews:</h1>


            {trails && userReviews &&
             (
                 <div className="row">
                         {trails.map(trail =>
                             <div className="col-12 col-md-6 col-xl-4">
                                 <HomeTrailCard trail={trail} reviews={userReviews}/>

                                 {/*{userReviews*/}
                                 {/*    .filter(review => trail.id.toString() === review.trailID)*/}
                                 {/*    .map(review =>*/}
                                 {/*        <div className="col-12 col-md-4 col-xl-3">*/}
                                 {/*             <UserReview className="d-inline" review={review}/>*/}
                                 {/*        </div>*/}
                                 {/*    )}*/}
                             </div>

                         )
                            // <li>{review.content}</li>
                         // <Link to={'/details/' + review.trailID} style={link}>
                         //      <div className="card border-primary mb-3">
                         //          <div className="card-body">
                         //              <h4 className="card-title">{review.trailName}</h4>
                         //              <p className="card-text">{review.content}</p>
                         //          </div>
                         //      </div>
                         // </Link>
                         }


                 </div>
             )}

        </div>
    );

}
export default UserReviewList;