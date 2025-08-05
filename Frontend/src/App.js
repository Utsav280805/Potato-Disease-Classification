import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import axios from 'axios';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setError(null);
    setPrediction(null);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      setError('कृपया एक छवि अपलोड करें / Please upload an image');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await axios.post(
        process.env.REACT_APP_MODEL_URL || 'http://localhost:8000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setPrediction(response.data);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(
        err.response?.data?.detail || 
        'नेटवर्क त्रुटि / Network error. Please check if the API server is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="min-h-screen farm-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-farm-green-800 mb-4">
              🥔 आलू रोग निदान / Potato Disease Detection
            </h1>
            <p className="text-earth-brown-700 text-lg">
              अपने आलू के पत्तों की तस्वीर अपलोड करें और तुरंत रोग की जांच कराएं<br />
              Upload potato leaf images for instant disease detection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-farm-green-700 mb-4">
                📷 छवि अपलोड करें / Upload Image
              </h2>
              
              <ImageUploader 
                onImageSelect={handleImageSelect}
                imagePreview={imagePreview}
              />
              
              {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-red-700 text-center font-medium">
                    ⚠️ {error}
                  </p>
                </div>
              )}

              <div className="mt-6 flex gap-4 justify-center">
                <button
                  onClick={handlePredict}
                  disabled={!selectedImage || isLoading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      जांच रहे हैं... / Analyzing...
                    </>
                  ) : (
                    <>
                      🔍 रोग की जांच करें / Detect Disease
                    </>
                  )}
                </button>
                
                {(selectedImage || prediction) && (
                  <button
                    onClick={handleReset}
                    className="btn-secondary"
                  >
                    🔄 नया विश्लेषण / New Analysis
                  </button>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-farm-green-700 mb-4">
                📊 परिणाम / Results
              </h2>
              
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <LoadingSpinner />
                  <p className="mt-4 text-earth-brown-600">
                    आलू के पत्तों का विश्लेषण कर रहे हैं...<br />
                    Analyzing potato leaves...
                  </p>
                </div>
              )}

              {prediction && !isLoading && (
                <ResultDisplay prediction={prediction} />
              )}

              {!prediction && !isLoading && (
                <div className="text-center py-12 text-earth-brown-500">
                  <div className="text-6xl mb-4">🌱</div>
                  <p>
                    परिणाम यहाँ दिखाए जाएंगे<br />
                    Results will appear here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 card p-6">
            <h3 className="text-xl font-semibold text-farm-green-700 mb-4">
              ℹ️ जानकारी / Information
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🟢</div>
                <h4 className="font-semibold text-farm-green-700">Healthy / स्वस्थ</h4>
                <p className="text-sm text-earth-brown-600">
                  पत्ते स्वस्थ हैं<br />
                  Leaves are healthy
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🟡</div>
                <h4 className="font-semibold text-crop-yellow-700">Early Blight / शुरुआती अंगमारी</h4>
                <p className="text-sm text-earth-brown-600">
                  प्रारंभिक रोग के लक्षण<br />
                  Early disease symptoms
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🔴</div>
                <h4 className="font-semibold text-red-700">Late Blight / देर से होने वाली अंगमारी</h4>
                <p className="text-sm text-earth-brown-600">
                  गंभीर रोग के लक्षण<br />
                  Severe disease symptoms
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-farm-green-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            🌾 किसान मित्र - आलू रोग निदान सिस्टम / Kisan Mitra - Potato Disease Detection System
          </p>
          <p className="text-farm-green-200 text-sm">
            Empowering farmers with AI-powered crop health monitoring
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
