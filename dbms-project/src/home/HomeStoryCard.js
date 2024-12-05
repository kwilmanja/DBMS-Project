import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as authService from "../users/auth-service";
const HomeStoryCard = ({ story }) => {

    const { currentUser } = useSelector((state) => state.auth);

    const inline = {
        "display": "inline"
    }

    const card = {
        "width": "100%",
    }

    const link = {
        "text-decoration": "none",
        "color": "black"
    }

    return (
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

                            <div className="row">
                                <div className="d-flex col">
                                    <h6 className="text-muted" style={{ marginRight: '8px' }}>Created By:</h6>
                                    <h6>{story.username}</h6>
                                </div>
                                <div className="d-flex col">
                                    <h6 className="text-muted" style={{ marginRight: '8px' }}>Likes:</h6>
                                    <h6>{story.num_likes}</h6>
                                </div>
                            </div>

                            <div className="d-flex">
                                <h6 className="text-muted" style={{ marginRight: '8px' }}>Prompt: </h6>
                                <h6 className="ml-">{story.prompt_name}</h6>
                            </div>
                            <div className="d-flex">
                                <h6 className="text-muted" style={{ marginRight: '8px' }}>Themes:</h6>
                                <h6>{story.themes}</h6>
                            </div>

                            <p className="card-text">{story.description}</p>
                        </div>
                    </div>
                </div>
            }
        </>

    );
};
export default HomeStoryCard;