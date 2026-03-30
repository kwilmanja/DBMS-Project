import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginThunk } from "../users/auth-thunks";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const action = await dispatch(loginThunk({ username, password }));
        if (action.error) {
            setFailed(true);
            return;
        }
        navigate('/profile');
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') handleLogin();
    };

    return (
        <div className="sc-page-centered">
            <div className="sc-form">
                <h1 className="sc-form-title">Welcome back</h1>
                <p className="sc-form-subtitle">Sign in to continue your stories</p>

                {failed && (
                    <p className="sc-error" style={{ marginBottom: '20px' }}>
                        Invalid username or password
                    </p>
                )}

                <div className="sc-field">
                    <label className="sc-label">Username</label>
                    <input
                        className="sc-input"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyDown={handleKey}
                        autoFocus
                        autoComplete="username"
                    />
                </div>

                <div className="sc-field">
                    <label className="sc-label">Password</label>
                    <input
                        className="sc-input"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={handleKey}
                        autoComplete="current-password"
                    />
                </div>

                <button
                    className="sc-btn sc-btn-primary sc-btn-full"
                    style={{ marginTop: '8px' }}
                    onClick={handleLogin}
                    disabled={!username || !password}>
                    Sign In
                </button>

                <p style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)'
                }}>
                    No account?{' '}
                    <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
