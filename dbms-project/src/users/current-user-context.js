import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {profileThunk} from "./auth-thunks";
import {findFollowedThunk, findFollowerThunk} from "../follows/follows-thunks";


function CurrentUserContext({ children }) {

    const { currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const getProfile = async () => {
        return dispatch(profileThunk());
    };

    return children;
}

export default CurrentUserContext;