
function SelectBox({ name = "", value = "", onChange, optionsList = [] }) {
  return (
    <div className='mb-3'>
      <label className='mb-0.5 font-medium' htmlFor={name}>{name}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="" disabled></option>
        {
          optionsList.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default SelectBox