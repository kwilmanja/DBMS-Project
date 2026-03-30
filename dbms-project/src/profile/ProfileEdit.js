import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateUserThunk } from "../users/auth-thunks.js";

function ProfileEdit() {
    const { currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = () => {
        dispatch(updateUserThunk(profile));
        navigate('/profile');
    };

    if (!currentUser) return null;

    return (
        <div className="sc-page-centered">
            <div className="sc-form" style={{ maxWidth: '480px' }}>
                <h1 className="sc-form-title">Edit Profile</h1>
                <p className="sc-form-subtitle">{currentUser.username}</p>

                <div className="sc-field">
                    <label className="sc-label">Email</label>
                    <input
                        className="sc-input"
                        type="email"
                        value={profile.email || ''}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        autoComplete="email"
                    />
                </div>

                <div className="sc-field">
                    <label className="sc-label">Phone Number</label>
                    <input
                        className="sc-input"
                        type="tel"
                        value={profile.phone_no || ''}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone_no: e.target.value }))}
                        autoComplete="tel"
                    />
                </div>

                <div className="sc-btn-row" style={{ marginTop: '24px' }}>
                    <button className="sc-btn sc-btn-primary" onClick={save}>
                        Save Changes
                    </button>
                    <button className="sc-btn sc-btn-ghost" onClick={() => navigate('/profile')}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;
