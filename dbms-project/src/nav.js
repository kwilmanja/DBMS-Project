import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "./users/auth-thunks";
import React from "react";

function Nav() {
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sc-nav">
            <Link className="sc-nav-brand" to="/">Story Colab</Link>

            <ul className="sc-nav-links">
                <li>
                    <Link
                        className={`sc-nav-link${isActive('/') ? ' accent' : ''}`}
                        to="/">Stories</Link>
                </li>
                <li>
                    <Link
                        className={`sc-nav-link${isActive('/prompts') ? ' accent' : ''}`}
                        to="/prompts">Prompts</Link>
                </li>

                {currentUser && (
                    <li>
                        <Link
                            className={`sc-nav-link${isActive('/profile') ? ' accent' : ''}`}
                            to="/profile">
                            {currentUser.username}
                        </Link>
                    </li>
                )}

                {currentUser && currentUser.isAdmin && (
                    <li>
                        <Link className="sc-nav-link" to="/admin">Admin</Link>
                    </li>
                )}

                {!currentUser && (
                    <>
                        <li>
                            <Link className="sc-nav-link" to="/login">Login</Link>
                        </li>
                        <li>
                            <Link className="sc-nav-link accent" to="/register">Register</Link>
                        </li>
                    </>
                )}

                {currentUser && (
                    <li>
                        <Link
                            className="sc-nav-link"
                            to="/login"
                            onClick={() => dispatch(logoutThunk())}>
                            Logout
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Nav;
