/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from 'react-simple-captcha'
import loginBg from '../../assets/others/authentication.png'
import loginImg from '../../assets/others/authentication2.png'
import Loading from '../../assets/others/loader3.gif'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, reset } from '../../Redux/Slice/AuthSlice'
import SocialMedia from '../../Components/SocialMedia/SocialMedia'

const Registration = () => {
  const { user, isCreateUserLoading, isCreateUserSuccess } = useSelector(
    state => state.auth
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handSubmitForm = e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    dispatch(createUser({name,email, password}))
  }
  useEffect(() => {
    if (isCreateUserSuccess) {
      dispatch(reset())
      navigate('/')
    }
  }, [dispatch, isCreateUserSuccess, navigate])
  return (
    <section className='flex items-center justify-center min-h-screen'>
      {isCreateUserLoading ? (
        <div>
          <img src={Loading} alt='' />
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url("${loginBg}")`
          }}
          className='lg:h-[650px] h-full w-full max-w-full rounded-lg shadow-md'
        >
          <div className='h-full flex flex-col lg:flex-row-reverse justify-around items-center'>
            <div>
              <img src={loginImg} alt='' />
            </div>
            <div>
              <h1 className='text-4xl font-bold text-center'>Sign Up</h1>
              <form className='pr-5 w-full' onSubmit={handSubmitForm}>
                <div className='my-4'>
                  <label htmlFor='name'>Name</label>
                  <input
                    name='name'
                    type='text'
                    placeholder='Type here'
                    className='input input-bordered w-full max-w-xs mt-2'
                  />
                </div>
                <div className='my-4'>
                  <label htmlFor='email'>Email</label>
                  <input
                    name='email'
                    type='text'
                    placeholder='Type here'
                    className='input input-bordered w-full max-w-xs mt-2'
                  />
                </div>
                <div className='mb-5'>
                  <label htmlFor='password'>Password</label>
                  <input
                    name='password'
                    type='password'
                    placeholder='Enter your password'
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <div>
                  <button className='btn btn-warning w-full' type='submit'>
                    Sign Up
                  </button>
                </div>
                <div className='text-center mt-3 hover:underline underline-offset-2 hover:cursor-pointer'>
                  <Link to='/login'>
                    <span className='text-orange-400'>
                      Already registered?{' '}
                      <span className='font-bold'>Go to log in</span>
                    </span>
                  </Link>
                </div>
                <div className='flex justify-center mt-2'>
                <div>
                  <p>Or Sign in with</p>
                  <SocialMedia />
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Registration
