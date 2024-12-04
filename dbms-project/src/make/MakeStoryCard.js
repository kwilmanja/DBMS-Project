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
        "padding-top": "20px"
    }

    const link = {
        "text-decoration": "none",
        "color": "black"
    }

    return (
        <>
            {prompt &&
                <div className="col">
                    <Link to={'/details/' + prompt.id} style={link}>
                        <div className="card mb-3" style={card}>
                            <div className="card-header align-items-center" style={inline}>
                                <h3 style={inline}>{prompt.name} </h3>
                            </div>
                            <div className="card-body">

                                <div>
                                    <h6 className="card-subtitle text-muted">Rating: </h6>
                                    <div className="progress ms-1" style={bar2}>
                                        <div className="progress-bar" role="progressbar"
                                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                                            style={bar}></div>
                                    </div>

                                    <h6 className="card-subtitle text-muted" style={adjustment}>Description: </h6>
                                    <div className="prompt-description">
                                        <h7 className="prompt-desc-text">{prompt.description}</h7>
                                    </div>

                                    <h6 className="card-subtitle text-muted" style={adjustment}>Created by: </h6>
                                    <div className="prompt-creator">
                                        <h7 className="prompt-creator-text">{prompt.username}</h7>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            }
        </>

    );
};
export default MakeStoryCard;