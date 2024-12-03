import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import HomeStoryCard from "./HomeStoryCard";


export default function Home() {

    const { currentUser } = useSelector((state) => state.auth);

    const [stories, setStories] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            setStories([
                {name: "Story 1 Title", 
                text: "Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World ", 
                prompt: "prompt prompt prompt prompt prompt prompt prompt prompt prompt prompt prompt ", 
                author: "pozboi", 
                rating: 4}, 

                {name: "A Long Way to the Top If You Wanna Rock and Roll", 
                prompt: "prompt prompt prompt prompt prompt prompt prompt prompt prompt prompt prompt ", 
                text: "Goodbye World Goodbye World Goodbye World Goodbye World Goodbye World Goodbye World Goodbye World Goodbye World ", 
                author: "kwilmanja", 
                rating: 3}])
        }
        fetchData();
    }, []);



    const background = {
        "background-image": "url('images/bike2.jpg')",
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-position": "center center"
    }

    const image2Style = {
        "width": "100%"
    }

    const header = {
        "color": "white",
        "text-shadow":
    "-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000"
    }

    return (
        <div className="row" style={background}>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

            <div className="col-auto col-md-10 col-lg-8 col-xl-6">
                {currentUser && (
                <h1 className="text-center" style={header}>Hello {currentUser.username}</h1>)}

                <h1 className="text-center" style={header}>Stories:</h1>

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