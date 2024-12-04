import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {
    updateUserThunk,
} from "../users/auth-thunks.js";


function ProfileEdit() {
    const { currentUser } = useSelector((state) => state.auth);

    const [profile, setProfile] = useState(currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = () => {
        dispatch(updateUserThunk(profile));
        navigate('/profile');
    };


    return (

        <div>
            {currentUser && (
                <div>
                    <h1>{currentUser.username}'s Profile</h1>
                     <div>
                         <div>
                             <label>Email: </label>
                             <input type="text"
                                    value={profile.email}
                                    onChange={(event) => {
                                        const newProfile = {
                                            ...profile,
                                            email: event.target.value,
                                        };
                                        setProfile(newProfile);
                                    }}
                             />
                         </div>
                         <div>
                             <label>Phone Number: </label>
                             <input type="text"
                                    value={profile.phone_no}
                                    onChange={(event) => {
                                        const newProfile = {
                                            ...profile,
                                            phone_no: event.target.value,
                                        };
                                        setProfile(newProfile);
                                    }}
                             />
                         </div>

                     </div>

                     <button onClick={save}>Save</button>

                </div>
            )}

        </div>
    );

}
export default ProfileEdit;