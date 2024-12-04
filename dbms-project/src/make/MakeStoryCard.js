import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as authService from "../users/auth-service";

const MakeStoryCard = ({ prompt }) => {

    const { currentUser } = useSelector((state) => state.auth);

    const photoSize = {
        "height": "200px",
    };

    const inline = {
        "display": "inline"
    }

    const bar = {
        "width": prompt.id / 0.05 + '%'
    }

    const bar2 = {
        "width": '40%',
        // "display": "inline"
    }

    const card = {
        "width": "100%",
    }

    const adjustment = {
        "position": "relative",
        "top": "-30px"
    }

    const link = {
        "text-decoration": "none",
        "color": "black"
    }

    return (
        <>
            {prompt &&
                <div className="col">
                    <div className="card mb-3" style={card}>
                        <div className="card-header align-items-center" style={inline}>
                            <Link to={'/details/' + prompt.id} style={link}>
                                <h3 style={inline}>{prompt.name} </h3>
                            </Link>
                        </div>

                        <div className="card-body">

                            <div>
                                <h6 className="card-subtitle text-muted">Rating: </h6>
                                <div className="progress ms-1" style={bar2}>
                                    <div className="progress-bar" role="progressbar"
                                        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                                        style={bar}></div>
                                </div>

                                <h6 className="card-subtitle text-muted">Description: </h6>

                                <h6 className="card-subtitle text-muted">Created by: </h6>

                            </div>
                        </div>

                        <div className="card-body" style={adjustment}>
                            <p className="card-text">{prompt.description}</p>
                        </div>
                    </div>
                </div>
            }
        </>

    );
};
export default MakeStoryCard;