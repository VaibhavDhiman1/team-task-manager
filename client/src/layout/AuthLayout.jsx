const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      
      {/* Left Section */}
      <div className="hidden md:flex bg-indigo-600 text-white items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            Team Task Manager
          </h1>

          <p className="mt-6 text-lg text-indigo-100">
            Organize projects, manage tasks, and track team progress in one clean workspace.
          </p>

          <div className="mt-10 space-y-3">
            <div className="bg-white/10 p-4 rounded-xl">
              Project collaboration
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              Task assignment & tracking
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              Role-based access control
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            {subtitle}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;