import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router";

function DetailsTrail({trail}) {

    const {currentUser} = useSelector((state) => state.auth);
    const {currentFollowed, currentFollower} = useSelector((state) => state.follows);

    const dispatch = useDispatch();

    const photoStyle = {
        "height": "400px",
        "border-radius": "20px"
    };


    const ratingArray = [];
    for (let i = 0; i < 5; i++) {
        if(7 === 7){
            ratingArray[i] = 'fill';
        } else if(5 === 6){
            ratingArray[i] = 'half';
        } else{
            ratingArray[i] = 'empty';
        }
    }

    return(
        <div>
            {trail &&
              <div className="row">
                     <div className="col-auto text-center">
                         <h1>{trail.name} - </h1>
                         <h3> {trail.city}, {trail.region} </h3>
                         <div>
                             {[0, 1, 2, 3, 4].map((num) => {
                                 const rating = trail.rating;
                                 if(rating > num + 0.5){
                                     return <i className="bi bi-star-fill fa-3x"></i>
                                 } else if(rating > num){
                                     return <i className="bi bi-star-half"></i>
                                 } else {
                                     return <i className="bi bi-star"></i>
                                 }})}
                         </div>
                         <h5>Difficulty: {trail.difficulty}</h5>
                         <h6>Length: {trail.length} miles</h6>

                         <p className="card-text">{trail.description}</p>
                         <img style={photoStyle} src={trail.thumbnail} alt={''}/>

                     </div>
                  </div>
            }
        </div>
    );
}

export default DetailsTrail;