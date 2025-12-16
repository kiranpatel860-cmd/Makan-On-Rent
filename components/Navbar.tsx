import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, PlusCircle, Search as SearchIcon, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, openLoginModal, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Search', path: '/search', icon: <SearchIcon size={18} /> },
  ];

  const handleListProperty = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
        navigate('/list-property');
    } else {
        openLoginModal();
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-brand-700 text-white p-1.5 rounded-lg">
                <Home size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Makan<span className="text-brand-700">OnRental</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-brand-700'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={handleListProperty}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-700 hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 shadow-sm transition-colors"
            >
              <PlusCircle size={18} className="mr-2" />
              List Property
            </button>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
                <div className="relative ml-3">
                    <button 
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                    >
                        <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center overflow-hidden border border-brand-200">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-brand-700 font-bold">{user.name.charAt(0)}</span>
                            )}
                        </div>
                        <span>{user.name.split(' ')[0]}</span>
                    </button>

                    {showProfileMenu && (
                        <div 
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 animate-fade-in z-50"
                            onMouseLeave={() => setShowProfileMenu(false)}
                        >
                            <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                                Signed in as <br/>
                                <span className="font-bold text-gray-900">{user.email || user.phone}</span>
                            </div>
                            <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <LayoutDashboard size={16} className="mr-2" /> Dashboard
                            </Link>
                            <button 
                                onClick={logout}
                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                <LogOut size={16} className="mr-2" /> Sign out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button 
                    onClick={openLoginModal}
                    className="text-gray-500 hover:text-brand-700 font-medium text-sm flex items-center gap-1"
                >
                    <User size={18} /> Login / Sign Up
                </button>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-brand-50 border-brand-700 text-brand-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  {link.name}
                </div>
              </Link>
            ))}

            <button
              onClick={(e) => {
                  setIsOpen(false);
                  handleListProperty(e);
              }}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-brand-700 font-semibold"
            >
               + List Your Property
            </button>

            <div className="border-t border-gray-200 pt-4 pb-3">
                {isAuthenticated && user ? (
                    <div className="flex items-center px-4">
                        <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold border border-brand-200">
                                {user.avatar ? <img src={user.avatar} alt="" className="h-full w-full rounded-full" /> : user.name.charAt(0)}
                            </div>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email || user.phone}</div>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={() => {
                            setIsOpen(false);
                            openLoginModal();
                        }}
                        className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                        Log In / Sign Up
                    </button>
                )}
                
                {isAuthenticated && (
                     <div className="mt-3 space-y-1">
                        <Link 
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                        >
                            Dashboard
                        </Link>
                        <button 
                            onClick={() => {
                                setIsOpen(false);
                                logout();
                            }}
                            className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-100"
                        >
                            Sign out
                        </button>
                     </div>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;