const EmptyState = ({
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
      
      <h2 className="text-2xl font-bold text-gray-700">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {description}
      </p>

    </div>
  );
};

export default EmptyState;