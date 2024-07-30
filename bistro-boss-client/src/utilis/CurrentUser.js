import { useEffect } from "react";
import { getMenuLists } from "../Redux/Slice/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { saveUserData, startLoading } from "../Redux/Slice/AuthSlice";

const CurrentUser = () => {
    const { user } = useSelector(state => state.auth);
    const  dispatch  = useDispatch();
    useEffect(() => {
        dispatch(getMenuLists())
        onAuthStateChanged(auth, currentUser => {
          if (currentUser?.email) {
            dispatch(
              saveUserData({
                name: currentUser?.displayName,
                email: currentUser?.email
              })
            )
            localStorage.setItem("access_token", user?.token)
            // dispatch(setUser(user))
          } else {
            localStorage.removeItem("access_token")
            dispatch(startLoading(false))
            // dispatch(toggleLoading())
          }
        })
      }, [dispatch, user?.token])
};

export default CurrentUser;