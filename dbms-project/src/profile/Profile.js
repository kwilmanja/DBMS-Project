import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import * as authService from "../users/auth-service";



function Profile() {
    const { username } = useParams();
    const { currentUser } = useSelector((state) => state.auth);


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
                setProfile(user);
            } else if (currentUser){
                setProfile(currentUser);
            } else{
                navigate("/");
            }
        }
        fetchData();
    }, [username, currentUser]);

    return (

        <div>
            {profile && (
                <div className="row mt-3 mb-3" >
                     <div className="col-8">
                         <h1>{profile.username}'s Profile</h1>
                         <h4>Email: {profile.email}</h4>
                         <h4>Phone Number: {profile.phone_no}</h4>
                         {currentUser && profile &&
                          ((currentUser.username === profile.username) ?
                                  <button className="btn btn-dark" onClick={edit}>Edit</button>
                                : <h1> Other Profile </h1>)
                         }

                     </div>
                </div>
            )}

        </div>
    );

}
export default Profile;