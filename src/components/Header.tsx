import CheckCircleIcon from "./svgs/CheckCircleIcon";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <CheckCircleIcon className="h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold">TaskMaster</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
