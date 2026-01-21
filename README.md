
 AI eCommerce SWOT Analyzer

An AI-powered business intelligence platform for eCommerce analytics, featuring automated SWOT analysis, predictive insights, and competitive benchmarking through a modern interactive dashboard.

## 🌐 Live Demo
👉 https://ai-ecommerce-swot-dashboard.vercel.app

---

## 🎯 Features

- Automated SWOT Analysis** – AI-generated strengths, weaknesses, opportunities, and threats  
- Predictive Analytics** – Revenue forecasting, growth trends, and risk signals  
- Competitive Benchmarking** – Compare multiple datasets side-by-side  
- Interactive Visualizations** – Animated charts and KPI dashboards  
- Strategic Recommendations** – Actionable AI-powered business insights  

---

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Gemini API
- **Charts**: Recharts
- **CSV Parsing**: PapaParse
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/harshh1505/ai-ecommerce-swot-dashboard.git
cd ai-ecommerce-swot-dashboard
````

2. Install dependencies

```bash
npm install
```

3. Add environment variables
   Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

---

## 📊 How to Use

1. Upload one or more CSV files containing eCommerce transaction data
2. Click **Generate AI Analysis**
3. Explore insights across Overview, Predictions, Charts, and Comparison tabs
4. Use the AI-generated SWOT analysis and recommendations for decision-making

---

## 📄 CSV Format

Your CSV file should include the following columns:

| Column Name    | Description                   |
| -------------- | ----------------------------- |
| `product_name` | Name of the product           |
| `category`     | Product category              |
| `amount`       | Transaction amount            |
| `status`       | completed / failed / returned |
| `date`         | Transaction date              |

---

## 📁 Project Structure

```bash
src/
├── components/        # Reusable UI components
├── services/          # AI & data processing logic
├── utils/             # Helper functions
├── views/             # Dashboard sections
├── App.jsx            # Main application component
└── main.jsx           # Entry point
```

---

## 🎨 Feature Breakdown

### Overview

* Key business KPIs (Revenue, Orders, Growth, Returns)
* Executive summary
* AI-powered SWOT analysis
* Strategic recommendations

### Predictions

* Revenue forecast
* Growth trend analysis
* Risk indicators
* Seasonality insights

### Charts

* Revenue distribution by category
* Top-performing products

### Comparison

* Multi-file comparison
* Competitive benchmarking
* Side-by-side metrics analysis

---

## 🔮 Future Enhancements

* Backend API with Node.js & PostgreSQL
* User authentication and dashboards
* Shopify / WooCommerce integrations
* Advanced ML-based forecasting
* Historical trend tracking
* Scheduled email reports

---

## 📝 License

MIT License — free to use and modify.

---

## 👨‍💻 Author

**Harsh Singh**

* LinkedIn: [https://linkedin.com/in/harsh-singh-b9b77629a](https://linkedin.com/in/harsh-singh-b9b77629a)
* GitHub: [https://github.com/harshh1505](https://github.com/harshh1505)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to fork the repository and submit a pull request 🚀

```
