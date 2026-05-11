const StatsCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <h2
        className={`text-3xl font-bold mt-3 ${color}`}
      >
        {value}
      </h2>

    </div>
  );
};

export default StatsCard;