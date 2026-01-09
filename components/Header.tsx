import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Map route to breadcrumb name
  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/dashboard': return "Vue d'ensemble";
      case '/articles': return "Articles";
      case '/pages': return "Pages";
      case '/comments': return "Commentaires";
      case '/layout': return "Mise en page";
      case '/settings': return "Paramètres";
      default: return "Vue d'ensemble";
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0 z-10">
      {/* Breadcrumb / Title */}
      <div className="flex flex-col">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
          Administration
        </span>
        <h1 className="text-lg font-bold text-gray-800 leading-tight">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Recherche..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-100 w-64 transition-all"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full transition-all border ${isProfileOpen ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-transparent hover:bg-gray-50'}`}
          >
            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              AU
            </div>
            <span className="text-sm font-semibold text-gray-700 hidden sm:block">Admin User</span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu - Matches screenshot style */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
               {/* Header in dropdown */}
               <div className="p-3 border-b border-gray-50 mb-1">
                 <p className="font-bold text-gray-900">Admin User</p>
                 <p className="text-xs text-gray-500">admin@newsai.com</p>
               </div>

               <div className="space-y-1">
                 <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <User size={16} />
                    Mon Profil
                 </button>
                 <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings size={16} />
                    Paramètres
                 </button>
               </div>
               
               <div className="mt-2 pt-2 border-t border-gray-50">
                <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={16} />
                    Déconnexion
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;