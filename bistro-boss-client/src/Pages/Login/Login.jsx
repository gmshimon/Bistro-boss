/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha
} from 'react-simple-captcha'

const Login = () => {
    const [user_captcha,setCaptcha] = useState('')
    const [disabled,setDisabled] = useState(true)
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
  const handSubmitForm = e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    console.log(email)
  }

  const handleValidateCaptcha = () =>{
      if(validateCaptcha(user_captcha)){
        setDisabled(false)
    }else{
        setDisabled(true)
    }
  }
  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center w-1/2 lg:text-left'>
          <h1 className='text-5xl font-bold'>Login now!</h1>
          <p className='py-6'>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className='card bg-base-100 w-1/2 max-w-sm  shadow-2xl'>
          <form onSubmit={handSubmitForm} className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                name='email'
                type='email'
                placeholder='email'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                name='password'
                type='password'
                placeholder='password'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
              <LoadCanvasTemplate />
              </label>
              <input
              name='captcha'
                type='text'
                placeholder='PLease write the above captch'
                className='input input-bordered'
                onChange={e=>setCaptcha(e.target.value)}
                required
              />
              <button type='button' onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2'>Validate</button>
            </div>
            <div className='form-control mt-6'>
              <input disabled={disabled} type='submit' className='btn btn-primary' value='Login' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
