import React from 'react';
import { Eye, Users, FileText, ArrowUpRight } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Data for Line Chart
const trafficData = [
  { name: 'Lun', visits: 2500 },
  { name: 'Mar', visits: 1800 },
  { name: 'Mer', visits: 1500 },
  { name: 'Jeu', visits: 9500 }, // Peak
  { name: 'Ven', visits: 4000 },
  { name: 'Sam', visits: 4800 },
  { name: 'Dim', visits: 3800 },
  { name: 'Lun2', visits: 4200 },
];

// Data for Pie Chart
const sourceData = [
  { name: 'Recherche Org.', value: 45, color: '#4F46E5' }, // Indigo 600
  { name: 'Réseaux Sociaux', value: 25, color: '#EC4899' }, // Pink 500
  { name: 'Direct', value: 20, color: '#0EA5E9' }, // Sky 500
  { name: 'Référents', value: 10, color: '#8B5CF6' }, // Violet 500
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Bonsoir Admin ! <span className="text-2xl">🌙</span>
        </h2>
        <p className="text-gray-500 mt-1">Voici les performances de NEWS AI cette semaine.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
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

        {/* Card 2 */}
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

        {/* Card 3 - Partial match to screenshot, simpler view */}
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
             {/* Spacer to align heights if needed, or put data here */}
            <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-400 text-xs font-bold px-2.5 py-1 rounded-md">
              -
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart: Trafic & Visites */}
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

        {/* Donut Chart: Sources */}
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
              {/* Centered Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="text-2xl font-bold text-gray-800">100%</span>
              </div>
            </div>

            {/* Custom Legend */}
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

export default Dashboard;