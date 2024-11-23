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
                             <label>First Name: </label>
                             <input type="text"
                                    value={profile.firstName}
                                    onChange={(event) => {
                                        const newProfile = {
                                            ...profile,
                                            firstName: event.target.value,
                                        };
                                        setProfile(newProfile);
                                    }}
                             />
                         </div>
                         <div>
                             <label>Last Name: </label>
                             <input type="text"
                                    value={profile.lastName}
                                    onChange={(event) => {
                                        const newProfile = {
                                            ...profile,
                                            lastName: event.target.value,
                                        };
                                        setProfile(newProfile);
                                    }}
                             />
                         </div>

                         <div>
                             <div className="d-inline">
                                 <label htmlFor="exampleSelect1" className="mr-2">Level</label>
                                 <select className="form-select" id="exampleSelect1"
                                         value={profile.level}
                                         onChange={(event) => {
                                             const newProfile = {
                                                 ...profile,
                                                 level: event.target.value,
                                             };
                                             setProfile(newProfile);
                                         }}>
                                     <option>Beginner</option>
                                     <option>Moderate</option>
                                     <option>Advanced</option>
                                     <option>Expert</option>
                                 </select>
                             </div>

                         </div>

                         {/*<div className="form-check form-switch">*/}

                         {/*    <label className="form-check-label"*/}
                         {/*           htmlFor="flexSwitchCheckDefault">Public Profile </label>*/}

                         {/*    <input className="form-check-input" type="checkbox"*/}
                         {/*           id="flexSwitchCheckDefault" checked={profile.public} onChange=*/}
                         {/*               {(event) => {*/}
                         {/*                   const newProfile = {*/}
                         {/*                       ...profile,*/}
                         {/*                       public: !profile.public,*/}
                         {/*                   };*/}
                         {/*                   setProfile(newProfile);*/}
                         {/*               }}*/}
                         {/*    />*/}
                         {/*</div>*/}

                     </div>

                     <button onClick={save}>Save</button>

                </div>
            )}

        </div>
    );

}
export default ProfileEdit;