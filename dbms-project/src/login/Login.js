import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk } from "../users/auth-thunks";
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failed, setFailed] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        
        const loginAction = await dispatch(loginThunk({ username, password }));
        if(loginAction.error){
            setFailed(true);
            return;
        }

        navigate("/profile");
    };

    return (
        <div>
            <h1>Login</h1>
            {failed && (<p>Failed to login with username and password</p>)}
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