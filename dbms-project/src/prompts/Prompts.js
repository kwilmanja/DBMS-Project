import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";


export default function Prompts() {

    const { currentUser } = useSelector((state) => state.auth);

    const [prompts, setPrompts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
 
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

                <h1 className="text-center" style={header}>Prompts:</h1>

            </div>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

        </div>
    );
}