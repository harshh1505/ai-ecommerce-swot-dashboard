export const calculateMetrics = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No data provided for analysis');
  }

  // Clean and validate data
  const cleanData = data.filter(row => {
    const amount = parseFloat(row.amount || row.price || 0);
    const status = (row.status || '').toLowerCase().trim();
    return !isNaN(amount) && amount > 0 && ['completed', 'failed', 'returned', 'pending', 'refunded'].includes(status);
  });

  if (cleanData.length === 0) {
    throw new Error('No valid data rows found');
  }

  // Calculate basic metrics
  const totalProducts = new Set(cleanData.map(r => r.product_name || r.product || 'Unknown')).size;
  
  const totalRevenue = cleanData.reduce((sum, r) => {
    const amt = parseFloat(r.amount || r.price || 0);
    const status = (r.status || '').toLowerCase();
    return status === 'completed' ? sum + amt : sum;
  }, 0);
  
  const totalOrders = cleanData.filter(r => (r.status || '').toLowerCase() === 'completed').length;
  const failedPayments = cleanData.filter(r => (r.status || '').toLowerCase() === 'failed').length;
  const returns = cleanData.filter(r => (r.status || '').toLowerCase() === 'returned').length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const returnRate = totalOrders > 0 ? (returns / totalOrders) * 100 : 0;
  const failureRate = cleanData.length > 0 ? (failedPayments / cleanData.length) * 100 : 0;
  
  // Calculate product and category revenue
  const productRevenue = {};
  const categoryRevenue = {};
  const monthlyRevenue = {};
  const customerOrders = {};
  
  cleanData.forEach(r => {
    const prod = r.product_name || r.product || 'Unknown';
    const cat = r.category || 'Uncategorized';
    const amt = parseFloat(r.amount || r.price || 0);
    const status = (r.status || '').toLowerCase();
    const date = r.date ? new Date(r.date) : null;
    const customer = r.customer_id || r.customer_email || 'Unknown';
    
    if (status === 'completed') {
      // Product revenue
      productRevenue[prod] = (productRevenue[prod] || 0) + amt;
      
      // Category revenue
      categoryRevenue[cat] = (categoryRevenue[cat] || 0) + amt;
      
      // Monthly revenue
      if (date) {
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + amt;
      }
      
      // Customer orders
      customerOrders[customer] = (customerOrders[customer] || 0) + 1;
    }
  });
  
  // Top products
  const topProducts = Object.entries(productRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([p]) => p);
  
  // Growth trend calculation
  const sortedMonths = Object.keys(monthlyRevenue).sort();
  let growthTrend = 'N/A';
  
  if (sortedMonths.length >= 2) {
    const recentMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths[sortedMonths.length - 2];
    const recentRevenue = monthlyRevenue[recentMonth];
    const previousRevenue = monthlyRevenue[previousMonth];
    
    if (previousRevenue > 0) {
      const growth = ((recentRevenue - previousRevenue) / previousRevenue) * 100;
      growthTrend = `${growth.toFixed(1)}%`;
    }
  }
  
  // Calculate customer metrics
  const totalCustomers = Object.keys(customerOrders).length;
  const repeatCustomers = Object.values(customerOrders).filter(count => count > 1).length;
  const repeatPurchaseRate = totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0;
  
  return { 
    totalProducts, 
    totalRevenue, 
    totalOrders, 
    failedPayments, 
    returns, 
    avgOrderValue, 
    returnRate, 
    failureRate, 
    topProducts, 
    categoryRevenue, 
    productRevenue, 
    growthTrend,
    totalCustomers,
    repeatCustomers,
    repeatPurchaseRate,
    monthlyRevenue
  };
};

export const getPredictions = (data) => {
  const cleanData = data.filter(r => {
    const amount = parseFloat(r.amount || r.price || 0);
    const status = (r.status || '').toLowerCase();
    return status === 'completed' && !isNaN(amount) && amount > 0;
  });

  if (cleanData.length === 0) {
    return {
      forecast: 0,
      growthRate: 0,
      seasonalPattern: 'Insufficient Data',
      riskLevel: 'High',
      volatility: 0
    };
  }

  // Group revenue by date
  const revByDate = {};
  cleanData.forEach(r => {
    const date = r.date ? new Date(r.date).toISOString().split('T')[0] : 'Unknown';
    const amt = parseFloat(r.amount || 0);
    revByDate[date] = (revByDate[date] || 0) + amt;
  });

  const dates = Object.keys(revByDate).filter(d => d !== 'Unknown').sort();
  const revs = dates.map(date => revByDate[date]);

  if (revs.length < 3) {
    return {
      forecast: revByDate[dates[dates.length - 1]] || 0,
      growthRate: 0,
      seasonalPattern: 'Insufficient Data',
      riskLevel: 'High',
      volatility: 0
    };
  }

  // Calculate basic statistics
  const avg = revs.reduce((a, b) => a + b, 0) / revs.length;
  const recent = revs.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, revs.length);
  const growthRate = avg > 0 ? ((recent - avg) / avg) * 100 : 0;

  // Simple linear regression for forecast
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  revs.forEach((value, index) => {
    sumX += index;
    sumY += value;
    sumXY += index * value;
    sumX2 += index * index;
  });

  const n = revs.length;
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  const forecast = intercept + slope * n;

  // Calculate volatility
  const variance = revs.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / revs.length;
  const volatility = avg > 0 ? (Math.sqrt(variance) / avg) * 100 : 0;

  // Determine seasonal pattern
  let seasonalPattern = 'Stable';
  if (volatility > 40) seasonalPattern = 'High Seasonality';
  else if (volatility > 20) seasonalPattern = 'Moderate Seasonality';

  // Determine risk level
  let riskLevel = 'Low';
  if (volatility > 40 || growthRate < -10) riskLevel = 'High';
  else if (volatility > 20 || growthRate < 0) riskLevel = 'Medium';

  return {
    forecast: Math.max(forecast, 0),
    growthRate: parseFloat(growthRate.toFixed(1)),
    seasonalPattern,
    riskLevel,
    volatility: parseFloat(volatility.toFixed(1))
  };
};