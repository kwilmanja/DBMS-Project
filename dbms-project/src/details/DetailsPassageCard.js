import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import * as authService from "../users/auth-service";
const DetailsPassageCard = ({passage}) => {

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
        "top": "-30px"
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
                    <div className="card-header align-items-center" style={inline}>
                        <Link to={'/profile/' + passage.username} style={link}>
                            <h5 style={inline}>{passage.username} -</h5>
                        </Link>
                    </div>

                    <div className="card-body">
                        
                        <h6 className="card-subtitle">{passage.text} </h6>

                    </div>

                </div>
            </div>
        }
        </>

    );
};
export default DetailsPassageCard;