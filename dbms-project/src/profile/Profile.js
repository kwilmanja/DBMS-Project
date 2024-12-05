import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as authService from "../users/auth-service";
import HomeStoryCard from "../home/HomeStoryCard";
import DetailsPassageCard from "../details/DetailsPassageCard";
import PromptCard from "../prompts/PromptCard";



function Profile() {
    const { username } = useParams();
    const { currentUser } = useSelector((state) => state.auth);


    const [profile, setProfile] = useState({});
    const [stories, setStories] = useState([]);
    const [passages, setPassages] = useState([]);
    const [prompts, setPrompts] = useState([]);


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const edit = () => {
        navigate('/profile/edit');
    };

    useEffect(() => {
        async function fetchData() {
            let user;
            let content;
            if (username) {
                user = await authService.findUserByUsername(username);
                setProfile(user);
                content = await authService.getUserContent(username);
                setStories(content.stories[0]);
                setPassages(content.passages);
                setPrompts(content.prompts);
            } else if (currentUser) {
                setProfile(currentUser);
                content = await authService.getUserContent(currentUser.username);
                setStories(content.stories);
                setPassages(content.passages);
                setPrompts(content.prompts);
            } else {
                navigate("/");
            }
        }
        fetchData();
    }, [username, currentUser]);

    return (

        <div>
            {profile && (
                <div className="row mt-3 mb-3" >
                    <div className="col-8">
                        <h1>{profile.username}'s Profile</h1>
                        <h4>Email: {profile.email}</h4>
                        <h4>Phone Number: {profile.phone_no}</h4>
                        {currentUser && profile &&
                            ((currentUser.username === profile.username) ?
                                <button className="btn btn-dark" onClick={edit}>Edit</button>
                                : <div />)
                        }

                        <h3>Stories:</h3>
                        {stories.length > 0 ? (
                            <ul>
                                {stories.map((story) => (
                                    <HomeStoryCard key={story.story_id} story={story} />
                                ))}
                            </ul>
                        ) : (
                            <p>No stories yet.</p>
                        )}

                        <h3>Passages:</h3>
                        {passages.length > 0 ? (
                            <ul>
                                {passages.map((passage) =>
                                    <DetailsPassageCard key={passage.id} passage={passage} />
                                )}
                            </ul>
                        ) : (
                            <p>No passages yet.</p>
                        )}

                        <h3>Prompts:</h3>
                        {prompts.length > 0 ? (
                            <ul>
                                {prompts.map((prompt) => (
                                    <PromptCard key={prompt.id} prompt={prompt} />
                                ))}
                            </ul>
                        ) : (
                            <p>No prompts yet.</p>
                        )}

                    </div>
                </div>
            )}

        </div>
    );

}
export default Profile;