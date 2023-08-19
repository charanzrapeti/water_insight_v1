import { useId } from "react";

function Input({
  wrapperCls, name = "", placeholder = "", type = "text",
  value = "", onChange = () => { }, disabled = false,
}) {
  const id = useId()

  return (
    <div className={wrapperCls}>
      <label className="mb-1 text-gray-700" htmlFor={id}>
        {name}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || name}
        className="focus-within:border-slate-900 disabled:bg-gray-50"
      />
    </div>
  )
}

export default Input