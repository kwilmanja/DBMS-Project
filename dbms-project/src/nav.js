import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "./users/auth-thunks";
import React from "react";

function Nav() {

    const { currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Stories</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarColor01" aria-controls="navbarColor01"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                                <span className="visually-hidden">(current)</span>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Search</Link>
                            </li>

                            {!currentUser &&
                             <li className="nav-item">
                                 <Link className="nav-link" to="/login">Login</Link>
                             </li>
                            }

                            {!currentUser &&
                             <li className="nav-item">
                                 <Link className="nav-link" to="/register">Register</Link>
                             </li>
                            }

                            {currentUser &&
                             <li className="nav-item">
                                 <Link className="nav-link" to="/profile">Profile</Link>
                             </li>
                            }

                            {currentUser && currentUser["isAdmin"] &&
                             <li className="nav-item">
                                 <Link className="nav-link" to="/admin">Admin</Link>
                             </li>
                            }

                            {currentUser &&
                                 <li className="nav-item">
                                     <Link className="nav-link" to="/login">
                                         <span onClick={() => {
                                             dispatch(logoutThunk());
                                         }}>Logout</span>
                                     </Link>
                                 </li>
                            }

                        </ul>

                    </div>
                </div>
            </nav>


        </div>
    );
}

export default Nav;