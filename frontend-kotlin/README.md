# 📱 Product Review Application - Kotlin (Android)

This directory is reserved for the Native Android implementation of the Product Review Application.

## 🎯 Objective
Build a native Android application using **Kotlin** that interacts with the Spring Boot backend.

## 🛠 Tech Stack Requirements
- **Language:** Kotlin
- **UI Framework:** Jetpack Compose (Recommended) or XML Views
- **Networking:** Retrofit
- **Async Operations:** Coroutines & Flow
- **Dependency Injection:** Hilt (Optional but recommended)
- **Architecture:** MVVM (Model-View-ViewModel)

## 🧩 Features to Implement

### 1. Product List Screen
- Fetch and display a list of products from the backend API.
- Show product name, price, and average rating.
- Implement Pull-to-Refresh.

### 2. Product Detail Screen
- Show full product details (description, category, image placeholder).
- Display a list of reviews for the product.
- Show the calculated average rating.

### 3. Add Review Feature
- A form to submit a new review.
- Inputs: Rating (1-5 stars) and Comment text.
- Validation: Rating is required.

## 🔗 Backend API
The application should consume the REST API provided in the `backend/` directory.
Ensure the backend is running locally on port `8080`.

- **Base URL:** `http://10.0.2.2:8080/api` (Android Emulator loopback)

## 🚀 Getting Started
1. Initialize a new Android Studio project in this directory.
2. Configure Gradle dependencies.
3. Ensure the backend application is running.
