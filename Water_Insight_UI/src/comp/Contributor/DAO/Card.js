import { useRef, useState } from 'react';
import { format } from 'date-fns';

import { createStake } from '../../../actions/dao';
import { ReactComponent as Arrow } from '../../../assets/svg/arrows/dropdown.svg';
import { ReactComponent as Clock } from '../../../assets/svg/common/clock.svg';
import CloseDao from '../Modals/CloseDao';
import VoteBtn from './VoteBtn';

function Card({
  id, title, summary, fundingTarget,
  minimumStakeAmount: minimumStakingAmount, closeTime: closingTime,
  description, isMine, status,
  abstainAmount, againstAmount, forAmount,
  abstainVotes, againstVotes, forVotes,
  refresh,
}) {
  const [isStaking, setIsStaking] = useState(false)
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState(0)
  const [stake, setStake] = useState("")
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  const onClick = () => {
    setHeight(active ? 0 : panelRef.current.clientHeight)
    setActive(p => !p)
  }

  const closeModal = () => setOpen(false)
  const updateOpen = () => setOpen(p => !p)

  const onSubmitState = () => {
    if (stake) {
      setIsStaking(true)
      const onSuccess = () => {
        setStake("")
        setIsStaking(false)
        refresh()
      }

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => {
          createStake(
            {
              walletId: res[0],
              projectId: id,
              stakeAmount: stake
            },
            onSuccess,
            () => setIsStaking(false)
          )
        })
    }
  }

  return (
    <div className='p-6 max-w-xl mx-auto mb-4 border shadow rounded-lg hover:shadow-intensed cursor-pointer'>
      <div className="df">
        <div className='font-semibold'>{title}</div>
        <div className="df gap-1 ml-auto text-sm capitalize">
          {
            status !== "voting" ? status :
              <>
                <Clock className="w-4 h-4 stroke-slate-900" />
                {closingTime && format(new Date(closingTime), "dd-MM-yyyy")}
              </>
          }

          {
            status === "voting" && !isMine &&
            <VoteBtn
              id={id}
              refresh={refresh}
              abstainVotes={abstainVotes}
              againstVotes={againstVotes}
              forVotes={forVotes}
            />
          }

          {
            status === "voting" && isMine &&
            new Date(closingTime).getTime() > new Date().getTime() &&
            <button
              className="ml-1 p-2 py-1 text-sm text-white bg-red-400 hover:bg-red-500"
              onClick={updateOpen}
            >
              Close
            </button>
          }
        </div>
      </div>

      <div className="df justify-between my-3">
        <p><span className='text-sm text-gray-600'>Target : </span> {fundingTarget}</p>
        <p><span className='text-sm text-gray-600'>Minimum Staking Amount : </span> {minimumStakingAmount}</p>
      </div>

      <div className='df justify-between my-2 text-sm'>
        <div className='df gap-3'>
          <strong className='font-medium'>Votes : </strong>
          <p className='text-[13px] underline underline-offset-4 decoration-2 decoration-green-500' title='For 12'> &nbsp; {forVotes} &nbsp; </p>
          <p className='text-[13px] underline underline-offset-4 decoration-2 decoration-red-500' title='Against 12'> &nbsp; {againstVotes} &nbsp; </p>
          <p className='text-[13px] underline underline-offset-4 decoration-2 decoration-yellow-500' title='Abstain 12'> &nbsp; {abstainVotes} &nbsp; </p>
        </div>

        <div className='df gap-3'>
          <strong className='font-medium'>Stakes : </strong>
          <p className='text-[13px] underline underline-offset-4 decoration-2 decoration-green-500' title='For 12'> &nbsp; {forAmount} &nbsp; </p>
          <p className='text-[13px] underline underline-offset-4 decoration-2 decoration-red-500' title='Against 12'> &nbsp; {againstAmount} &nbsp; </p>
          <p className='text-[13px] underline underline-offset-4 decoration-2 decoration-yellow-500' title='Abstain 12'> &nbsp; {abstainAmount} &nbsp; </p>
        </div>
      </div>

      <div className='df items-end mt-5'>
        {
          status === "voting" && !isMine &&
          <div className='df gap-1'>
            <input
              type="number"
              className='no-number-arrows max-w-xs py-1 rounded-sm focus:border-primary-300'
              placeholder='Stake amount'
              value={stake}
              onChange={e => setStake(e.target.value)}
            />
            <button
              className='px-2 py-1.5 text-xs text-white bg-teal-700 rounded-sm'
              onClick={onSubmitState}
              disabled={isStaking}
            >
              Stake
            </button>
          </div>
        }

        <button
          onClick={onClick}
          className="df gap-1 ml-auto p-0 text-sm text-slate-600"
        >
          View more
          <Arrow className={`w-4 h-4 transition-transform stroke-slate-600 ${active ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div
        className="overflow-hidden transition-[height] duration-200"
        style={{ height: `${height}px` }}
      >
        <div ref={panelRef} className="pt-3 text-sm">
          <div className='df my-1'>
            <strong className='w-20 font-medium'>Summary </strong>
            <span>:</span>
            {summary}
          </div>

          <div className='df my-2'>
            <strong className='w-20 font-medium'>Description </strong>
            <span>:</span>
            {description}
          </div>
        </div>
      </div>

      {
        open &&
        <CloseDao
          id={id}
          closeModal={closeModal}
        />
      }
    </div>
  )
}

export default Card