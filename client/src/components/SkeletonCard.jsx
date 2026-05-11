const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 animate-pulse">
      
      <div className="h-5 bg-gray-200 rounded w-1/2"></div>

      <div className="mt-4 h-4 bg-gray-200 rounded"></div>

      <div className="mt-2 h-4 bg-gray-200 rounded w-5/6"></div>

      <div className="mt-6 h-10 bg-gray-200 rounded"></div>

    </div>
  );
};

export default SkeletonCard;