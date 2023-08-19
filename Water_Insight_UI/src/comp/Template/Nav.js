import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth';

import { ReactComponent as Notification } from '../../assets/svg/common/notification.svg';
import { ReactComponent as User } from '../../assets/svg/users/user1.svg';
import logo from '../../assets/img/logo.png';

import { DropDownWrapper } from '../UIComp/DropDown';
import { onLogOut } from '../../actions/auth';

function Nav({ role }) {
  const navigate = useNavigate()
  const logOut = useAuthStore(state => state.logOut)

  const onClk = val => {
    if (val === "Profile") {
      navigate(role ? "/admin/setting" : "/setting")
    } else if (val === 'Log out') {
      onLogOut(() => {
        logOut()
        navigate("/")
      })
    }
  }

  return (
    <nav className='df gap-4 px-4 py-2 shadow'>
      <Link to="/" className="df mr-auto">
        <img src={logo} alt="" className='w-10' />
        <p>IGC</p>
      </Link>

      <Notification className="w-5" />

      <DropDownWrapper
        list={["Profile", "Log out"]}
        rootCls='df p-0'
        needArrow
        onClk={onClk}
      >
        <User />
      </DropDownWrapper>
    </nav>
  )
}

export default Nav