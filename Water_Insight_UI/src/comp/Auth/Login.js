import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { login } from '../../actions/auth';
import useAuthStore from '../../store/auth';

import { ReactComponent as EyeClose } from '../../assets/svg/common/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/svg/common/eye-open.svg';
import { ReactComponent as User } from '../../assets/svg/users/user1.svg';
import { ReactComponent as Lock } from '../../assets/svg/common/lock.svg';
import Template from './Template';

function Login() {
  const navigate = useNavigate()
  const logIn = useAuthStore(state => state.logIn)

  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      email: "igcatisb@gmail.com",
      password: "Random@123",
    },
  })

  const [type, setType] = useState("password")

  const onSumbit = (data) => {
    login(data, res => {
      navigate(res.role.toLowerCase() === "admin" ? "/admin" : "/dashboard")
      logIn(res)
    })
  }

  return (
    <Template>
      <form
        className='p-6 rounded-xl shadow-outer'
        onSubmit={handleSubmit(onSumbit)}
      >
        <h1 className="mb-4 text-2xl font-medium text-center">Login</h1>

        <div className='mb-4'>
          <div className='df gap-0 bg-[#546880] rounded'>
            <label className='dc p-2 mb-0' htmlFor="login-email"><User className="fill-white" /></label>
            <input
              id='login-email'
              type="email"
              placeholder='Email'
              className='h-10 rounded-l-none'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email"
                },
              })}
            />
          </div>

          {
            errors.email &&
            <div className="mt-0.5 text-xs text-red-600">
              {errors.email.message}
            </div>
          }
        </div>

        <div className='mb-6'>
          <div className='df gap-0 bg-[#546880] rounded relative'>
            <label className='dc p-2 mb-0' htmlFor="login-password"><Lock className="fill-white" /></label>
            <input
              id='login-password'
              type={type}
              placeholder='Password'
              className='h-10 pr-10 rounded-l-none'
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password should be atleast minimum 8 character" },
              })}
            />
            {type === "password" && <EyeClose className="absolute top-2 right-2 fill-[#546880]" onClick={() => setType("text")} />}
            {type === "text" && <EyeOpen className="absolute top-2 right-2 fill-[#546880]" onClick={() => setType("password")} />}
          </div>

          {
            errors.password &&
            <div className="mb-6 text-xs text-red-600">
              {errors.password.message}
            </div>
          }
        </div>

        <button className='block px-12 mx-auto bg-[#01264e] text-white rounded-full hover:opacity-95'>
          Login
        </button>
      </form>

      <div className='px-8 py-3 text-sm bg-white rounded-b-xl shadow-outer'>
        Don't have account, <Link to="/signup" className='text-[#0071b0] hover:text-[#0d87c9]'>Sign up</Link>
      </div>
    </Template>
  )
}

export default Login