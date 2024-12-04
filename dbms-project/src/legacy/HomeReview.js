import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    deleteReviewThunk,
    findReviewsFromTrailIDThunk,
    updateReviewThunk
} from "../reviews/review-thunks";
import {Link} from "react-router-dom";
import {formatDate} from "../utility";

function HomeReview({review}) {



    const link = {
        "text-decoration": "none",
        "color": "black"
    }





    return(
        <li className="list-group-item">

                      <figure>
                          <blockquote className="blockquote">
                              <p className="mb-0">{review.content}</p>
                          </blockquote>
                          <Link to={'/profile/' + review.username} style={link}>
                              <figcaption className="blockquote-footer">
                                  {review.username} {review.published ? formatDate(review.published) : ''}
                              </figcaption>
                          </Link>
                      </figure>
        </li>
    );
}

export default HomeReview;