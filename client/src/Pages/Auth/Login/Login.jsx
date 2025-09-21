import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../contexts/Auth';

const initialState = { email: "", password: "", role: "donor" };

const Login = () => {
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  const handleRoleChange = (e) => setState((s) => ({ ...s, role: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password, role } = state;
    if (!email) {
      window.notify("Please enter email.", "error");
      return;
    }
    if (password.length < 8) {
      window.notify("Your password must contain at least 8 characters", "error");
      return;
    }
    const formData = { email, password, role };
    console.log('userData', formData);
    setIsProcessing(true);

    axios.post(`http://localhost:8000/auth/login`, formData)
      .then(({ status, data }) => {
        if (status === 200) {
          window.notify(data.message, "success");
          localStorage.setItem("jwt", data.token)
          const user = data.user
          dispatch({ type: "SET_LOGGED_IN", payload: { user } })
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        window.notify(error.response.data.message, "error");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-300 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row transform transition-all duration-500 hover:shadow-3xl">
        {/* Image Section */}
        <div className="lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Community helping hands"
            className="w-full h-full object-cover lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center p-6">
            <div className="text-center text-white">
              <svg className="w-12 h-12 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Join Our Mission</h3>
              <p className="text-lg opacity-90">Empower communities as a Donor or NGO</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 bg-white/95 backdrop-blur-md">
          <h2 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4 text-center lg:text-left">
            Login Your Account
          </h2>
          <p className="text-gray-600 mb-8 text-center lg:text-left">
            You dont have an account?{' '}
            <Link to="/auth/register" className="text-primary hover:text-emerald-700 font-semibold transition-colors">
              Register
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 placeholder-gray-500 text-gray-800"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 placeholder-gray-500 text-gray-800"
              />
            </div>
            <div>
              <select
                name="role"
                value={setState.role}
                onChange={handleRoleChange}
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 text-gray-800"
              >
                <option value="donor">Donor</option>
                <option value="ngo">NGO</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-12 !bg-primary  text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Login;