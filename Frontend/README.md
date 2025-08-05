# 🥔 Kisan Mitra - Potato Disease Detection

A React.js application with an Indian farming theme for testing potato disease detection using machine learning. The app allows farmers to upload potato leaf images and get instant disease predictions.

## 🌟 Features

- **📸 Image Upload**: Drag & drop or click to upload potato leaf images
- **🤖 AI Prediction**: Real-time disease detection using TensorFlow model
- **🌾 Indian Farming Theme**: Farm-inspired design with Hindi/English bilingual support
- **📊 Results Display**: Clear disease classification with confidence scores
- **💡 Recommendations**: Treatment suggestions based on detected conditions
- **📱 Responsive Design**: Mobile-friendly interface
- **⚡ Fast Loading**: Optimized performance with loading indicators

## 🔬 Disease Detection

The app can detect three conditions:
- ✅ **Healthy** (स्वस्थ)
- ⚠️ **Early Blight** (शुरुआती अंगमारी)
- 🚨 **Late Blight** (देर से होने वाली अंगमारी)

## 🛠️ Tech Stack

- **Frontend**: React.js with functional components and hooks
- **Styling**: Tailwind CSS with custom farm theme
- **HTTP Client**: Axios for API requests
- **Icons**: Emoji-based icons for universal appeal
- **Fonts**: Noto Sans Devanagari for Hindi support

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Python backend API running (see API setup below)

### Installation

1. **Clone the repository**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   REACT_APP_MODEL_URL=http://localhost:8000/predict
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## 🔧 Backend API Setup

1. **Navigate to API directory**
   ```bash
   cd ../api
   ```

2. **Create virtual environment** (if not exists)
   ```bash
   python -m venv tf-env
   ```

3. **Activate virtual environment**
   ```bash
   # Windows
   tf-env\Scripts\activate
   
   # macOS/Linux
   source tf-env/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the API server**
   ```bash
   python main.py
   ```

The API will run at `http://localhost:8000`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── ImageUploader.js
│   │   ├── ResultDisplay.js
│   │   └── LoadingSpinner.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Theme Customization

The app uses a custom Tailwind theme with farm-inspired colors:

- **Farm Green**: Primary color for healthy states
- **Earth Brown**: Secondary colors for natural feel
- **Crop Yellow**: Warning states and accents

## 📱 Mobile Responsiveness

The app is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🌍 Internationalization

The app supports bilingual content:
- **Hindi**: For local Indian farmers
- **English**: For broader accessibility

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_MODEL_URL` | Backend API endpoint | `http://localhost:8000/predict` |

### API Requirements

The backend API should accept:
- **Method**: POST
- **Endpoint**: `/predict`
- **Content-Type**: `multipart/form-data`
- **Field**: `file` (image file)

Expected response:
```json
{
  "class": "Healthy|Early Blight|Late Blight",
  "confidence": 0.95
}
```

## 🚨 Error Handling

The app handles various error scenarios:
- Invalid file types
- File size too large (>5MB)
- Network connectivity issues
- API server unavailable
- Invalid API responses

## 🎯 Performance Optimizations

- Image compression and resizing
- Lazy loading for components
- Efficient re-renders with React hooks
- Optimized Tailwind CSS build
- Preloaded fonts for faster rendering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper testing
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Indian farmers and agricultural community
- TensorFlow team for the ML framework
- React and Tailwind CSS communities

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ for Indian farmers and the agricultural community**
