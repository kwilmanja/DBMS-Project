import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {findFollowedThunk, findFollowerThunk} from "./follows-thunks";
import {profileThunk} from "../users/auth-thunks";
import {Link} from "react-router-dom";
import {findUserByUsername} from "../users/auth-service";
import {current} from "@reduxjs/toolkit";
import {findFollowed, findFollower} from "./follows-service";



function FollowerFollowed({username}) {

    const {currentFollowed} = useSelector((state) => state.follows);


    const [follower, setFollower] = useState(null);
    const [followed, setFollowed] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getFollowInformation = async () => {
        const followerInfo = await findFollower(username);
        const followedInfo = await findFollowed(username);
        setFollowed(followedInfo);
        setFollower(followerInfo);
    }

    // const borderStyle = {
    //     "border-style": "solid",
    //     "border-width": "4px",
    //     "border-color": "blue",
    //     "border-radius": "20px",
    //     "padding": "20px"
    // }



    useEffect(() => {
        getFollowInformation();
    }, [username, currentFollowed]);

    return (
        <div className="text-center">
            {(follower && followed) &&
             (
             <div className="me-4">
                    <h2>Following: </h2>
                 <ul>
                    {followed &&
                     followed.map(follow =>
                         <p
                         onClick={async () => {
                             navigate(`/profile/${follow.followed}`);
                         }}
                         >{follow.followed}</p>
                        )}
                 </ul>
                    <h2>Followers: </h2>
                 <ul>
                    {follower &&
                     follower.map(follow => <p onClick={() => {
                         navigate(`/profile/${follow.follower}`)
                     }}
                    >{follow.follower}</p>)}
                 </ul>


                </div>
            )}

        </div>
    );

}
export default FollowerFollowed;