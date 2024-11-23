import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {registerThunk} from "../users/auth-thunks";
function Register() {
    const [credentials, setCredentials] = useState(
        {
            username: '',
        password: '',
        role: 'user',
        isAdmin: false
        });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = async () => {
        try {
            await dispatch(registerThunk(credentials));
            navigate("/profile");
        } catch (e) {
            alert(e);
        }
    };
    return (
        <div>
            <h1>Register</h1>
            <div>
                <label>Username</label>
                <input className="form-control"
                       type="text" value={credentials.username}
                       onChange={(event) => {
                           const newCreds = {
                               ...credentials,
                               username: event.target.value,
                           };
                           setCredentials(newCreds);
                       }}
                />
            </div>
            <div>
                <label>Password</label>
                <input className="form-control"
                       type="password" value={credentials.password}
                       onChange={(event) => {
                           const newCreds = {
                               ...credentials,
                               password: event.target.value,
                           };
                           setCredentials(newCreds);
                       }}
                />
            </div>
            <div>
                <label htmlFor="exampleSelect1" className="mr-2">Role</label>
                <select className="form-select" id="exampleSelect1"
                        defaultValue={credentials.role}
                        onChange={(event) => {
                            const newCreds = {
                            ...credentials,
                            role: event.target.value,
                            isAdmin: event.target.value === 'admin'
                        };
                            setCredentials(newCreds);
                        }}>
                    <option>user</option>
                    <option>admin</option>
                </select>
            </div>

            <div className="pt-2">
                <button className="btn btn-info" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    );

}
export default Register;