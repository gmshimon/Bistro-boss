/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from 'react-simple-captcha'
import loginBg from '../../assets/others/authentication.png'
import loginImg from '../../assets/others/authentication2.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../Redux/Slice/AuthSlice'

const Login = () => {
  const dispatch = useDispatch()
  const [user_captcha, setCaptcha] = useState('')
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    loadCaptchaEnginge(7)
  }, [])
  const handSubmitForm = e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    dispatch(loginUser(email, password))
    console.log(email, password)
  }
  const handleValidateCaptcha = ()=> {
    if (validateCaptcha(user_captcha)) {
      setDisabled(false)
      loadCaptchaEnginge(7)
    } else {
      setDisabled(true)
    }
  }

  return (
    <section className='flex items-center justify-center min-h-screen '>
      <div
        style={{
          backgroundImage: `url("${loginBg}")`
        }}
        className='lg:h-[600px] h-full w-full max-w-full'
      >
        <div className='h-full  flex flex-col lg:flex-row justify-around items-center'>
          <div>
            <img src={loginImg} alt='' />
          </div>
          <div>
            <h1 className='text-4xl font-bold text-center'>Login</h1>
            <form className='pr-5 w-full' onSubmit={ handSubmitForm}>
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
              <div className='mb-5'>
                <LoadCanvasTemplate />
                <input
                  onChange={e => setCaptcha(e.target.value)}
                  name='captcha'
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full max-w-xs mt-4'
                />
               <div className='flex justify-center mt-2'>
               <button type='button' onClick={handleValidateCaptcha} className="btn btn-xs btn-outline w-full">Validate</button>
               </div>

              </div>
              <div>
                <button
                  disabled={disabled}
                  className='btn btn-warning w-full'
                  type='submit'
                >
                  Login
                </button>
              </div>
              <div className='text-center mt-3 hover:underline underline-offset-2 hover:cursor-pointer'>
                <Link to="/register"><span className='text-orange-400'>New here? Create a New Account</span></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
