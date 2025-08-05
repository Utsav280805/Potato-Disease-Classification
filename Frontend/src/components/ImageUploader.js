import React, { useRef } from 'react';

const ImageUploader = ({ onImageSelect, imagePreview }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('कृपया केवल छवि फ़ाइलें अपलोड करें / Please upload only image files');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('फ़ाइल का आकार 5MB से कम होना चाहिए / File size should be less than 5MB');
        return;
      }
      
      onImageSelect(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect({ target: { files: [file] } });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-farm-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-farm-green-500 transition-colors duration-200"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {imagePreview ? (
          <div className="space-y-4">
            <img
              src={imagePreview}
              alt="Selected potato leaf"
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
            />
            <p className="text-farm-green-600 font-medium">
              ✅ छवि चुनी गई / Image selected
            </p>
            <p className="text-sm text-earth-brown-600">
              नई छवि के लिए क्लिक करें / Click for new image
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl">📸</div>
            <div>
              <p className="text-lg font-medium text-farm-green-700 mb-2">
                आलू के पत्ते की तस्वीर अपलोड करें
              </p>
              <p className="text-earth-brown-600 mb-4">
                Upload potato leaf image
              </p>
              <div className="text-sm text-earth-brown-500 space-y-1">
                <p>• Click to browse or drag & drop</p>
                <p>• Support: JPG, PNG, GIF</p>
                <p>• Max size: 5MB</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full btn-secondary flex items-center justify-center gap-2"
      >
        <span>📂</span>
        फ़ाइल चुनें / Choose File
      </button>

      {/* Tips */}
      <div className="bg-crop-yellow-50 border border-crop-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-crop-yellow-800 mb-2">
          💡 बेहतर परिणामों के लिए / For better results:
        </h4>
        <ul className="text-sm text-crop-yellow-700 space-y-1">
          <li>• स्पष्ट और तेज़ तस्वीर लें / Take clear and sharp images</li>
          <li>• पत्ते को पूरी तरह दिखाएं / Show the complete leaf</li>
          <li>• अच्छी रोशनी में फोटो लें / Take photos in good lighting</li>
          <li>• कैमरा स्थिर रखें / Keep camera steady</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;
