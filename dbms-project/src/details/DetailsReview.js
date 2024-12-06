import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { updateCommentThunk, getStoryCommentsThunk, deleteCommentThunk} from "../comments/comment-thunks";

function DetailsReview({comment}) {

    const {currentUser} = useSelector((state) => state.auth);

    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState();

    const dispatch = useDispatch();


    const link = {
        "text-decoration": "none",
        "color": "black"
    }


    return(
        <div className="mb-5">

            {comment &&
                <div>
                 {editing ?

                  <div>
                  <button className="btn btn-success float-end" type="button"
                          id="button-addon2"
                          onClick={async () => {
                                setEditing(false);
                                await dispatch(updateCommentThunk({
                                                             ...comment,
                                                             text: editContent
                                }));
                                dispatch(getStoryCommentsThunk(comment.story_id));
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
                      {currentUser && (currentUser.username === comment.username) &&
                                   <div>

                                       <button className="btn btn-danger float-end" type="button"
                                               id="button-addon2"
                                               onClick={async () => {
                                                await dispatch(deleteCommentThunk(comment.id));
                                                dispatch(getStoryCommentsThunk(comment.story_id));
                                            }}>Delete
                                       </button>
                                       <button className="btn btn-warning float-end" type="button"
                                               id="button-addon2"
                                               onClick={async () => {
                                                   setEditing(true)
                                                   setEditContent(comment.text)
                                               }}>Edit
                                       </button>
                                   </div>
                      }

                     <figure>
                         <blockquote className="blockquote">
                            <p className="mb-0">{comment.text}</p>
                         </blockquote>
                         <Link to={'/profile/' + comment.username} style={link}>
                             <figcaption className="blockquote-footer">
                             {comment.username}
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