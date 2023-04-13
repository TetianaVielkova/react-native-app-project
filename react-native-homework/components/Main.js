import { useEffect } from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { useRoute } from '../router';
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from '../redux/auth/authOperations';


export const Main = ({ onLayoutRootView }) => {

    const {stateChange} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authStateChangeUser())
    }, [])

    const routing = useRoute(stateChange);

    return(
        <NavigationContainer onLayout={onLayoutRootView}>{routing}</NavigationContainer>
    )
}