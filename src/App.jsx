import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import MetricsOverview from './components/MetricsOverview';
import SWOTAnalysis from './components/SWOTAnalysis';
import ChartsView from './components/ChartsView';
import PredictionsView from './components/PredictionsView';
import ComparisonView from './components/ComparisonView';
import ErrorAlert from './components/ErrorAlert';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Layout/Header';
import TabNavigation from './components/Layout/TabNavigation';
import AnalysisControls from './components/AnalysisControls';
import { analyzeDataWithGemini } from './services/geminiService';
import { parseMultipleCSV } from './services/csvParserService';
import { calculateMetrics, getPredictions } from './utils/dataAnalysis';
import { exportReport } from './utils/exportUtils';
import './index.css';

function App() {
  const [files, setFiles] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleFileUpload = async (uploadedFiles) => {
    setError(null);
    setAnalysis(null);
    
    try {
      const parsedFiles = await parseMultipleCSV(uploadedFiles);
      setFiles(parsedFiles);
    } catch (err) {
      setError(`Error parsing files: ${err.message}`);
      setFiles([]);
    }
  };

  const handleAnalyze = async () => {
    if (!files.length) {
      setError("Please upload at least one CSV file");
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const allMetrics = files.map(f => ({
        name: f.name.replace('.csv', ''),
        metrics: calculateMetrics(f.data),
        data: f.data
      }));

      const primaryMetrics = allMetrics[0].metrics;
      const predictions = getPredictions(allMetrics[0].data);
      const isComparison = files.length > 1;

      const swotData = await analyzeDataWithGemini({
        metrics: primaryMetrics,
        predictions,
        allMetrics,
        isComparison
      });

      setAnalysis({
        swot: swotData,
        allMetrics,
        metrics: primaryMetrics,
        predictions,
        isComparison
      });
    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
      console.error('Analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleExport = () => {
    if (analysis) {
      exportReport(analysis);
    }
  };

  const handleDownloadSample = () => {
    const csv = `product_name,category,amount,status,date
Wireless Headphones,Electronics,89.99,completed,2024-01-15
Smart Watch,Electronics,199.99,completed,2024-01-16
Yoga Mat,Fitness,29.99,completed,2024-01-17
Running Shoes,Fitness,79.99,returned,2024-01-18
Laptop Stand,Office,45.99,completed,2024-01-19
Coffee Maker,Home,129.99,failed,2024-01-20
Phone Case,Electronics,19.99,completed,2024-01-21
Bluetooth Speaker,Electronics,69.99,completed,2024-01-24
Fitness Tracker,Fitness,149.99,completed,2024-01-26
Gaming Keyboard,Electronics,129.99,completed,2024-02-03`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_ecommerce_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderActiveTab = () => {
    if (!analysis) return null;

    switch (activeTab) {
      case 'overview':
        return (
          <>
            <MetricsOverview metrics={analysis.metrics} />
            <SWOTAnalysis swotData={analysis.swot} />
          </>
        );
      case 'predictions':
        return <PredictionsView predictions={analysis.predictions} insights={analysis.swot.predictiveInsights} />;
      case 'charts':
        return <ChartsView analysis={analysis} />;
      case 'comparison':
        return analysis.isComparison ? <ComparisonView analysis={analysis} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        <Header />
        
        <FileUploader 
          onFileUpload={handleFileUpload}
          onDownloadSample={handleDownloadSample}
          files={files}
        />

        {files.length > 0 && (
          <AnalysisControls 
            onAnalyze={handleAnalyze}
            analyzing={analyzing}
          />
        )}

        <ErrorAlert error={error} />

        {analyzing && <LoadingSpinner />}

        {analysis && (
          <>
            <TabNavigation 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              hasComparison={analysis.isComparison}
              onExport={handleExport}
            />
            
            <div className="space-y-6">
              {renderActiveTab()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;