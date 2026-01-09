import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import Dashboard from './pages/Dashboard.tsx';
import PlaceholderPage from './pages/PlaceholderPage.tsx';

// Layout component to wrap the Sidebar, Header and Main Content
const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 overflow-hidden">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header - Sticky top */}
        <Header />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redirect root to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard Route */}
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Other Routes as per requirement to have unique URLs */}
          <Route path="articles" element={<PlaceholderPage title="Articles" icon="file-text" />} />
          <Route path="pages" element={<PlaceholderPage title="Pages" icon="layers" />} />
          <Route path="comments" element={<PlaceholderPage title="Commentaires" icon="message-square" />} />
          <Route path="layout" element={<PlaceholderPage title="Mise en page" icon="layout" />} />
          <Route path="settings" element={<PlaceholderPage title="Paramètres" icon="settings" />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;