import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import DetailsReview from "../details/DetailsReview";
import {findAllReviewsThunk} from "../reviews/review-thunks";
import HomeReview from "./HomeReview";
import * as authService from "../users/auth-service";
const HomeTrailCard = ({trail, reviews}) => {

    const { currentUser } = useSelector((state) => state.auth);
    const {currentFollowed, currentFollower} = useSelector((state) => state.follows);


    const characterLimit = 650;

    const photoSize = {
        "height": "200px",
    };

    const inline = {
        "display": "inline"
    }

    const bar = {
        "width": trail.rating/0.05 + '%'
    }

    const bar2 = {
        "width": '40%',
        // "display": "inline"
    }

    const card = {
        "width": "100%",
    }

    const adjustment = {
        "position": "relative",
        "top": "-30px"
    }

    const link = {
        "text-decoration": "none",
        "color": "black"
    }

    const filterReviews = () =>
        reviews.filter((review) =>
                              (trail.id.toString() === review.trailID &&
                               (review.public
                                || currentFollowed.includes(review.username)
                                || (currentUser &&
                                    (currentUser.username === review.username
                                     || currentUser.role === "admin")))
                              )
        )



    return(
        <>
        {reviews && filterReviews().length > 0 &&
            <div className="col">
                <div className="card mb-3" style={card}>
                    <div className="card-header align-items-center" style={inline}>
                        <Link to={'/details/' + trail.id} style={link}>
                            <h3 style={inline}>{trail.name} - </h3>
                            <p style={inline}> {trail.city}, {trail.region} </p>
                        </Link>
                    </div>
                    {trail.thumbnail && <img style={photoSize} src={trail.thumbnail} alt={''}/>}

                    <div className="card-body row">
                        <div className="col">
                            <h5 className="card-title">Difficulty: {trail.difficulty}</h5>
                            <h6 className="card-subtitle text-muted">Length: {trail.length} miles</h6>
                        </div>

                        <div className="col">
                            <div className="progress float-end ms-1" style={bar2}>
                                <div className="progress-bar" role="progressbar"
                                     aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                                     style={bar}></div>
                            </div>
                            <h6 className="card-subtitle text-muted float-end">Rating: </h6>
                        </div>
                    </div>

                    <div className="card-body" style={adjustment}>
                        <p className="card-text">{trail.description.length < characterLimit
                                                  ? trail.description :
                                                  trail.description.substring(0, characterLimit) + '...'
                        }</p>
                    </div>

                    <ul className="list-group list-group-flush">
                        {filterReviews()
                            .map((review) =>
                                     <HomeReview review={review}/>
                            )

                        }
                    </ul>


                </div>
            </div>
        }
        </>

    );
};
export default HomeTrailCard;