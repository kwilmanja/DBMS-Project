import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    deleteReviewThunk,
    findReviewsFromTrailIDThunk,
    updateReviewThunk
} from "../reviews/review-thunks";
import {Link} from "react-router-dom";
import {formatDate} from "../utility";

function DetailsReview({review}) {

    const {currentUser} = useSelector((state) => state.auth);
    const {currentFollowed, currentFollower} = useSelector((state) => state.follows);

    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState();

    const dispatch = useDispatch();


    const link = {
        "text-decoration": "none",
        "color": "black"
    }




    return(
        <div>

            {review && (review.public || currentFollowed.includes(review.username)
            || (currentUser && currentUser.username === review.username)) &&
                <div>
                 {editing ?

                  <div>
                  <button className="btn btn-success float-end" type="button"
                          id="button-addon2"
                          onClick={async () => {
                              setEditing(false);
                              dispatch(updateReviewThunk({
                                                             ...review,
                                                             content: editContent
                                                         }));
                          }}>Save
                  </button>

                  <textarea
                      cols="50"
                      rows="2"
                      value={editContent}
                      onChange={(event) => {
                          setEditContent(event.target.value);
                      }}
                  />
                  </div>




                          :
                  <div>
                      {currentUser && (currentUser.username === review.username
                                       || currentUser.role === "admin") &&
                                   <div>

                                       <button className="btn btn-danger float-end" type="button"
                                               id="button-addon2"
                                               onClick={async () => {
                                                   await dispatch(deleteReviewThunk(review._id));
                                                   dispatch(
                                                       findReviewsFromTrailIDThunk(review.trailID));
                                               }}>Delete
                                       </button>
                                       <button className="btn btn-warning float-end" type="button"
                                               id="button-addon2"
                                               onClick={async () => {
                                                   setEditing(true)
                                                   setEditContent(review.content)
                                               }}>Edit
                                       </button>
                                   </div>
                      }

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
                  </div>
                 }
             </div>
            }


        </div>
    );
}

export default DetailsReview;