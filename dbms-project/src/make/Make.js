import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MakeStoryCard from "./MakeStoryCard";
import { getPromptByIdThunk, getPassageByIdThunk, 
    createPassageThunk, getNextPassagesThunk } from "../stories/stories-thunks";
import { useNavigate, useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import { getNextPassages } from "../stories/stories-service";


export default function Make() {

    const { currentUser } = useSelector((state) => state.auth);
    const { prompt } = useSelector((state) => state.stories);
    const {nextPassages} = useSelector((state) => state.stories);

    const {passageId, promptId} = useParams();

    const [passage, setPassage] = useState({});
    const [content, setContent] = useState('');
    const [failed, setFailed] = useState(false);

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

            setContent('');
            setFailed(false);
        }

        fetchData();
    }, [passageId]);


    const createPassage = async () => {
        if(content.length === 0){
            return;
        }

        const newPassage ={
            text: content,
            username: currentUser.username,
            previousPassage: passageId,
            prompt: prompt.id
        }
        try{
            const createAction = await dispatch(createPassageThunk(newPassage));
            navigate('/make/' + createAction.payload.id);
        } catch (error){
            setFailed(true);
        }
    };


    const publishStory = async () => {
        if(content.length === 0){
            return;
        }

        const newPassage ={
            text: content,
            username: currentUser.username,
            previousPassage: passageId,
            prompt: prompt.id
        }
        try{
            const createAction = await dispatch(createPassageThunk(newPassage));
            navigate('/make/' + createAction.payload.id);
        } catch (error){
            setFailed(true);
        }
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
        
        <div className="row">

            
            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

            <div className="col-auto col-md-10 col-lg-8 col-xl-6">

                <h1 className="text-center" style={header}>Make a Story:</h1>
                <MakeStoryCard passage={prompt}/>

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
                                onChange={(event) => {
                                    setContent(event.target.value);
                                }}
                            />

                            <div style={textboxStyle}>
                                <div>

                                    <button type="button" className="btn btn-primary d-inline" onClick={createPassage}>
                                            Finish Passage</button>

                                    <button type="button" className="btn btn-primary d-inline" onClick={publishStory}>
                                    Publish Story</button>

                                    {failed && (<p>Passage already exists, look below!</p>)}
                                </div>
                            </div>
                            
                            
                        </div>

                    )}
                </div>

                {nextPassages && nextPassages.map((p) =>
                    <button style={textboxStyle} className="create-story" 
                    onClick={() => {
                        navigate('/make/' + p.id);
                    }}>
                        <MakeStoryCard passage={p}/>
                    </button>
                )}

                    


            </div>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

        </div>
    );
}