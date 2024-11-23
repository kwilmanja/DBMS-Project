import React from "react";
import {Link} from "react-router-dom";
const TrailCard = ({trail}) => {


    const characterLimit = 650;

    const photoSize = {
        "height": "200px",
    };

    const inline = {
        "display": "inline"
    }

    const bar = {
        "width": trail.rating/0.05 + '%'
    }

    const bar2 = {
        "width": '40%',
        // "display": "inline"
    }

    const card = {
        "width": "550px",
        "height": "640px"
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
        <div className="col">
            <div className="card mb-3 ms-4 me-4" style={card}>
                <div className="card-header align-items-center" style={inline}>
        <Link to={'/details/' + trail.id} style={link}>
                        <h3 style={inline}>{trail.name} - </h3>
                        <p style={inline}> {trail.city}, {trail.region} </p>
        </Link>
                </div>
                <img style={photoSize} src={trail.thumbnail} alt={''}/>

                <div className="card-body row" >
                    <div className="col">
                        <h5 className="card-title">Difficulty: {trail.difficulty}</h5>
                        <h6 className="card-subtitle text-muted">Length: {trail.length} miles</h6>
                    </div>

                    <div className="col">
                        <div className="progress float-end ms-1" style={bar2}>
                            <div className="progress-bar" role="progressbar"
                                 aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={bar}></div>
                        </div>
                        <h6 className="card-subtitle text-muted float-end">Rating: </h6>
                    </div>
                </div>

                <div className="card-body" style={adjustment}>
                    <p className="card-text">{trail.description.length < characterLimit ? trail.description :
                    trail.description.substring(0, characterLimit) + '...'
                    }</p>
                </div>

            </div>
        </div>

    );
};
export default TrailCard;