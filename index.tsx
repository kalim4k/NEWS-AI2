import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate, Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Layers, MessageSquare, Layout as LayoutIcon, 
  Settings, ExternalLink, LogOut, Zap, Search, Bell, ChevronDown, User, 
  Eye, Users, ArrowUpRight 
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Area, AreaChart, PieChart, Pie, Cell 
} from 'recharts';

// --- COMPONENTS ---

// 1. SIDEBAR
const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col justify-between flex-shrink-0 z-20 transition-all duration-300 hidden md:flex">
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
            <NavItem to="/layout" icon={<LayoutIcon size={20} />} label="Mise en page" />
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

const NavItem = ({ to, icon, label }) => {
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

// 2. HEADER
const Header = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = (pathname) => {
    if (pathname.includes('/dashboard')) return "Vue d'ensemble";
    if (pathname.includes('/articles')) return "Articles";
    if (pathname.includes('/pages')) return "Pages";
    if (pathname.includes('/comments')) return "Commentaires";
    if (pathname.includes('/layout')) return "Mise en page";
    if (pathname.includes('/settings')) return "Paramètres";
    return "Vue d'ensemble";
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0 z-10">
      <div className="flex flex-col">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
          Administration
        </span>
        <h1 className="text-lg font-bold text-gray-800 leading-tight">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Recherche..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-100 w-64 transition-all"
          />
        </div>

        <button className="relative p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

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

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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

// 3. DASHBOARD PAGE
const Dashboard = () => {
  const trafficData = [
    { name: 'Lun', visits: 2500 },
    { name: 'Mar', visits: 1800 },
    { name: 'Mer', visits: 1500 },
    { name: 'Jeu', visits: 9500 },
    { name: 'Ven', visits: 4000 },
    { name: 'Sam', visits: 4800 },
    { name: 'Dim', visits: 3800 },
    { name: 'Lun2', visits: 4200 },
  ];

  const sourceData = [
    { name: 'Recherche Org.', value: 45, color: '#4F46E5' },
    { name: 'Réseaux Sociaux', value: 25, color: '#EC4899' },
    { name: 'Direct', value: 20, color: '#0EA5E9' },
    { name: 'Référents', value: 10, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Bonsoir Admin ! <span className="text-2xl">🌙</span>
        </h2>
        <p className="text-gray-500 mt-1">Voici les performances de NEWS AI cette semaine.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Vues totales</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">30 406</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Eye size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-md">
              <ArrowUpRight size={12} />
              +12%
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Visiteurs Uniques</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">12 380</h3>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-md">
              <ArrowUpRight size={12} />
              +5.4%
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Articles Publiés</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">3</h3>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <FileText size={24} />
            </div>
          </div>
           <div className="mt-4 opacity-0">
            <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-400 text-xs font-bold px-2.5 py-1 rounded-md">
              -
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6 font-serif-like">Trafic & Visites</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12 }} 
                  tickCount={5}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: '#4F46E5', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#4F46E5" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6 font-serif-like">Sources</h3>
          <div className="flex-1 flex flex-col justify-center items-center relative">
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    cornerRadius={10}
                    stroke="none"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="text-2xl font-bold text-gray-800">100%</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 mt-2">
              {sourceData.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">{item.name}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. PLACEHOLDER PAGE
const PlaceholderPage = ({ title, icon }) => {
  // Safe dynamic icon lookup
  let IconComponent = FileText;
  if (LucideIcons && icon) {
     const pascalCase = icon.charAt(0).toUpperCase() + icon.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
     if (LucideIcons[pascalCase]) {
       IconComponent = LucideIcons[pascalCase];
     }
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] bg-white rounded-2xl border border-gray-100 shadow-sm border-dashed">
      <div className="p-6 bg-indigo-50 rounded-full mb-6">
        <IconComponent size={48} className="text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 text-center max-w-md">
        Cette page ({window.location.hash}) a sa propre URL unique comme demandé.
        Le contenu est en cours de construction.
      </p>
      <button className="mt-8 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
        Créer un nouveau {title.toLowerCase()}
      </button>
    </div>
  );
};

// 5. MAIN APP & LAYOUT
const Layout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="articles" element={<PlaceholderPage title="Articles" icon="file-text" />} />
          <Route path="pages" element={<PlaceholderPage title="Pages" icon="layers" />} />
          <Route path="comments" element={<PlaceholderPage title="Commentaires" icon="message-square" />} />
          <Route path="layout" element={<PlaceholderPage title="Mise en page" icon="layout" />} />
          <Route path="settings" element={<PlaceholderPage title="Paramètres" icon="settings" />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

// 6. RENDER
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);