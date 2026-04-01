import "./button.css";

function Button({ children, onClick, variant = "" }) {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}

export default Button;