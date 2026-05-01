export default function Input({ label, id, error, ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {error && <p className="text-red-700  mt-0.5">{error}</p>}
    </div>
  );
}
