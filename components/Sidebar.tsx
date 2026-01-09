import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  MessageSquare, 
  Layout, 
  Settings, 
  ExternalLink, 
  LogOut,
  Zap
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col justify-between flex-shrink-0 z-20 transition-all duration-300">
      <div>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-50">
          <div className="flex items-center gap-2 text-indigo-900">
            <div className="bg-indigo-600 text-white p-1 rounded-lg">
               <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-extrabold text-xl tracking-tight">NEWS AI</span>
          </div>
        </div>

        {/* Menu Principal */}
        <div className="px-4 py-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
            Menu Principal
          </div>
          <nav className="space-y-1">
            <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Tableau de bord" />
            <NavItem to="/articles" icon={<FileText size={20} />} label="Articles" />
            <NavItem to="/pages" icon={<Layers size={20} />} label="Pages" />
            <NavItem to="/comments" icon={<MessageSquare size={20} />} label="Commentaires" />
            <NavItem to="/layout" icon={<Layout size={20} />} label="Mise en page" />
            <NavItem to="/settings" icon={<Settings size={20} />} label="Paramètres" />
          </nav>
        </div>

        {/* Externe */}
        <div className="px-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
            Externe
          </div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors group">
              <ExternalLink size={20} className="group-hover:text-indigo-600 text-gray-400" />
              <span className="font-medium">Voir le Blog Public</span>
            </a>
          </nav>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-gray-50">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
               AU
             </div>
             <div className="flex flex-col">
               <span className="text-sm font-bold text-gray-900">Admin User</span>
               <span className="text-xs text-gray-500">admin@newsai.com</span>
             </div>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 border-2 border-white absolute ml-7 mt-5"></div>
        </div>
        
        <button className="flex items-center gap-2 text-gray-500 hover:text-red-600 px-2 py-2 text-sm font-medium transition-colors w-full">
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
          isActive
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'}`}>
            {icon}
          </span>
          <span className="font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default Sidebar;