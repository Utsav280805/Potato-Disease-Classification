import React from 'react';

const ResultDisplay = ({ prediction }) => {
  const { class: diseaseClass, confidence } = prediction;
  
  const getDiseaseBadgeClass = (disease) => {
    switch (disease.toLowerCase()) {
      case 'healthy':
        return 'badge-healthy';
      case 'early blight':
        return 'badge-early-blight';
      case 'late blight':
        return 'badge-late-blight';
      default:
        return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium';
    }
  };

  const getHindiTranslation = (disease) => {
    switch (disease.toLowerCase()) {
      case 'healthy':
        return 'स्वस्थ';
      case 'early blight':
        return 'शुरुआती अंगमारी';
      case 'late blight':
        return 'देर से होने वाली अंगमारी';
      default:
        return disease;
    }
  };

  const getEmoji = (disease) => {
    switch (disease.toLowerCase()) {
      case 'healthy':
        return '✅';
      case 'early blight':
        return '⚠️';
      case 'late blight':
        return '🚨';
      default:
        return '🔍';
    }
  };

  const getRecommendation = (disease) => {
    switch (disease.toLowerCase()) {
      case 'healthy':
        return {
          hindi: 'आपके आलू के पत्ते स्वस्थ हैं! नियमित देखभाल जारी रखें।',
          english: 'Your potato leaves are healthy! Continue regular care.',
          action: 'निवारक उपाय जारी रखें / Continue preventive measures'
        };
      case 'early blight':
        return {
          hindi: 'शुरुआती अंगमारी का संकेत। तुरंत उपचार शुरू करें।',
          english: 'Early blight detected. Start treatment immediately.',
          action: 'कवकनाशी का छिड़काव करें / Apply fungicide spray'
        };
      case 'late blight':
        return {
          hindi: 'देर से होने वाली अंगमारी - तत्काल कार्रवाई आवश्यक।',
          english: 'Late blight detected - immediate action required.',
          action: 'विशेषज्ञ सलाह लें / Consult agricultural expert'
        };
      default:
        return {
          hindi: 'परिणाम की व्याख्या उपलब्ध नहीं।',
          english: 'Result interpretation not available.',
          action: 'और जांच की आवश्यकता / Further examination needed'
        };
    }
  };

  const confidencePercentage = Math.round(confidence * 100);
  const recommendation = getRecommendation(diseaseClass);

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className="text-center">
        <div className="text-4xl mb-3">
          {getEmoji(diseaseClass)}
        </div>
        <div className="space-y-2">
          <span className={getDiseaseBadgeClass(diseaseClass)}>
            {getHindiTranslation(diseaseClass)} / {diseaseClass}
          </span>
          <div className="mt-3">
            <div className="text-2xl font-bold text-farm-green-800">
              {confidencePercentage}%
            </div>
            <div className="text-sm text-earth-brown-600">
              विश्वसनीयता / Confidence
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-earth-brown-600">
          <span>विश्वसनीयता स्तर / Confidence Level</span>
          <span>{confidencePercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              confidencePercentage >= 80
                ? 'bg-farm-green-500'
                : confidencePercentage >= 60
                ? 'bg-crop-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${confidencePercentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-earth-brown-500 text-center">
          {confidencePercentage >= 80
            ? 'उच्च विश्वसनीयता / High Confidence'
            : confidencePercentage >= 60
            ? 'मध्यम विश्वसनीयता / Medium Confidence'
            : 'कम विश्वसनीयता / Low Confidence'}
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-r from-farm-green-50 to-crop-yellow-50 border border-farm-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-farm-green-800 mb-3 flex items-center gap-2">
          💊 सुझाव / Recommendation
        </h4>
        <div className="space-y-2 text-sm">
          <p className="text-earth-brown-700 font-medium">
            {recommendation.hindi}
          </p>
          <p className="text-earth-brown-600">
            {recommendation.english}
          </p>
          <div className="mt-3 p-2 bg-white rounded border-l-4 border-farm-green-500">
            <p className="text-farm-green-700 font-medium">
              🎯 {recommendation.action}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-secondary text-sm py-2">
          📞 विशेषज्ञ से संपर्क / Contact Expert
        </button>
        <button className="btn-secondary text-sm py-2">
          📊 रिपोर्ट सेव करें / Save Report
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-earth-brown-500 text-center p-3 bg-gray-50 rounded">
        ⚠️ यह एक AI आधारित निदान है। गंभीर मामलों में कृषि विशेषज्ञ से सलाह लें।<br />
        This is an AI-based diagnosis. Consult agricultural experts for serious cases.
      </div>
    </div>
  );
};

export default ResultDisplay;
