import info from '../../assets/img/auth-infograph.jpg';
import logo from '../../assets/img/logo.png';

function Template({ children }) {
  return (
    <div className='grid lg:grid-cols-2 gap-4 p-6 h-screen max-w-5xl mx-auto'>
      <img className="max-w-lg m-auto hidden lg:block" src={info} alt="" />
      <div className='dc gap-0 flex-col'>{children}</div>

      <div className='df min-w-max px-6 py-1 fixed bottom-2 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,.05)] rounded-full'>
        <p className='font-medium'>Designed and developed by </p>
        <img className='w-8' src={logo} alt="Inclusive Growth Chain" />
        <p className='text-xl text-[#01264e] font-semibold'>IGC</p>
      </div>
    </div>
  )
}

export default Template