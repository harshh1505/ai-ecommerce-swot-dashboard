import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { prepareChartData } from '../utils/chartUtils';

const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const ChartsView = ({ analysis }) => {
  if (!analysis) return null;
  
  const charts = prepareChartData(analysis);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h3 className="text-base font-bold text-white mb-3">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie 
                data={charts.catData} 
                cx="50%" 
                cy="50%" 
                outerRadius={95} 
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {charts.catData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h3 className="text-base font-bold text-white mb-3">Top Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={charts.prodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis 
                dataKey="name" 
                stroke="#fff" 
                angle={-45} 
                textAnchor="end" 
                height={80} 
                fontSize={11} 
              />
              <YAxis 
                stroke="#fff" 
                fontSize={11} 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsView;