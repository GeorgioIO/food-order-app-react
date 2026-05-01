export default function Button({ textOnly, className, children, ...props }) {
  return (
    <button {...props} className={textOnly ? "text-button" : className}>
      {children}
    </button>
  );
}
