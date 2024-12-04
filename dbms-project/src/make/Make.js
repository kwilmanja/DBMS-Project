import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MakeStoryCard from "./MakeStoryCard";
import { getAllPromptsThunk, getPassageByIdThunk } from "../stories/stories-thunks";
import { useParams } from "react-router-dom";

export default function Make() {

    const { currentUser } = useSelector((state) => state.auth);

    const {passageId} = useParams();

    const [previousPassage, setPreviousPassage] = useState([]);

    const [prompts, setPrompts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const passageAction = await dispatch(getPassageByIdThunk(passageId));
            setPreviousPassage(passageAction.payload);
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

                <MakeStoryCard passage={previousPassage}/>


            </div>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

        </div>
    );
}