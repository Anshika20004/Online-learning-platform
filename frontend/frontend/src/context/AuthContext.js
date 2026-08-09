import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Create Auth Context
const AuthContext = createContext();

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  token: localStorage.getItem('token'),
  xp: parseInt(localStorage.getItem('user_xp')) || 0
};

// Reducer Function
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        xp: action.payload.user?.xp || 0
      };
    
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        xp: 0
      };
    
    case 'USER_LOADED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    
    case 'ADD_XP':
      const newXp = state.xp + action.payload;
      localStorage.setItem('user_xp', newXp);
      return {
        ...state,
        xp: newXp
      };
      
    default:
      return state;
  }
}

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set axios default header when token changes
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Load user on app start if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          // Use stored user data first for immediate UI update
          const userData = JSON.parse(storedUser);
          dispatch({ type: 'USER_LOADED', payload: userData });
          
          // Then verify with server (optional - for updated user data)
          // const response = await axios.get('/api/auth/me');
          // dispatch({ type: 'USER_LOADED', payload: response.data.data });
        } catch (error) {
          console.error('Error loading user:', error);
          dispatch({ type: 'AUTH_ERROR' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Demo login - replace with actual API call
      if (email === 'anas@edulearn.com' && password === 'password123') {
        const mockUser = {
          _id: '1',
          name: 'Shaikh Anas',
          email: 'anas@edulearn.com',
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
          bio: 'Passionate learner and web developer',
          location: 'Balaghat, Madhya Pradesh, India',
          createdAt: new Date().toISOString(),
          xp: state.xp
        };
        
        const mockToken = 'demo-token-student';
        
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: {
            user: mockUser,
            token: mockToken
          }
        });
        
        toast.success(`Welcome back, ${mockUser.name}!`);
        return { success: true };
      }
      
      if (email === 'john@edulearn.com' && password === 'password123') {
        const mockUser = {
          _id: '2',
          name: 'John Smith',
          email: 'john@edulearn.com',
          role: 'instructor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
          bio: 'Senior Full Stack Developer and Instructor',
          location: 'San Francisco, CA',
          expertise: ['JavaScript', 'React', 'Node.js'],
          createdAt: new Date().toISOString(),
          xp: state.xp
        };
        
        const mockToken = 'demo-token-instructor';
        
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: {
            user: mockUser,
            token: mockToken
          }
        });
        
        toast.success(`Welcome back, ${mockUser.name}!`);
        return { success: true };
      }
      
      // Invalid credentials
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error('Invalid credentials. Use demo accounts.');
      return { success: false, message: 'Invalid credentials' };
      
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Register function
  const register = async (name, email, password, role = 'student') => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Demo registration - replace with actual API call
      const mockUser = {
        _id: Date.now().toString(),
        name,
        email,
        role,
        avatar: role === 'student' ? 
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' :
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        bio: `New ${role} on EduLearn Pro`,
        createdAt: new Date().toISOString()
      };
      
      const mockToken = `demo-token-${Date.now()}`;
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: {
          user: mockUser,
          token: mockToken
        }
      });
      
      toast.success(`Welcome to EduLearn Pro, ${name}!`);
      return { success: true };
      
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      // Demo update - replace with actual API call
      const updatedUser = {
        ...state.user,
        ...profileData
      };
      
      dispatch({ type: 'USER_LOADED', payload: updatedUser });
      toast.success('Profile updated successfully');
      return { success: true };
      
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // XP function
  const addXp = (amount) => {
    dispatch({ type: 'ADD_XP', payload: amount });
    toast.success(`+${amount} XP Earned! 🚀`, {
      style: {
        borderRadius: '10px',
        background: '#1e293b',
        color: '#fff',
      },
    });
  };

  // Context value
  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    addXp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;