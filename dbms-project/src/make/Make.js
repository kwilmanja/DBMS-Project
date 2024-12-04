import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MakeStoryCard from "./MakeStoryCard";
import { getAllPromptsThunk } from "../stories/stories-thunks";


export default function Make() {

    const { currentUser } = useSelector((state) => state.auth);

    const [prompts, setPrompts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const promptsAction = await dispatch(getAllPromptsThunk());
            try {
                console.log(promptsAction);
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

            </div>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

        </div>
    );
}