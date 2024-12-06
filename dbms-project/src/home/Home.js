import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import HomeStoryCard from "./HomeStoryCard";
import { getAllStoriesThunk } from "../stories/stories-thunks";


export default function Home() {

    const { currentUser } = useSelector((state) => state.auth);

    const [stories, setStories] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const storiesAction = await dispatch(getAllStoriesThunk());
            if(storiesAction.payload){
                const stories = storiesAction.payload.slice();            
                setStories(stories);
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
        <div className="row" style={{ marginBottom: '50px' }}>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

            <div className="col-auto col-md-10 col-lg-8 col-xl-6">
                <h1 className="text-center" style={header}>Welcome</h1>

                <div>
                    {stories && stories.map((story) =>
                                    <HomeStoryCard story={story}/>
                    )}
                </div>

            </div>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

        </div>
    );
}