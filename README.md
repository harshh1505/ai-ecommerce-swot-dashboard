# AI eCommerce SWOT Analyzer

AI-powered business intelligence platform for eCommerce analytics, featuring automated SWOT analysis, predictive forecasting, and competitive benchmarking.

# Link to it - ai-ecommerce-swot-dashboard.vercel.app

## 🎯 Features

- **Automated SWOT Analysis** - AI-powered strategic insights using Claude API
- **Predictive Analytics** - Revenue forecasting and risk assessment
- **Competitive Benchmarking** - Compare multiple datasets side-by-side
- **Interactive Visualizations** - Pie charts, bar charts, and dashboards
- **PDF Export** - Download comprehensive analysis reports

## 🛠️ Tech Stack

- **Frontend**: React 18
- **AI**: Claude API (Anthropic)
- **Charts**: Recharts
- **Data Processing**: Papaparse
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/harshh1505/ecommerce-swot-analyzer.git
cd ecommerce-swot-analyzer
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 How to Use

1. **Download Sample Data** - Click "Download Sample" to get example CSV
2. **Upload CSV Files** - Upload one or more CSV files with eCommerce data
3. **Generate Analysis** - Click "Generate AI Analysis" button
4. **Explore Results** - Navigate through Overview, Predictions, Charts, and Comparison tabs
5. **Export Report** - Download comprehensive analysis as text file

### CSV Format

Your CSV should have these columns:
- `product_name` - Name of the product
- `category` - Product category
- `amount` - Transaction amount
- `status` - Order status (completed, failed, returned)
- `date` - Transaction date

## 📁 Project Structure
```
src/
├── components/       # Reusable UI components
├── sections/         # Tab content components
├── services/         # Business logic and API calls
├── utils/           # Helper functions
└── App.jsx          # Main application component
```

## 🎨 Features Breakdown

### Overview Tab
- Key business metrics (Revenue, Orders, Return Rate, Growth)
- Executive summary insights
- SWOT analysis (Strengths, Weaknesses, Opportunities, Threats)
- Strategic recommendations

### Predictions Tab
- Next month revenue forecast
- Growth rate predictions
- Risk assessment
- Seasonal pattern detection

### Charts Tab
- Revenue distribution by category (Pie Chart)
- Top products by revenue (Bar Chart)

### Comparison Tab (Multi-file uploads)
- Competitive benchmarking
- Side-by-side metrics comparison
- Visual comparisons

## 🔮 Future Enhancements

- Backend API with PostgreSQL
- Real-time integrations (Shopify, WooCommerce, Stripe)
- User authentication and multi-tenancy
- Historical trend tracking
- Email report scheduling
- Advanced ML forecasting models

## 📝 License

MIT License - feel free to use for your projects!

## 👨‍💻 Author

Harsh - [LinkedIn](https://linkedin.com/in/harsh-singh-b9b77629a) | [GitHub](https://github.com/harshh1505)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
