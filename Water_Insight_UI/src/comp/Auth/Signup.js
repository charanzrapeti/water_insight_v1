import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { signup } from "../../actions/auth";
import Template from './Template';

function Signup() {
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      walletId: "",
      password: "",
      confirmPassword: "",
      role: "",
      phone: "",
    },
  })

  const onSubmit = (data) => {
    signup(data, () => navigate("/login"))
  }

  return (
    <Template>
      <form
        className='p-6 rounded-xl shadow-outer'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4 text-2xl font-medium text-center">Sign up</h1>

        <div className="max-h-[45vh] grid grid-cols-2 gap-6 -mr-6 pr-6 overflow-y-auto">
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="focus-within:border-slate-900"
              {...register("firstname", {
                required: "First name is required"
              })}
            />
            {
              errors.firstname &&
              <div className="mt-0.5 text-xs text-red-600">
                {errors.firstname.message}
              </div>
            }
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="focus-within:border-slate-900"
              {...register("lastname", {
                required: "Last name is required"
              })}
            />
            {
              errors.lastname &&
              <div className="mt-0.5 text-xs text-red-600">
                {errors.lastname.message}
              </div>
            }
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="focus-within:border-slate-900"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email"
                },
              })}
            />
            {
              errors.email &&
              <div className="mt-0.5 text-xs text-red-600">
                {errors.email.message}
              </div>
            }
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone"
              className="focus-within:border-slate-900"
              {...register("phone", {
                required: "Phone is required",
                minLength: { value: 6, message: "Please enter a valid Mobile number" },
                maxLength: { value: 12, message: "Please enter a valid Mobile number" },
              })}
            />
            {
              errors.phone &&
              <div className="mt-0.5 text-xs text-red-600">
                {errors.phone.message}
              </div>
            }
          </div>


          <div>
            <input
              type="text"
              placeholder="Wallet Id"
              className="focus-within:border-slate-900"
              {...register("walletId", {
                required: "Wallet Id is required"
              })}
            />
            {
              errors.walletId &&
              <div className="mt-0.5 text-xs text-red-600">
                {errors.walletId.message}
              </div>
            }
          </div>

          <div>
            <select
              {...register("role", {
                required: "Role is required"
              })}
              className="text-sm focus-within:border-slate-900"
            >
              <option value="" disabled>Role</option>
              <option value="admin">Admin</option>
              <option value="receiver">Reciever</option>
              <option value="contributor">Contributor</option>
            </select>
            {
              errors.role &&
              <div className="mt-0.5 text-xs text-red-600">
                {errors.role.message}
              </div>
            }
          </div>

          <div>
            <input
              type="text"
              placeholder="Password"
              className="focus-within:border-slate-900"
              {...register("password", {
                required: "Password is required"
              })}
            />
            {
              errors.password &&
              <div className="mt-0.5 text-xs text-red-600">
                {errors.password.message}
              </div>
            }
          </div>

          <div>
            <input
              type="text"
              placeholder="Confirm Password"
              className="focus-within:border-slate-900"
              {...register("confirmPassword", {
                required: "Confirm Password is required"
              })}
            />
            {
              errors.confirmPassword &&
              <div className="mt-0.5 text-xs text-red-600">
                {errors.confirmPassword.message}
              </div>
            }
          </div>
        </div>

        <button className='block mt-6 px-12 mx-auto bg-[#01264e] text-white rounded-full hover:opacity-95'>
          Sign up
        </button>
      </form>

      <div className='px-8 py-3 text-sm bg-white rounded-b-xl shadow-outer'>
        Already have an account, <Link to="/login" className='text-[#0071b0] hover:text-[#0d87c9]'>Login</Link>
      </div>
    </Template>
  )
}

export default Signup