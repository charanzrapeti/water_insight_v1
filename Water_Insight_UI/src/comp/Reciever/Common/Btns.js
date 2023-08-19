import cn from 'classnames';

export function IdBtn({ id, type }) {
  return (
    <button
      className={cn("p-2 rounded-md", {
        "bg-[#BDD9FE] text-[#217EFD]": type === "Normal" || type === "good",
        "bg-[#FFB5364A] text-[#FFB536]": type === "Warning" || type === "average",
        "bg-[#F4CEFA] text-[#DB5AEE]": type === "Danger" || type === "poor",
      })}
    >
      {id}
    </button>
  )
}

export function StatusBtn({ type }) {
  return (
    <button
      className={cn("rounded-md capitalize", {
        "bg-[#BBF3E0] text-[#868686]": type === "Normal" || type === "good",
        "bg-[#EBFF06] text-[#767777]": type === "Warning" || type === "average",
        "bg-[#F66C6C]": type === "Danger" || type === "poor",
      })}
    >
      {type}
    </button>
  )
}

