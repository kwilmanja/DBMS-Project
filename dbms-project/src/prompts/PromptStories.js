import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getAllStoriesByPromptIdThunk, getPromptByIdThunk } from "../stories/stories-thunks.js";
import HomeStoryCard from "../home/HomeStoryCard.js";


export default function PromptStories() {

  const { currentUser } = useSelector((state) => state.auth);
  const { promptId } = useParams();
  const [prompt, setPrompt] = useState();
  const [stories, setStories] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const storiesAction = await dispatch(getAllStoriesByPromptIdThunk(promptId));
        const stories = storiesAction.payload.slice();
        setStories(stories);
        const promptAction = await dispatch(getPromptByIdThunk(promptId));
        const prompt = promptAction.payload;
        setPrompt(prompt)
      } catch (error) {
        if (error.response) {
          console.log('Error status:', error.response.status);
          console.log('Error Message', error.message);
        } else if (error.request) {
          console.log('No response received:', error.request);
        } else {
          console.log('Error:', error.message);
        }
      }
    }
    fetchData();
  }, []);

  const header = {
    "color": "white",
    "text-shadow": "-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000"
  }

  const background = {
    "background-image": "url('images/bike2.jpg')",
    "background-size": "cover",
    "background-repeat": "no-repeat",
    "background-position": "center center"
  }

  const handleCreateStoryClick = () => {
    navigate("/make/begin/" + promptId);
  }

  return (stories && prompt &&
    <div className="row" style={background}>
      <div className="col-auto col-md-10 col-lg-8 col-xl-6">
        <h1 className="text-center" style={header}>
          {prompt.name}
        </h1>

        {currentUser && 
          <button className="create-story" onClick={handleCreateStoryClick}>
            Create new story
          </button>
        }

        <h3 className="text-center" style={header}>Published Stories:</h3>

        <div>
          {stories && stories.map((story) =>
            <HomeStoryCard key={story.id} story={story} />
          )}
        </div>

      </div>

    </div>
  );
}



