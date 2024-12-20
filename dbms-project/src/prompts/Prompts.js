import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { getAllPromptsThunk } from "../stories/stories-thunks";


export default function Prompts() {

    const { currentUser } = useSelector((state) => state.auth);

    const [prompts, setPrompts] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const promptsAction = await dispatch(getAllPromptsThunk());
            try {
                const prompts = promptsAction.payload.slice();
                setPrompts(prompts)
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

    const handleCreatePromptClick = () => {
        navigate("/prompts/create");
    }

    const header = {
        "color": "white",
        "text-shadow":
            "-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000"
    }

    const adjustment = {
        "bottom": "-30px"
    }

    return (
        <div className="row" style={{ marginBottom: '50px' }}>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

            <div className="col-auto col-md-10 col-lg-8 col-xl-6">

                <h1 className="text-center" style={header}>Prompts:</h1>

                <div style={adjustment}>
                    {currentUser &&
                        <button className="create-prompt" onClick={handleCreatePromptClick}>
                            Create new prompt
                        </button>
                    }
                </div>

                <hr/>

                <div style={adjustment}>
                    {prompts && prompts.map((prompt) =>
                        <PromptCard prompt={prompt} />
                    )}
                </div>

            </div>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

        </div>
    );
}