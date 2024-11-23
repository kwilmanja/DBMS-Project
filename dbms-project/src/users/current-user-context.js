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

    const getCurrentUsersFollow = async (user) => {
        if(user){
            await dispatch(findFollowerThunk(user.username));
            await dispatch(findFollowedThunk(user.username));
        }
    }

    useEffect(() => {
        async function fetchData() {
            if(!currentUser) {
                const profileAction = await getProfile();
                getCurrentUsersFollow(profileAction.payload);
            }
        }
        fetchData();
        console.log("fetching current user")
    }, [currentUser]);

    return children;
}

export default CurrentUserContext;