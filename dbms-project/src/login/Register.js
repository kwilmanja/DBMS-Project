import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerThunk, loginThunk } from "../users/auth-thunks";

function Register() {
    const [credentials, setCredentials] = useState({
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

    const update = (field) => (e) =>
        setCredentials(prev => ({ ...prev, [field]: e.target.value }));

    const handleRegister = async () => {
        setInvalid('');
        setFailed(false);

        if (!credentials.username) return setInvalid('Username is required');
        if (!credentials.password) return setInvalid('Password is required');
        if (!credentials.email)    return setInvalid('Email is required');
        if (credentials.username.length > 100) return setInvalid('Username too long');
        if (credentials.password.length > 100) return setInvalid('Password too long');
        if (credentials.email.length > 100)    return setInvalid('Email too long');
        if (credentials.phone_no.length > 10)  return setInvalid('Phone number too long');

        try {
            const regAction = await dispatch(registerThunk(credentials));
            if (regAction.error) { setFailed(true); return; }
            await dispatch(loginThunk(credentials));
            navigate('/profile');
        } catch (e) {
            setFailed(true);
        }
    };

    return (
        <div className="sc-page-centered">
            <div className="sc-form" style={{ maxWidth: '520px' }}>
                <h1 className="sc-form-title">Create account</h1>
                <p className="sc-form-subtitle">Join the collaborative storytelling community</p>

                {failed && <p className="sc-error" style={{ marginBottom: '16px' }}>That username is already taken.</p>}
                {invalid && <p className="sc-error" style={{ marginBottom: '16px' }}>{invalid}</p>}

                <div className="sc-field">
                    <label className="sc-label">Username</label>
                    <input className="sc-input" type="text" value={credentials.username}
                        onChange={update('username')} autoFocus autoComplete="username" />
                </div>

                <div className="sc-field">
                    <label className="sc-label">Password</label>
                    <input className="sc-input" type="password" value={credentials.password}
                        onChange={update('password')} autoComplete="new-password" />
                </div>

                <div className="sc-field">
                    <label className="sc-label">Email</label>
                    <input className="sc-input" type="email" value={credentials.email}
                        onChange={update('email')} autoComplete="email" />
                </div>

                <div className="sc-field">
                    <label className="sc-label">Phone Number <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                    <input className="sc-input" type="tel" value={credentials.phone_no}
                        onChange={update('phone_no')} autoComplete="tel" />
                </div>

                <div className="sc-field">
                    <label className="sc-label">Role</label>
                    <select
                        className="sc-select"
                        value={credentials.role}
                        onChange={(e) => setCredentials(prev => ({
                            ...prev,
                            role: e.target.value,
                            isAdmin: e.target.value === 'admin'
                        }))}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    className="sc-btn sc-btn-primary sc-btn-full"
                    style={{ marginTop: '8px' }}
                    onClick={handleRegister}
                    disabled={!credentials.username || !credentials.password || !credentials.email}>
                    Create Account
                </button>

                <p style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)'
                }}>
                    Already have an account?{' '}
                    <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
