# 🥔 Potato Disease Classification — Fullstack Project

A fullstack AI/ML project for potato disease classification using **FastAPI**, **TensorFlow Serving**, and **ReactJS**.

## 📦 Prerequisites

### Python Setup

1. **Install Python**
   * [Python Installation Guide](https://www.python.org/downloads/)

2. **Install Python Packages**
   ```bash
   pip3 install -r training/requirements.txt
   pip3 install -r api/requirements.txt
   ```

3. **Install TensorFlow Serving**
   * [TensorFlow Serving Setup Guide](https://www.tensorflow.org/tfx/guide/serving)

### ReactJS Setup

1. **Install Node.js**
   * [Node.js Installation Guide](https://nodejs.org/en/download/)

2. **Install NPM**
   * Included with Node.js

3. **Install Dependencies**
   ```bash
   cd frontend
   npm install --from-lock-json
   npm audit fix
   ```

4. **Environment Variables**
   * Copy `.env.example` to `.env`
   * Update the API URL inside `.env`

## 🚀 Running the Backend API

### Option 1: FastAPI Only

```bash
cd api
uvicorn main:app --reload --host 0.0.0.0
```

* Your API will be live at: http://0.0.0.0:8000

### Option 2: FastAPI + TensorFlow Serving

1. **Configure Models**
   ```bash
   cd api
   cp models.config.example models.config
   # Edit file paths inside models.config
   ```

2. **Run TensorFlow Serving**
   ```bash
   docker run -t --rm -p 8501:8501 \
   -v C:/Code/potato-disease-classification:/potato-disease-classification \
   tensorflow/serving \
   --rest_api_port=8501 \
   --model_config_file=/potato-disease-classification/models.config
   ```

3. **Start FastAPI with TF Serve**
   ```bash
   uvicorn main-tf-serving:app --reload --host 0.0.0.0
   ```

   * API runs at: http://0.0.0.0:8000

## 🌐 Running the Frontend

1. **Navigate to Frontend Folder**
   ```bash
   cd frontend
   ```

2. **Setup Environment**
   * Copy `.env.example` to `.env`
   * Update `REACT_APP_API_URL` if needed

3. **Start Frontend**
   ```bash
   npm run start
   ```

## 📁 Project Structure

```
/training                → ML model training
/api                     → FastAPI backend
/frontend                → ReactJS frontend
/models.config           → TensorFlow model configs
.env / .env.example      → Environment settings
```

## 🛠 Support & Contributions

Feel free to raise issues or contribute via pull requests.

---

**Happy Coding! 🚀**
