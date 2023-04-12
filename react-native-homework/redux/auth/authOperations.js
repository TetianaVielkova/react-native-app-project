import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, } from "firebase/auth";
import {auth} from '../../fіrebase/config';
import {authSlice} from './authReducer';

const { updateUserProfile} = authSlice.actions;

export const authSignUpUser = ({login, email, password}) => async (dispatch, getState) => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {displayName: login});
            const { uid, displayName } = await auth.currentUser;
            dispatch(updateUserProfile({userId: uid, login: displayName}))
        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        };
}
export const authSignInUser = ({ email, password}) => async(dispatch, getState) => {
    const user = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
// export const authSignOutUser = async(dispatch, getState) => {

// }


// export const authStateChangeUser = async(dispatch, getState) => {

// }