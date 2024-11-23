import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {
    profileThunk,
    logoutThunk,
    updateUserThunk,
    findUserByUsernameThunk
} from "../users/auth-thunks";
import {
    findFollowedThunk,
    findFollowerThunk,
    followUserThunk,
    unfollowUserThunk
} from "../follows/follows-thunks.js";


function Profile() {
    const {username} = useParams();
    const [profile, setProfile] = useState();
    const {follower, followed} = useSelector((state) => state.follows);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProfile = async () => {
        const action = await dispatch(findUserByUsernameThunk(username))
        if(!action.payload){
            console.log("Profile not found!");
            // navigate("/");
        }
        setProfile(action.payload);
    };

    useEffect(() => {
        getProfile();
        //dispatch(findFollowerThunk(username));
        //dispatch(findFollowedThunk(username));
    }, []);

    const handleFollow = () => {
        dispatch(followUserThunk(profile.username));
    }

    const handleUnfollow = () => {
        dispatch(unfollowUserThunk(profile.username));
    }


    return (
        <div>

            <button className="btn btn-success float-end"
            onClick={handleFollow}>
                Follow
            </button>

            <button className="btn btn-success float-end"
                    onClick={handleUnfollow}>
                Unfollow
            </button>

            {profile && (
                     <div>
                         <h1>First Name: {profile.firstName}</h1>
                         <h1>Last Name: {profile.lastName}</h1>
                         <h1>Level: {profile.level}</h1>

                         <h2>Following: </h2>
                        {followed &&
                            followed.map(follow => <h1 onClick={navigate(`/profile/${follow.followed}`)}>
                        {follow.followed}</h1>)}
                            <h2>Followers: </h2>
                        {follower &&
                            follower.map(follow => <h1 onClick={navigate(`/profile/${follow.follower}`)}
                            >{follow.follower}</h1>)}
                     </div>
            )}

        </div>
    );

}
export default Profile;