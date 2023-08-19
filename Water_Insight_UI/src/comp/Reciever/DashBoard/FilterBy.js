import { useState } from 'react';
import { useFloating } from "@floating-ui/react-dom-interactions";
import { parameterOptions, monthOptions, waterBodyOptions } from "./constants";

import { ReactComponent as Arrow } from '../../../assets/svg/arrows/dropdown.svg';
import { SelectBox, Cal } from "./Help";

function FilterBy() {
  const [parameter, setParameter] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [month, setMonth] = useState("")
  const [water, setWater] = useState("")

  const { x, y, strategy, reference, floating } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "left-start"
  })

  return (
    <div className='pr-3 mb-2'>
      <div className='df justify-between'>
        <button
          ref={reference}
          onClick={() => setIsOpen(p => !p)}
          className="df theme-btn pl-2 text-sm"
        >
          <Arrow className=" w-4 h-4 rotate-90 stroke-white" />
          Filters by
        </button>

        <button className='theme-btn ml-auto text-sm'>
          Generate Report
        </button>
      </div>

      {
        isOpen &&
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? "",
            left: x ?? "",
          }}
          className='p-4 bg-white rounded-sm shadow-intensed animate-enter origin-right'
        >
          <SelectBox
            name="Waterbody"
            value={water}
            onChange={setWater}
            optionsList={waterBodyOptions}
          />

          <SelectBox
            name="Parameter"
            value={parameter}
            onChange={setParameter}
            optionsList={parameterOptions}
          />

          <SelectBox
            name="Month"
            value={month}
            onChange={setMonth}
            optionsList={monthOptions}
          />

          <Cal />

          <button className='theme-btn block mx-auto px-12'>
            Filter
          </button>
        </div>
      }
    </div>
  )
}

export default FilterBy