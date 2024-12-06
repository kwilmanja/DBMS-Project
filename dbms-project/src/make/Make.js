import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MakeStoryCard from "./MakeStoryCard";
import { getPromptByIdThunk, getPassageByIdThunk, 
    createPassageThunk, getNextPassagesThunk, 
    publishStoryThunk,
    getAllThemesThunk} from "../stories/stories-thunks";
import { useNavigate, useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import { getNextPassages } from "../stories/stories-service";


export default function Make() {

    const { currentUser } = useSelector((state) => state.auth);
    const { prompt } = useSelector((state) => state.stories);
    const {nextPassages} = useSelector((state) => state.stories);

    const {passageId, promptId} = useParams();

    const [passage, setPassage] = useState({});
    const [newPassage, setNewPassage] = useState({});
    const [content, setContent] = useState('');
    const [failed, setFailed] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [themes, setThemes] = useState([]);


    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {

        async function fetchData() {

            if(passageId){
                const passageAction = await dispatch(getPassageByIdThunk(passageId))
                setPassage(passageAction.payload);
                dispatch(getPromptByIdThunk( passageAction.payload.prompt));
            } else{
                setPassage(null);
                dispatch(getPromptByIdThunk( promptId));
            }
    
            dispatch(getNextPassagesThunk({previousPassageId: passageId, promptId: promptId}));

            const themesAction = await dispatch(getAllThemesThunk())
            setThemes(themesAction.payload.map((themeObject) => (themeObject.name)));

            setContent('');
            setFailed(false);
        }

        fetchData();
    }, [passageId]);


    const createPassage = async () => {
        if(content.length === 0){
            return;
        }

        const passageToCreate ={
            text: content,
            username: currentUser.username,
            previousPassage: passageId,
            prompt: prompt.id
        }
        try{
            const createAction = await dispatch(createPassageThunk(passageToCreate));
            navigate('/make/' + createAction.payload.id);
        } catch (error){
            setFailed(true);
        }
    };

    const beginPublishing = async () => {
        if(content.length === 0){
            return;
        }

        const passageToAdd ={
            text: content,
            username: currentUser.username,
            previousPassage: passageId,
            prompt: prompt.id
        };

        setPublishing(true);
        setFailed(false);
        setNewPassage(passageToAdd);
    };

    const publishStory = async () => {
        if(title.length === 0 || description.length === 0){
            return;
        }

        try{
            const passageStory ={
                passage: newPassage,
                title: title,
                description: description,
                themes: selectedThemes
            };

            const publishAction = await dispatch(publishStoryThunk(passageStory));
            navigate('/details/' + publishAction.payload);
        } catch (error){
            setFailed(true);
            setPublishing(false);
        }
    };


    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        setSelectedThemes((prev) =>
            checked ? [...prev, value] 
            : 
            prev.filter((option) => option !== value)
        );
    };



    const textboxStyle = {
        "width": "100%"
    };

    const header = {
        "color": "white",
        "text-shadow":
            "-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000"
    }

    return (
        
        <div className="row" style={{ marginBottom: '50px' }}>

            
            <div className="col-md-1 col-lg-2 col-xl-3">
            </div>


            <div className="col-auto col-md-10 col-lg-8 col-xl-6">

                <h1 className="text-center" style={header}>Make a Story:</h1>
                <MakeStoryCard passage={prompt}/>

                {publishing ? 


                    

                    <div>
                        {failed && (<p>Passage already exists, look below!</p>)}

                        {newPassage &&
                            (<MakeStoryCard passage={newPassage}/>)}


                    <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title (required)"
                        required
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Enter a description (required)"
                        required
                    />
                    </div>

                    <div>
                        <h3>Select Themes:</h3>
                        <form>
                            {themes.map((theme) => (
                            <div className="form-check">
                                <input
                                type="checkbox"
                                value={theme}
                                checked={selectedThemes.includes(theme)}
                                onChange={handleCheckbox}
                                className="form-check-input"/>

                                <label className="form-check-label">
                                    {theme}
                                </label>
                            </div>
                            ))}
                        </form>
                    </div>



                        <button type="button" className="btn btn-danger d-inline float-end" onClick={() => {setPublishing(false)}}>
                            Cancel Publishing</button>

                        <button type="button" className="btn btn-primary d-inline" onClick={publishStory}>
                            Publish Story</button>


                    </div>
                :
                    <div>

                        {passage && 
                            <div>
                                <button style={textboxStyle} className="create-story" 
                                onClick={() => {
                                    if(passage.previous_passage){
                                        navigate('/make/' + passage.previous_passage);
                                    } else {
                                        navigate('/make/begin/' + prompt.id);
                                    }
                                }}>
                                    <MakeStoryCard passage={passage}/>
                                </button>
                            </div>
                        }

                        <div>
                        
                        <hr/>

                        {passage ? 
                            <h5>Continue the Story: </h5>
                            :
                            <h5>Begin the Story: </h5>
                        }


                        {currentUser && (

                            <div>
                                <textarea
                                    style={textboxStyle}
                                    rows="4"
                                    value={content}
                                    placeholder="Write your story here!"
                                    onChange={(event) => {
                                        setContent(event.target.value);
                                    }}
                                />

                                <div style={textboxStyle}>
                                    <div>

                                        <button type="button" className="btn btn-primary d-inline" onClick={createPassage}>
                                                Finish Passage</button>

                                        <button type="button" className="btn btn-success float-end d-inline" onClick={beginPublishing}>
                                        Publish Story</button>

                                        {failed && (<p>Passage already exists, look below!</p>)}
                                    </div>
                                </div>  
                            </div>
                        )}


                        </div>


                        <hr/>

                        <h5>Or Choose Another's to Continue: </h5>


                        {nextPassages && nextPassages.map((p) =>
                            <button style={textboxStyle} className="create-story" 
                            onClick={() => {
                                navigate('/make/' + p.id);
                            }}>
                                <MakeStoryCard passage={p}/>
                            </button>
                        )}
                    </div>
                }

                
            </div>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

        </div>
    );
}