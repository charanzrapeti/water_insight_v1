import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar({ list = [] }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <aside className='dfc px-2 py-4 text-sm shadow-[0_12px_20px_0_rgba(0,0,0,.1)]'>
      {
        list.map(l => (
          <div
            key={l.title}
            className={`df px-4 py-2 rounded-md cursor-pointer ${l.to === pathname ? "active text-primary-600 bg-primary-100 stroke-primary-600 font-medium" : "hover:bg-primary-100 hover:text-primary-600 text-[#5D7285] stroke-primary-100"}`}
            onClick={() => navigate(l.to)}
          >
            {l.icon}
            {l.title}
          </div>
        ))
      }
    </aside>
  )
}

export default Sidebar