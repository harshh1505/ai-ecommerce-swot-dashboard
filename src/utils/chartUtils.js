export const prepareChartData = (analysis) => {
  if (!analysis) return null;

  // Prepare category data for pie chart
  const catData = Object.entries(analysis.metrics.categoryRevenue)
    .map(([name, value]) => ({ 
      name, 
      value: parseFloat(value.toFixed(2)) 
    }))
    .sort((a, b) => b.value - a.value);

  // Prepare product data for bar chart (top 6)
  const prodData = Object.entries(analysis.metrics.productRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, revenue]) => ({ 
      name: name.length > 15 ? name.substring(0, 15) + '...' : name, 
      revenue: parseFloat(revenue.toFixed(2)) 
    }));

  // Prepare comparison data if available
  const compData = analysis.isComparison 
    ? analysis.allMetrics.map(m => ({ 
        name: m.name, 
        revenue: m.metrics.totalRevenue, 
        orders: m.metrics.totalOrders,
        aov: m.metrics.avgOrderValue
      }))
    : null;

  return { catData, prodData, compData };
};

export const getChartColors = () => {
  return [
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#84cc16', // Lime
    '#6366f1', // Indigo
  ];
};