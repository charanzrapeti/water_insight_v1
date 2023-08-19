import { useId, useState } from 'react';
import { updateProfile } from '../../actions/auth';
import useAuthStore from '../../store/auth';

import { ReactComponent as User } from '../../assets/svg/users/user.svg';

function Input({
  name = '', label = '', value = '', onChange,
  disabled = false,
}) {
  const id = useId()

  return (
    <div className='df gap-4 my-4'>
      <label
        htmlFor={id}
        className='w-32 mb-0 shrink-0 cursor-pointer'
      >
        {label}
      </label>

      <strong>:</strong>

      <input
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

function Settings() {
  const updateUserDetails = useAuthStore(state => state.updateUserDetails)
  const userDetails = useAuthStore(state => state.userDetails)

  const [show, setShow] = useState("profile")
  const [edit, setEdit] = useState(false)
  const [details, setDetails] = useState({
    firstname: userDetails?.firstname,
    lastname: userDetails?.lastname,
    walletId: userDetails?.walletId,
    email: userDetails?.email,
    phone: userDetails?.phone,
  })
  const [details2, setDetails2] = useState({
    oldPassword: '',
    newPassword: '',
  })

  console.log(userDetails)
  const updateEdit = () => setEdit(p => !p)

  const onChange = e => {
    setDetails(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }

  const onChange2 = e => {
    setDetails2(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmitProfile = () => {
    updateProfile(details, () => {
      updateUserDetails(details)
      updateEdit()
    })
  }

  const onSubmitPass = () => {
    updateProfile({ password: details2.newPassword }, () => {
      updateEdit()
    })
  }

  return (
    <section className='h-full overflow-y-hidden bg-[#f7f7f7]'>
      <div className='max-w-xl my-8 mx-auto p-8 bg-white rounded-2xl'>
        <User className='w-32 h-32 mx-auto rounded-full' />
        <div className='dc gap-6 font-semibold text-lg my-4'>
          <p
            onClick={() => setShow("profile")}
            className={`${show === "profile" ? "text-[#0071b0]" : ""} cursor-pointer`}
          >
            Profile
          </p>
          <p
            onClick={() => setShow("password")}
            className={`${show === "password" ? "text-[#0071b0]" : ""} cursor-pointer`}
          >
            Password Reset
          </p>
        </div>

        {
          show === "profile" &&
          <>
            <Input
              name="firstname"
              label='First Name'
              value={details.firstname}
              onChange={onChange}
              disabled={!edit}
            />

            <Input
              name="lastname"
              label='Last Name'
              value={details.lastname}
              onChange={onChange}
              disabled={!edit}
            />

            <Input
              name="email"
              label='Email'
              value={details.email}
              onChange={onChange}
              disabled={!edit}
            />

            <Input
              name="phone"
              label='Phone number'
              value={details.phone}
              onChange={onChange}
              disabled={!edit}
            />

            <Input
              name="walletId"
              label='Wallet Id'
              value={details.walletId}
              onChange={onChange}
              disabled={!edit}
            />

            {
              !edit &&
              <button
                className='block mx-auto theme-btn'
                onClick={updateEdit}
              >
                Edit
              </button>
            }

            {
              edit &&
              <div className='dc gap-4'>
                <button
                  className='block theme-btn'
                  onClick={updateEdit}
                >
                  Cancel
                </button>

                <button
                  className='block theme-btn'
                  onClick={onSubmitProfile}
                >
                  Update
                </button>
              </div>
            }
          </>
        }


        {
          show === "password" &&
          <>
            <Input
              name="oldPassword"
              label='Old Password'
              value={details2.oldPassword}
              onChange={onChange2}
              disabled={!edit}
            />
            <Input
              name="newPassword"
              label='New Password'
              value={details2.newPassword}
              onChange={onChange2}
              disabled={!edit}
            />

            {
              !edit &&
              <button
                className='block mx-auto theme-btn'
                onClick={updateEdit}
              >
                Edit
              </button>
            }

            {
              edit &&
              <div className='dc gap-4'>
                <button
                  className='block theme-btn'
                  onClick={updateEdit}
                >
                  Cancel
                </button>

                <button
                  className='block theme-btn'
                  onClick={onSubmitPass}
                >
                  Update
                </button>
              </div>
            }
          </>
        }
      </div>
    </section>
  )
}

export default Settings