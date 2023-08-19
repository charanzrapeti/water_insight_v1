import { useState } from "react";
import TurbidityTest from "./Modals/TurbidityTest";
import ColiformTest from "./Modals/ColiformTest";
import PairDevice from "./Modals/PairDevice";
import TakeImage from "./Modals/TakeImage";

function StartTest() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState("")
  const [steps] = useState([
    {
      id: 0,
      title: "Start test",
    },
    {
      id: 1,
      title: "Pair the device",
    },
    {
      id: 2,
      title: "Start Turbidity Test",
    },
    {
      id: 3,
      title: "Take Image",
    },
    {
      id: 4,
      title: "Take Coliform Test",
    },
    {
      id: 5,
      title: "Submit",
    },
  ])

  const closeModal = () => setOpen("")

  const updateActive = title => {
    setActive(p => p + 1)
    setOpen(title)
  }

  return (
    <section className="dc h-full">
      <div className="df gap-8 flex-wrap">
        {
          steps.map((s, i) => (
            <button
              className="px-6 py-1.5 bg-[#0071b0] hover:bg-[#0d87c9] text-white rounded-full disabled:opacity-60"
              onClick={() => updateActive(s.title)}
              disabled={i > active}
              key={s.id}
            >
              {s.title}
            </button>
          ))
        }
      </div>

      {
        open === "Pair the device" &&
        <PairDevice
          isOpen
          closeModal={closeModal}
        />
      }

      {
        open === "Start Turbidity Test" &&
        <TurbidityTest
          isOpen
          closeModal={closeModal}
        />
      }

      {
        open === "Take Image" &&
        <TakeImage
          isOpen
          closeModal={closeModal}
        />
      }

      {
        open === "Take Coliform Test" &&
        <ColiformTest
          isOpen
          closeModal={closeModal}
        />
      }
    </section>
  )
}

export default StartTest