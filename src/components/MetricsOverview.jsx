import React from 'react';
import { DollarSign, Package, XCircle, TrendingUp, Users, ShoppingBag, Percent, BarChart2 } from 'lucide-react';
import MetricCard from './MetricCard';

const MetricsOverview = ({ metrics }) => {
  const metricCards = [
    {
      icon: <DollarSign />,
      label: "Total Revenue",
      value: `$${metrics.totalRevenue.toFixed(0)}`,
      color: "green",
      description: "Total sales revenue"
    },
    {
      icon: <Package />,
      label: "Total Orders",
      value: metrics.totalOrders.toLocaleString(),
      color: "blue",
      description: "Number of successful orders"
    },
    {
      icon: <ShoppingBag />,
      label: "Avg Order Value",
      value: `$${metrics.avgOrderValue.toFixed(2)}`,
      color: "purple",
      description: "Average revenue per order"
    },
    {
      icon: <XCircle />,
      label: "Return Rate",
      value: `${metrics.returnRate.toFixed(1)}%`,
      color: "orange",
      description: "Percentage of returned orders"
    },
    {
      icon: <Percent />,
      label: "Failure Rate",
      value: `${metrics.failureRate.toFixed(1)}%`,
      color: "red",
      description: "Failed payment percentage"
    },
    {
      icon: <TrendingUp />,
      label: "Growth Trend",
      value: metrics.growthTrend,
      color: metrics.growthTrend.includes('-') ? "red" : "green",
      description: "Revenue growth over time"
    },
    {
      icon: <Users />,
      label: "Total Products",
      value: metrics.totalProducts,
      color: "cyan",
      description: "Unique products sold"
    },
    {
      icon: <BarChart2 />,
      label: "Repeat Customers",
      value: metrics.repeatCustomers || 0,
      color: "indigo",
      description: "Customers with multiple orders"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-bold text-white">Key Performance Indicators</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricCards.map((card, index) => (
          <div key={index} className="fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <MetricCard {...card} />
          </div>
        ))}
      </div>

      {metrics.topProducts && metrics.topProducts.length > 0 && (
        <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">Top Performing Products</h3>
          <div className="flex flex-wrap gap-2">
            {metrics.topProducts.map((product, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-200 px-3 py-2 rounded-lg text-sm border border-purple-500/30"
              >
                <span className="font-bold text-white">#{index + 1}</span> {product}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsOverview;