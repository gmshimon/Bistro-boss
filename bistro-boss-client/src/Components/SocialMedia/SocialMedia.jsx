/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle, reset, saveUserData } from '../../Redux/Slice/AuthSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SocialMedia = ({from}) => {
    const { user,isLoginWithGoogleSuccess } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(()=>{
        if (isLoginWithGoogleSuccess) {
            const userInfo = {
                name:user?.displayName,
                email:user?.email
            }
            dispatch(saveUserData(userInfo))
            dispatch(reset())
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Successfully logged in',
              showConfirmButton: false,
              timer: 3000
            })
            navigate(from, { replace: true })
          } else {
            // dispatch(reset())
          }
    },[isLoginWithGoogleSuccess, dispatch, navigate, from, user?.displayName, user?.email])
    return (
    <div className='flex justify-center mt-2'>
        <button onClick={()=>dispatch(loginWithGoogle())} type='button' className="btn btn-circle btn-outline">
        <FaGoogle />
    </button>
    </div>

    );
};

export default SocialMedia;