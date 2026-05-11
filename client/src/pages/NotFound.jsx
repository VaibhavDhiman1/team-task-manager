import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-md w-full">
        
        <h1 className="text-7xl font-bold text-indigo-600">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;