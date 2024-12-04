import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk } from "../users/auth-thunks";
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        await dispatch(loginThunk({ username, password }));
        navigate("/profile");
    };

    return (
        <div>
            <h1>Login</h1>
            <div>
                <label>Username</label>
                <input className="form-control"
                       type="text" value={username}
                       onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input className="form-control"
                       type="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button className="mt-2 btn btn-info" onClick={handleLogin}>
                Login
            </button>
        </div>
    );

}
export default Login;