import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {registerThunk, loginThunk} from "../users/auth-thunks";
function Register() {
    const [credentials, setCredentials] = useState(
        {
            username: '',
        password: '',
        email: '',
        phone_no: '',
        role: 'user',
        isAdmin: false
        });


    const [invalid, setInvalid] = useState('');
    const [failed, setFailed] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = async () => {
        try {

            setInvalid('');
            setFailed(false);

            if (credentials.username.length > 100){
                setInvalid("Username is too long");
                return;
            } else if (credentials.password.length > 100){
                setInvalid("Password is too long");
                return;
            }else if(credentials.email.length > 100){
                setInvalid("Email is too long");
                return;
            } else if (credentials.phone_no.length > 10){
                setInvalid("Phone number is too long");
                return;
            }
            
            if (credentials.username.length === 0){
                setInvalid("Username must not be blank");
                return;
            } else if (credentials.password.length === 0){
                setInvalid("Password must not be blank");
                return;
            }else if(credentials.email.length === 0){
                setInvalid("Email must not be blank");
                return;
            } else if (credentials.phone_no.length === 0){
                setInvalid("Phone number must not be blank");
                return;
            }
            

            const registrationAction = await dispatch(registerThunk(credentials));
            if(registrationAction.error){
                setFailed(true);
                return;
            }

            await dispatch(loginThunk(credentials));
            navigate("/profile");
        } catch (e) {
            alert(e);
        }
    };
    return (
        <div>
            <h1>Register</h1>
            {failed && (<p>Duplicate Username!</p>)}
            {invalid && (invalid !== '') && (<p>{invalid}</p>)}

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
                <label>Email</label>
                <input className="form-control"
                       type="text" value={credentials.email}
                       onChange={(event) => {
                           const newCreds = {
                               ...credentials,
                               email: event.target.value,
                           };
                           setCredentials(newCreds);
                       }}
                />
            </div>
            <div>
                <label>Phone Number</label>
                <input className="form-control"
                       type="text" value={credentials.phone_no}
                       onChange={(event) => {
                           const newCreds = {
                               ...credentials,
                               phone_no: event.target.value,
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