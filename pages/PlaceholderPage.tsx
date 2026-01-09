import React from 'react';
import { FileText, Layers, MessageSquare, Layout, Settings, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  icon: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, icon }) => {
  // Dynamically get icon (simplified for this example)
  // In a real app, you might map string names to components more safely
  const IconComponent = (LucideIcons as any)[icon.charAt(0).toUpperCase() + icon.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase())] || FileText;

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
        Créer un nouveau {title.toLowerCase().slice(0, -1)}
      </button>
    </div>
  );
};

export default PlaceholderPage;