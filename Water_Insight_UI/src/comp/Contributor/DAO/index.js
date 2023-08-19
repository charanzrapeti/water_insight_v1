import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { enableMetaMask } from "../../../actions/dao";
import CreateDao from "../Modals/CreateDao";

function DAO() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!window.ethereum.selectedAddress) {
      enableMetaMask()
    }
  }, [])

  const updateOpen = () => setOpen(p => !p)

  return (
    <section className='dfc h-full overflow-y-hidden'>
      <div className='df gap-4 px-4 py-4'>
        <h1 className='mr-auto text-2xl'>
          DAO {pathname === "/dao/my-projects" && <span className="text-base font-medium">(My projects)</span>}
        </h1>

        {
          pathname !== "/dao/my-projects" ?
            <Link to="/dao/my-projects" className="text-sm hover:text-blue-600">
              My Projects
            </Link> :
            <Link to="/dao" className="text-sm hover:text-blue-600">
              Go back
            </Link>
        }

        <button
          className="theme-btn text-sm"
          onClick={updateOpen}
        >
          Create project
        </button>
      </div>

      <div className='scroll-y overflow-x-auto p-4 mb-2'>
        <Outlet />
      </div>

      {
        open &&
        <CreateDao
          closeModal={updateOpen}
        />
      }
    </section>
  )
}

export default DAO