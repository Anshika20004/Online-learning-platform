import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { MoodProvider } from './context/MoodContext';
import MoodModal from './components/MoodModal';
import BoostEntryModal from './components/BoostEntryModal';
import BoostCompleteModal from './components/BoostCompleteModal';
import FuturePopup from './components/FuturePopup';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import FutureRoadmapPage from './pages/FutureRoadmapPage';
import CourseDetailPage from './pages/CourseDetailPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import AssessmentTest from './components/AssessmentTest';  // ✅ NEW
import RoadmapViewer from './components/RoadmapViewer';   // ✅ NEW
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <Router>
          <div className="App">
            <MoodModal />
            <BoostEntryModal />
            <BoostCompleteModal />
            <FuturePopup />
            <Navbar />
            <main className="main-content">
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:id" element={<CourseDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* ✅ NEW ROUTES FOR AI ASSESSMENT */}
              <Route path="/assessment-test" element={<AssessmentTest />} />
              <Route path="/roadmap" element={<RoadmapViewer />} />
              <Route path="/future-roadmap" element={<FutureRoadmapPage />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/course/:courseId/lesson/:lessonId" 
                element={
                  <ProtectedRoute>
                    <VideoPlayerPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#6c5ce7',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
      </MoodProvider>
    </AuthProvider>
  );
}

export default App;
