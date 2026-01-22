# 📱 Product Review Application

**Backend:** Spring Boot  
**Mobile App:** React Native  
**Authentication:** Not included (out of scope)

---

## � Deliverables

### 🏛️ System Architecture
An Excalidraw diagram explaining the overall system design and architecture:  
🔗 [View System Architecture](https://excalidraw.com/#json=41rZEdDaKmRjK7sv7bi8_,fU5mPPEtFJf1l5ROUjWnlw)

### 📲 Build Artifacts
Download the generated mobile application builds:  
🔗 [Download APK (Android) / IPA (iOS)](https://drive.google.com/your-drive-link-here)

### 🌐 Web Access
Test the application directly in your web browser:  
🔗 [Launch Web Application](https://your-web-app-url-here)

---

## �📌 Project Overview

The **Product Review Application** is a full-stack system that allows users to browse products, submit reviews, rate products, and view aggregated feedback through a modern mobile interface.  
The project focuses on **core backend logic, REST API design, data modeling, and mobile UI/UX**, intentionally excluding authentication to keep the scope implementation-focused.

---

## 🎯 Objectives

- Build a scalable RESTful backend using **Spring Boot**
- Develop a cross-platform mobile application using **React Native**
- Allow users to:
  - View products
  - Submit reviews and ratings
  - Browse existing reviews
- Demonstrate clean architecture and separation of concerns

---

## 🧩 Core Features

### 🛒 Product Management
- Retrieve a list of products
- View product details:
  - Name
  - Description
  - Category
  - Price
  - Average rating
- Backend supports pagination and sorting

### ⭐ Review & Rating System
- Users can:
  - Submit a text-based review
  - Rate products on a numeric scale (e.g., 1–5)
- Display:
  - Average rating per product
  - Total review count
  - Review history

### 📊 Aggregation & Insights
- Backend calculates:
  - Average ratings
  - Review counts
- Optimized for read-heavy access patterns

### 📱 Mobile Experience (React Native)
- Cross-platform support (iOS & Android)
- Key screens:
  - Product List
  - Product Details
  - Add Review
- Reusable UI components
- API-driven data rendering
- Loading and error states handled gracefully

---

## 🏗️ Architecture

### Backend (Spring Boot)
- RESTful API architecture
- Layered structure:
  - Controller
  - Service
  - Repository
- JPA / Hibernate for ORM
- PostgreSQL (or H2 for local development)
- DTO-based request/response models
- Input validation (ratings range, review length, etc.)

### Mobile App (React Native)
- Functional components with hooks
- API integration using `fetch` or `axios`
- Local state management
- Environment-based API configuration

---

## 🚫 Out of Scope
- Authentication & authorization
- User accounts or roles
- Payments or checkout
- Admin dashboards

---

## 🧪 Testing & Quality
- Unit tests for service and repository layers
- Integration tests for REST endpoints
- Validation and error handling
- Consistent API response formats

---

## 💡 Why This Project

This project demonstrates:
- Strong **Spring Boot backend fundamentals**
- Clean **REST API design**
- Practical **React Native mobile development**
- Scalable architecture patterns used in real-world applications
