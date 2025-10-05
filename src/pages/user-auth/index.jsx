
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import dataService from '../../services/dataService';

const UserAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!isLogin && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login
        const result = await signIn(formData.email, formData.password);
        if (result.error) {
          setErrors({ general: result.error.message });
        } else {
          // Redirect to where user came from (like checkout) or dashboard
          const redirectTo = location.state?.from || '/user-account-dashboard';
          navigate(redirectTo);
        }
      } else {
        // Register
        const existingUser = dataService.getUserByEmail(formData.email);
        if (existingUser) {
          setErrors({ email: 'Email already exists' });
          return;
        }
        
        const newUser = dataService.addUser({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 'customer',
          memberSince: new Date().toISOString().split('T')[0],
          totalOrders: 0,
          totalSpent: 0,
          loyaltyPoints: 0,
          totalSaved: 0
        });
        
        if (newUser) {
          // Auto login after registration
          const result = await signIn(formData.email, formData.password);
          if (result.error) {
            setErrors({ general: result.error.message });
          } else {
            // Redirect to where user came from (like checkout) or dashboard
            const redirectTo = location.state?.from || '/user-account-dashboard';
            navigate(redirectTo);
          }
        }
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 shadow-warm-lg">
            <div className="text-center mb-8">
              <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin ? 'Sign in to your account' : 'Join Neenu\'s Natural family'}
              </p>
              {location.state?.message && (
                <p className="text-primary text-sm font-medium mt-2">
                  {location.state.message}
                </p>
              )}
            </div>

            {errors.general && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6">
                <p className="text-destructive text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  required
                />
              )}

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />

              {!isLogin && (
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  required
                />
              )}

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                required
              />

              {!isLogin && (
                <Input
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  required
                />
              )}

              <Button
                type="submit"
                variant="default"
                fullWidth
                size="lg"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAuth;
