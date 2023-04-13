import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged} from "firebase/auth";
import {auth} from '../../fіrebase/config';
import {authSlice} from './authReducer';

const { updateUserProfile, authStateChange, authSignOut} = authSlice.actions;

export const authSignUpUser = ({login, email, password}) => async (dispatch, getState) => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {displayName: login});
            const { uid, displayName } = auth.currentUser;
            dispatch(updateUserProfile({userId: uid, login: displayName}))
        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        };
}
export const authSignInUser = ({ email, password}) => async(dispatch, getState) => {
    try{
      const user = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName } = user;
      dispatch(updateUserProfile({userId: uid, login: displayName}))
  } catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  };
}

export const authSignOutUser = () => async(dispatch) => {
  try{
    await signOut(auth);
    dispatch(authSignOut());
  }catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  };
  
}

export const authStateChangeUser = () => async(dispatch, getState) => {
  try{
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(
          updateUserProfile({
            userId: uid,
            email: email,
            login: displayName,
          })
        );
        dispatch(authStateChange({stateChange: true}))
      }
    });
  }catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  };
}