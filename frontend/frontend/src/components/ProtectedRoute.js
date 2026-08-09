import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #6c5ce7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px', color: '#64748b' }}>Loading...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px'
        }}>🚫</div>
        <h2 style={{
          color: '#1f2937',
          marginBottom: '10px'
        }}>Access Denied</h2>
        <p style={{
          color: '#6b7280',
          marginBottom: '10px'
        }}>You don't have permission to access this page.</p>
        <p style={{
          color: '#9ca3af',
          fontSize: '14px'
        }}>Required role: <strong>{requiredRole}</strong> | Your role: <strong>{user?.role}</strong></p>
      </div>
    );
  }

  // Render children if authenticated and authorized
  return children;
};

export default ProtectedRoute;