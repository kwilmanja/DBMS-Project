// import {useDispatch, useSelector} from "react-redux";
// import React, {useEffect, useState} from "react";
// import {
//     deleteReviewThunk,
//     findReviewsFromTrailIDThunk,
//     updateReviewThunk
// } from "../reviews/review-thunks";
//
// function UserReview({review}) {
//
//     const {currentUser} = useSelector((state) => state.auth);
//     const {currentFollowed, currentFollower} = useSelector((state) => state.follows);
//
//     const [editing, setEditing] = useState(false);
//     const [editContent, setEditContent] = useState();
//
//     const dispatch = useDispatch();
//
//
//
//     const formatDate = (reviewDate) => {
//         const date = new Date(reviewDate);
//         const now = Date.now();
//
//         const diffInMs = Math.abs(now - date);
//         const diffInHours = Math.floor(diffInMs / (60 * 60 * 1000));
//
//         if(diffInHours < 24){
//             return (diffInHours) + "h ago";
//         } else {
//             return "on " + date.toLocaleDateString();
//
//         }
//     }
//
//
//
//
//
//     return(
//         <div>
//             {review && (review.public
//                         || currentFollowed.includes(review.username)
//                         || (currentUser &&
//                             (currentUser.username === review.username || currentUser.role === "admin"))) &&
//              <div>
//                   <div>
//                       <figure>
//                           <blockquote className="blockquote">
//                               <p className="mb-0">{review.content}</p>
//                           </blockquote>
//                           <figcaption className="blockquote-footer">
//                               {review.username} {review.published ? formatDate(review.published) : ''}
//                           </figcaption>
//                       </figure>
//                   </div>
//              </div>
//             }
//
//
//         </div>
//     );
// }
//
// export default UserReview;