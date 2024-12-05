import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { createPromptThunk, getAllGenresThunk, getAllStoriesByPromptIdThunk, getPromptByIdThunk } from "../stories/stories-thunks.js";
import HomeStoryCard from "../home/HomeStoryCard.js";
import { current } from "@reduxjs/toolkit";


export default function PromptCreate() {

  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [promptName, setPromptName] = useState("");
  const [promptDescription, setPromptDescription] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const genresAction = await dispatch(getAllGenresThunk())
      setGenres(genresAction.payload.map((genreObject) => (genreObject.name)));

    }

    fetchData();
  }, []);

  const handleCreatePromptClick = async () => {
    if (!promptName.trim || !promptDescription.trim()) {
      alert("Please fill out both the prompt name and description.")
      return;
    }

    if (promptName.length > 120 || promptDescription.length > 512) {
      alert("Prompt name or description exceeds the character limit.")
    }

    if (!currentUser) {
      alert("Must be logged in")
    }

    try {
      await dispatch(createPromptThunk({ name: promptName, description: promptDescription, genres: selectedGenres }));
      alert("Prompt created successfully!")
      navigate("/prompts")
    } catch (error) {
      console.error("Error creating prompt:", error);
      alert("Failed to create prompt. Please try again.")
    }
  }

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setSelectedGenres((prev) =>
      checked ? [...prev, value]
        :
        prev.filter((option) => option !== value)
    );
  };

  const header = {
    "color": "white",
    "text-shadow": "-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000"
  }

  return (
    <div className="row">

      <div className="col-md-1 col-lg-2 col-xl-3"></div>

      <div className="col-auto col-md-10 col-lg-8 col-xl-6">
        <h1 className="text-center" style={header}>Create new prompt:</h1>

        <div className="form-group">
          <label htmlFor="promptName">Prompt Name (max 128 characters):</label>
          <input
            type="text"
            id="promptName"
            className="form-control"
            value={promptName}
            onChange={(e) => setPromptName(e.target.value)}
            maxLength="128"
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="promptDescription">Description (max 512 characters):</label>
          <textarea
            id="promptDescription"
            className="form-control"
            value={promptDescription}
            onChange={(e) => setPromptDescription(e.target.value)}
            maxLength="512"
            rows="4"
          />
        </div>

        <div>
          <h3>Select Genres:</h3>
          <form>
            {genres.map((genre) => (
              <div className="form-check">
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleCheckbox}
                  className="form-check-input" />

                <label className="form-check-label">
                  {genre}
                </label>
              </div>
            ))}
          </form>
        </div>

        <button
          onClick={handleCreatePromptClick}
          className="btn btn-primary mt-4"
          disabled={!promptName.trim() || !promptDescription.trim()}
        >
          Create prompt
        </button>

      </div>

      <div className="col-md-1 col-lg-2 col-xl-3">

      </div>

    </div>
  );
}



