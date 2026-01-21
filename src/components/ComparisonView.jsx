import React from 'react';
import { Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComparisonView = ({ analysis }) => {
  if (!analysis.isComparison) return null;

  const comparisonData = analysis.allMetrics.map(m => ({
    name: m.name,
    revenue: m.metrics.totalRevenue,
    orders: m.metrics.totalOrders,
    aov: m.metrics.avgOrderValue,
    returnRate: m.metrics.returnRate
  }));

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-xl p-5 border border-cyan-400/30">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Users className="w-5 h-5" /> Competitive Analysis
        </h3>
        <p className="text-cyan-100">{analysis.swot.competitivePosition}</p>
      </div>

      <div className="bg-white/10 rounded-xl p-5 border border-white/20">
        <h3 className="text-base font-bold text-white mb-4">Dataset Comparison</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-purple-200 uppercase bg-white/5">
              <tr>
                <th className="px-4 py-3">Dataset</th>
                <th className="px-4 py-3">Revenue</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Avg Order Value</th>
                <th className="px-4 py-3">Return Rate</th>
                <th className="px-4 py-3">Failure Rate</th>
              </tr>
            </thead>
            <tbody>
              {analysis.allMetrics.map((metric, index) => (
                <tr key={index} className="border-b border-white/10">
                  <td className="px-4 py-3 text-white">{metric.name}</td>
                  <td className="px-4 py-3 text-green-300">${metric.metrics.totalRevenue.toFixed(2)}</td>
                  <td className="px-4 py-3 text-white">{metric.metrics.totalOrders}</td>
                  <td className="px-4 py-3 text-blue-300">${metric.metrics.avgOrderValue.toFixed(2)}</td>
                  <td className="px-4 py-3 text-orange-300">{metric.metrics.returnRate.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-red-300">{metric.metrics.failureRate.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#fff" fontSize={12} />
              <YAxis 
                stroke="#fff" 
                fontSize={11} 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => {
                  if (name === 'revenue' || name === 'aov') return [`$${value.toFixed(2)}`, name];
                  if (name === 'returnRate') return [`${value.toFixed(1)}%`, name];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="aov" fill="#06b6d4" name="Avg Order Value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Key Comparisons</h4>
          <ul className="space-y-2 text-sm text-purple-200">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Highest Revenue: {comparisonData.reduce((prev, curr) => prev.revenue > curr.revenue ? prev : curr).name}</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span>Best Avg Order Value: {comparisonData.reduce((prev, curr) => prev.aov > curr.aov ? prev : curr).name}</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Lowest Return Rate: {comparisonData.reduce((prev, curr) => prev.returnRate < curr.returnRate ? prev : curr).name}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;