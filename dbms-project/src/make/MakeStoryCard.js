import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as authService from "../users/auth-service";

const MakeStoryCard = ({ passage }) => {

    const { currentUser } = useSelector((state) => state.auth);

    const photoSize = {
        "height": "200px",
    };

    const inline = {
        "display": "inline"
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

    return(
        <>
        {passage &&
            <div className="col">
                <div className="card mb-3" style={card}>

                    {passage.name ? 
                <div className="card-header align-items-center" style={inline}>
                    <h5 style={inline}>Prompt: {passage.name}</h5>
                </div>
                :
                <div className="card-header align-items-center" style={inline}>
                    <h5 style={inline}>Passage: {passage.username}</h5>
                </div>
                }

                

                    <div className="card-body">
                        
                        <h6 className="card-subtitle">{passage.text} </h6>
                    

                    </div>

                </div>
            </div>
        }
        </>

    );
};
export default MakeStoryCard;