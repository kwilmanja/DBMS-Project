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
        "width": story.story_id/0.05 + '%'
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
                        <Link to={'/details/' + story.story_id} style={link}>
                            <h3 style={inline}>{story.title} </h3>
                        </Link>
                    </div>

                    <div className="card-body">
                        
                        <h6 className="card-subtitle text-muted">Prompt: </h6>

                        <div>
                            <h6 className="card-subtitle text-muted">Rating: </h6>
                            <div className="progress ms-1" style={bar2}>
                                <div className="progress-bar" role="progressbar"
                                     aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                                     style={bar}></div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="card-body" style={adjustment}>
                        <p className="card-text">{story.description}</p>
                    </div>
                </div>
            </div>
        }
        </>

    );
};
export default HomeStoryCard;