const PrimaryButton = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition font-medium ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;