import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {findAllUsersThunk, profileThunk} from "../users/auth-thunks";
import {findAllReviewsThunk} from "../reviews/review-thunks";


function Admin() {
    const { currentUser } = useSelector((state) => state.auth);

    const [profiles, setProfiles] = useState([]);
    const [reviews, setReviews] = useState([]);



    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {

                const profilesAction = await dispatch(findAllUsersThunk());
                setProfiles(profilesAction.payload);

                const reviewsAction = await dispatch(findAllReviewsThunk());
                setReviews(reviewsAction.payload);

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);


    return (

        <div>
            <h1>Admin App Management</h1>
            {currentUser && currentUser.isAdmin && (
                <div>
                    <h1>Welcome {currentUser.username}</h1>

                    <h1>Users: </h1>
                    <ul>
                        {profiles.map(profile => <li>{profile.username}</li>)}
                    </ul>

                    <h1>Reviews: </h1>
                    <ul>
                        {reviews.map(review => <li>{review.content} - {review.username}</li>)}
                    </ul>


                </div>



            )}

        </div>
    );

}
export default Admin;