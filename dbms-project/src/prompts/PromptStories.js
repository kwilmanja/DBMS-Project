import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoryMetadataThunk, getStoryPassagesThunk } from "../stories/stories-thunks.js";
import { getPromptById, getStoryPassages } from "../stories/stories-service.js";
import DetailsPassageCard from "./DetailsPassageCard.js";
import { header } from "../style/styles.js";


export default function PromptStories() {

  const { currentUser } = useSelector((state) => state.auth);
  // //const {listedReviews} = useSelector((state) => state.reviews);

  const { promptId } = useParams();
  const [prompt, setPrompt] = useState();
  const [stories, setStories] = useState();

  const [content, setContent] = useState('');
  // const [privacy, setPrivacy] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const promptAction = await dispatch(getPromptByIdThunk(promptId));
      const prompt = promptAction.payload;
      setPrompt(prompt);
      const storiesAction = await dispatch(getStoryPassagesThunk(storyId));
      const passages = passagesAction.payload.slice();
      setPassages(passages);
    }
    fetchData();
  }, []);


  const post = () => {
    if (content.length === 0) {
      return;
    }

    // const review ={
    //     content: content,
    //     username: currentUser.username,
    //     trailID: trailID,
    //     trailName: trail.name,
    //     public: privacy
    // }

    setContent('');
  }


  const textboxStyle = {
    "width": "70%"
  }

  const privacyStyle = {
    "position": "relative",
    "top": "7px",
    "left": "10px"
  }

  return (
    <div className="mb-5">
      {story && passages && (


        <div className="row">

          <div className="col-md-1 col-lg-2 col-xl-3">

          </div>





          <div className="col-auto col-md-10 col-lg-8 col-xl-6">
            <h3 className="text-center" style={header}>{story.title} </h3>





            {passages && passages.map((passage) =>
              <DetailsPassageCard passage={passage} />
            )}

            <hr />

            {/* <div>
                        {currentUser && (
                            <div>
                                <div>
                                <h5>Write a Review: </h5>
                                <textarea
                                    style={textboxStyle}
                                    rows="4"
                                    value={content}
                                    onChange={(event) => {
                                        setContent(event.target.value);
                                    }}
                                />
                            </div>
                                <div style={textboxStyle}>
                                    <div>
                                        <button type="button" className="btn btn-primary d-inline" onClick={post}>
                                                Post Review</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> */}

            <hr />

            {/* <div>
                        {listedReviews.map(review =>
                            <DetailsReview review={review}/>
                        )}
                    </div>                      */}
          </div>


          <div className="col-md-1 col-lg-2 col-xl-3">

          </div>

        </div>



      )}

    </div>
  );
}



