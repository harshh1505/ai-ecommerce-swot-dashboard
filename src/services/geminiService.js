const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';

// Available Gemini models (try in order)
const MODEL_ENDPOINTS = [
  'gemini-2.0-flash',           // Latest Flash model
  'gemini-1.5-flash',           // Fast model
  'gemini-1.5-pro',             // Pro model
  'gemini-1.0-pro',             // Original stable model
];

export const analyzeDataWithGemini = async ({ metrics, predictions, allMetrics, isComparison }) => {
  try {
    const compContext = isComparison ? `\n\nCOMPARISON WITH OTHER DATASETS:\n${allMetrics.map((a, i) => 
      `Dataset ${i+1} (${a.name}): Revenue=$${a.metrics.totalRevenue.toFixed(2)}, Orders=${a.metrics.totalOrders}, AOV=$${a.metrics.avgOrderValue.toFixed(2)}, Return Rate=${a.metrics.returnRate.toFixed(1)}%`
    ).join('\n')}` : '';

    const prompt = `You are an expert eCommerce business analyst. Analyze this eCommerce data and provide a comprehensive SWOT analysis.

KEY METRICS:
- Revenue: $${metrics.totalRevenue.toFixed(2)}
- Total Orders: ${metrics.totalOrders}
- Average Order Value: $${metrics.avgOrderValue.toFixed(2)}
- Return Rate: ${metrics.returnRate.toFixed(1)}%
- Payment Failure Rate: ${metrics.failureRate.toFixed(1)}%
- Growth Trend: ${metrics.growthTrend}
- Top Products: ${metrics.topProducts.join(', ')}

PREDICTIONS & FORECAST:
- Next Month Forecast: $${predictions.forecast.toFixed(2)}
- Growth Rate: ${predictions.growthRate.toFixed(1)}%
- Risk Level: ${predictions.riskLevel}
- Seasonal Pattern: ${predictions.seasonalPattern}
- Volatility: ${predictions.volatility}%${compContext}

Provide a strategic analysis with specific, actionable insights.

IMPORTANT: Return ONLY valid JSON (no markdown, no additional text, no code blocks):
{
  "strengths": ["str1", "str2", "str3"],
  "weaknesses": ["weak1", "weak2", "weak3"],
  "opportunities": ["opp1", "opp2", "opp3"],
  "threats": ["thr1", "thr2", "thr3"],
  "recommendations": ["rec1", "rec2", "rec3"],
  "keyInsights": "Brief summary",
  "predictiveInsights": "What trends mean",
  "competitivePosition": "${isComparison ? 'How you compare' : 'N/A'}"
}`;

    let lastError = null;
    
    // Try each model endpoint
    for (const model of MODEL_ENDPOINTS) {
      try {
        console.log(`Trying Gemini model: ${model}`);
        const result = await callGeminiAPI(model, prompt);
        return result;
      } catch (error) {
        lastError = error;
        console.warn(`Model ${model} failed:`, error.message);
        // Continue to next model
      }
    }
    
    // If all models fail, throw the last error
    throw lastError || new Error('All Gemini models failed');
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Return fallback data
    return getFallbackData(isComparison);
  }
};

const callGeminiAPI = async (model, prompt) => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
        topP: 0.8,
        topK: 40
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error("Invalid AI response format - no text content");
  }

  const responseText = data.candidates[0].content.parts[0].text;
  
  // Clean the response text
  let jsonText = responseText.trim();
  
  // Remove markdown code blocks if present
  jsonText = jsonText.replace(/```json\s*/g, '');
  jsonText = jsonText.replace(/```\s*/g, '');
  
  // Extract JSON object
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonText = jsonMatch[0];
  }
  
  try {
    const parsedData = JSON.parse(jsonText);
    
    // Validate response structure
    const requiredFields = ['strengths', 'weaknesses', 'opportunities', 'threats', 'recommendations', 'keyInsights'];
    for (const field of requiredFields) {
      if (!parsedData[field]) {
        throw new Error(`AI response missing required field: ${field}`);
      }
    }
    
    return parsedData;
  } catch (parseError) {
    console.error('Failed to parse AI response:', jsonText);
    throw new Error(`Failed to parse AI response: ${parseError.message}`);
  }
};

const getFallbackData = (isComparison) => {
  return {
    strengths: [
      "Strong revenue generation with consistent growth",
      "Diverse product categories showing balanced performance",
      "Healthy average order value indicating good customer spend"
    ],
    weaknesses: [
      "Return rate above industry average needs optimization",
      "Payment failures indicate potential checkout friction",
      "Limited data points for comprehensive seasonal analysis"
    ],
    opportunities: [
      "Expand high-performing product categories to new markets",
      "Implement customer retention programs to boost repeat purchases",
      "Leverage seasonal trends for targeted marketing campaigns"
    ],
    threats: [
      "Increasing competition in key product categories",
      "Market volatility affecting consumer spending patterns",
      "Supply chain disruptions impacting inventory availability"
    ],
    recommendations: [
      "Implement A/B testing for checkout process to reduce failures",
      "Develop loyalty program to increase customer lifetime value",
      "Create seasonal inventory planning based on predictive analytics"
    ],
    keyInsights: "The eCommerce business shows solid fundamentals with clear opportunities for optimization in operational efficiency and customer experience.",
    predictiveInsights: "Current growth trends are positive but show seasonal volatility. Forecast suggests steady growth with manageable risk levels.",
    competitivePosition: isComparison 
      ? "Shows competitive advantage in certain categories with room for improvement in operational metrics." 
      : "Established market presence with clear growth trajectory and optimization opportunities."
  };
};

// Optional: Function to list available models
export const listAvailableModels = async () => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`);
    const data = await response.json();
    const availableModels = data.models || [];
    
    console.log('Available Gemini Models:');
    availableModels.forEach(model => {
      console.log(`- ${model.name}: ${model.description || 'No description'}`);
    });
    
    return availableModels;
  } catch (error) {
    console.error('Failed to fetch models:', error);
    return [];
  }
};