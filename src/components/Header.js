import { FaUser, FaFileCode, FaProjectDiagram, FaInfoCircle } from 'react-icons/fa';

function Header() {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white px-4 py-2 flex items-center justify-between z-50">
      <div className="flex-shrink-0">
        <div className="flex justify-start">
          <a href="/" className="flex items-center">
            <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Logo" />
            <span className="ml-2 text-white font-bold text-lg">Code Editor</span>
          </a>
        </div> 
      </div>
      <div className="flex-shrink-0">
        <ul className="flex flex-row space-x-12">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Saved Codes</a></li>
          <li><a href="#">Other Projects</a></li>
        </ul>
      </div>
      <div className="flex-shrink-0">
        <a href="#" className="flex items-center space-x-2">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm4.77-11.34a4.25 4.25 0 00-3-1.17 4.25 4.25 0 00-3 1.17 4.23 4.23 0 00-1.17 3c0 1.14.45 2.22 1.25 3l1.92 1.92c.78.78 1.8 1.22 2.88 1.22s2.1-.44 2.88-1.22l1.92-1.92a4.23 4.23 0 001.25-3 4.25 4.25 0 00-1.17-3zm-3.77-3.66a3.25 3.25 0 110 6.5 3.25 3.25 0 010-6.5z"/>
          </svg>
          <span>Username</span>
        </a>
      </div>
    </div>
  );
}

export default Header;
