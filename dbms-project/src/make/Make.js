import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";


export default function Make() {

    const { currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        async function fetchData() {
 
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