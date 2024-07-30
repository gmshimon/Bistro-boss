import { useEffect } from "react";
import { getMenuLists } from "../Redux/Slice/menuSlice";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { saveUserData, startLoading } from "../Redux/Slice/AuthSlice";

const CurrentUser = () => {
    const  dispatch  = useDispatch();
    useEffect(() => {
        dispatch(getMenuLists())
        onAuthStateChanged(auth, user => {
          if (user) {
            dispatch(
              saveUserData({
                name: user?.displayName,
                email: user?.email
              })
            )
            // dispatch(setUser(user))
          } else {
            dispatch(startLoading(false))
            // dispatch(toggleLoading())
          }
        })
      }, [dispatch])
};

export default CurrentUser;