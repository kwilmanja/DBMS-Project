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
            try {
                const action = await dispatch(getAllPromptsThunk());
                setPrompts(action.payload.slice());
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="sc-page">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h1 className="sc-page-title" style={{ textAlign: 'left', margin: 0 }}>Prompts</h1>
                {currentUser && (
                    <button
                        className="sc-btn sc-btn-primary sc-btn-sm"
                        onClick={() => navigate('/prompts/create')}>
                        + New Prompt
                    </button>
                )}
            </div>
            <p className="sc-page-subtitle" style={{ textAlign: 'left', marginBottom: '36px' }}>
                Choose a prompt and start your story
            </p>

            <hr className="sc-divider" style={{ marginTop: 0 }} />

            {prompts.length === 0 ? (
                <div className="sc-loading">Loading prompts…</div>
            ) : (
                prompts.map(prompt => <PromptCard key={prompt.id} prompt={prompt} />)
            )}
        </div>
    );
}
