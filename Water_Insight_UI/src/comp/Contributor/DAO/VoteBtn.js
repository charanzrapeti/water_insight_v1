import { useState, useRef, useMemo } from 'react';
import { offset, autoUpdate, useFloating, shift, arrow } from '@floating-ui/react-dom-interactions';
import { ReactComponent as Close } from '../../../assets/svg/common/circle-wrong.svg';
import { ReactComponent as Thumb } from '../../../assets/svg/common/thumb-up.svg';
import { vote } from '../../../actions/dao';

function VoteBtn({
  id, refresh, abstainVotes,
  againstVotes,
  forVotes,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef()

  const {
    x, y, reference, floating, strategy, placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right',
    middleware: [
      offset({ mainAxis: 10 }),
      arrow({ element: arrowRef }),
      shift(),
    ],
    whileElementsMounted: autoUpdate
  })

  const arrowPlacements = useMemo(() => {
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    }[placement.split("-")[0]];

    const final = {
      position: strategy,
      left: x != null ? `${arrowX}px` : "",
      top: y != null ? `${arrowY}px` : "",
      [staticSide]: "-6px"
    }

    return final
  }, [placement, strategy, x, y, arrowX, arrowY])

  const voteIt = type => {
    vote({
      type, id, abstainVotes,
      againstVotes,
      forVotes,
    }, refresh
    )
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="theme-btn ml-1 p-2 py-1 text-sm"
        ref={reference}
        onClick={() => setIsOpen(p => !p)}
      >
        Vote
      </button>

      {
        isOpen &&
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? "",
            left: x ?? "",
          }}
          className="df gap-6 px-6 py-2 bg-white rounded shadow-light border"
        >
          <button
            className='dfc gap-0 items-center p-0 hover:text-green-500 group'
            onClick={() => voteIt("1")}
          >
            <Thumb className="w-5 h-5 group-hover:fill-green-500" />
            For
          </button>

          <button
            className='dfc gap-0 items-center p-0 hover:text-red-500 group'
            onClick={() => voteIt("0")}
          >
            <Thumb className="w-5 h-5 group-hover:fill-red-500" style={{ transform: "rotateX(180deg)" }} />
            Against
          </button>

          <button
            className='dfc gap-0 items-center p-0 hover:text-yellow-500 group'
            onClick={() => voteIt("2")}
          >
            <Close className="w-5 h-5 group-hover:fill-yellow-500" />
            Abstain
          </button>

          <div
            ref={arrowRef}
            style={{ ...arrowPlacements }}
            className='w-4 h-4 rotate-45 -z-1 bg-white border'
          ></div>
        </div>
      }
    </div>
  )
}

export default VoteBtn