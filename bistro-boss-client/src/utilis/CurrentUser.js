/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { getMenuLists } from "../Redux/Slice/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { fetchUser, startLoading } from "../Redux/Slice/AuthSlice";

const CurrentUser = () => {
    const { user } = useSelector(state => state.auth);
    const {page,ItemLimit}=useSelector(state=>state.menu)
    const  dispatch  = useDispatch();
    useEffect(() => {
        dispatch(getMenuLists({page,ItemLimit}))
        onAuthStateChanged(auth, currentUser => {
          if (currentUser?.email) {
            dispatch(fetchUser(currentUser.email))
            // dispatch(
            //   saveUserData({
            //     name: currentUser?.displayName,
            //     email: currentUser?.email
            //   })
            // )
            // dispatch(setUser(user))
          } else {
            localStorage.removeItem("userToken")
            dispatch(startLoading(false))
            // dispatch(toggleLoading())
          }
        })
      }, [dispatch, user?.token, page, ItemLimit])
};

export default CurrentUser;