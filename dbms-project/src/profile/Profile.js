import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import FollowerFollowed from "../follows/FollowerFollowed";
import UserReviewList from "./UserReviewList";
import {findAllReviewsThunk} from "../reviews/review-thunks";
import * as authService from "../users/auth-service";
import {findFollowedThunk, followUserThunk, unfollowUserThunk} from "../follows/follows-thunks";



function Profile() {
    const { username } = useParams();
    const { currentUser } = useSelector((state) => state.auth);
    const {currentFollowed} = useSelector((state) => state.follows);


    const [profile, setProfile] = useState({});


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const edit = () => {
        navigate('/profile/edit');
    };

    useEffect(() => {
        async function fetchData() {
            let user;
            if(username){
                user = await authService.findUserByUsername(username);
            } else{
                user = currentUser;
            }
            setProfile(user);
        }
        fetchData();
    }, [username, currentUser, currentFollowed]);


    const handleFollow = () => {
        dispatch(followUserThunk(username));
    }

    const handleUnfollow = () => {
        dispatch(unfollowUserThunk(username));
    }


    const borderStyle = {
        // "border-left-style": "solid",
        // "border-left-width": "4px",
        // "border-left-color": "blue",
        // "border-left-radius": "20px",
        // "padding": "20px"
    }

    return (

        <div>
            {profile && (
                <>
                <div className="row mt-3 mb-3" >
                     <div className="col-8">
                         <h1>{profile.username}'s Profile</h1>
                         <h4>First Name: {profile.firstName}</h4>
                         <h4>Last Name: {profile.lastName}</h4>
                         <h4>Level: {profile.level}</h4>
                         {currentUser && profile &&
                          ((currentUser.username === profile.username) ?
                                  <button className="btn btn-dark" onClick={edit}>Edit</button>
                                :
                              (currentFollowed.includes(username)
                              ?
                               <button className="btn btn-warning" onClick={handleUnfollow}>Unfollow</button>
                              :
                               <button className="btn btn-success" onClick={handleFollow}>Follow</button>
                          ))
                         }

                     </div>

                    <div className="col-4 d-none d-sm-block" style={borderStyle}>
                        <FollowerFollowed username={profile.username}/>

                    </div>
                </div>
                {/*<UserReviewList username={profile.username}/>*/}
                </>
            )}

        </div>
    );

}
export default Profile;