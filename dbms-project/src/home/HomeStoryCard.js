import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import * as authService from "../users/auth-service";
const HomeStoryCard = ({story}) => {

    const { currentUser } = useSelector((state) => state.auth);

    const characterLimit = 650;

    const photoSize = {
        "height": "200px",
    };

    const inline = {
        "display": "inline"
    }

    const bar = {
        "width": story.rating/0.05 + '%'
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

    return(
        <>
        {story &&
            <div className="col">
                <div className="card mb-3" style={card}>
                    <div className="card-header align-items-center" style={inline}>
                        <Link to={'/details/'} style={link}>
                            <h3 style={inline}>{story.name} - </h3>
                            <p style={inline}> {story.author} </p>
                        </Link>
                    </div>

                    <div className="card-body row">
                        <div className="col">
                            {/* <h5 className="card-title">Difficulty: 6</h5> */}
                            <h6 className="card-subtitle text-muted">Prompt: {story.prompt}</h6>
                        </div>

                        <div className="col">
                            <div className="progress float-end ms-1" style={bar2}>
                                <div className="progress-bar" role="progressbar"
                                     aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                                     style={bar}></div>
                            </div>
                            <h6 className="card-subtitle text-muted float-end">Rating: </h6>
                        </div>
                    </div>

                    <div className="card-body" style={adjustment}>
                        <p className="card-text">{story.text}</p>
                    </div>
                </div>
            </div>
        }
        </>

    );
};
export default HomeStoryCard;