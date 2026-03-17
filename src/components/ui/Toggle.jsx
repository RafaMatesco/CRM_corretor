export function Toggle({ checked, onChange, label }) {
  return (
    <label className="toggle-wrapper select-none cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle-track" />
      {label && <span className="text-sm font-medium text-navy">{label}</span>}
    </label>
  )
}
