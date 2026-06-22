// React Hooks
import { useEffect, useRef, useState } from 'react';
// React Router
import { useNavigate, Link, useLocation } from 'react-router-dom';
// Icons (Lucide React)
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles } from 'lucide-react';
// Framer Motion
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
// API
import { loginUser, } from '../../api/authApi';
// Context
import { useAuth } from '../../context/AuthContext';
// Toast Notifications
import { toast } from 'react-hot-toast';
// Forgot Password Component
import ForgotPassword from './ForgotPassword';


// ─────────────────────────────────────────────────────────────────────────────
// MOUSE CURSOR GLOW EFFECT — copy this block to Login.jsx to get the same effect
// Uses useMotionValue + useSpring for buttery smooth tracking
// The glow follows the cursor and changes color as it moves (hue rotation trick)
// ─────────────────────────────────────────────────────────────────────────────
const useCursorGlow = () => {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  // Spring config: lower stiffness = more lag/trail, higher = snappier
  const springX = useSpring(mouseX, { stiffness: 80, damping: 22, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22, mass: 0.5 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return { springX, springY };
};

const Login = () => {
  // React Router Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Auth Context
  const { login } = useAuth();

  // Show/Hide Password State
  const [showPassword, setShowPassword] = useState(false);

  // Login Button Loading State
  const [loading, setLoading] = useState(false);

  // Forgot Password Modal State
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Login Form Data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Get redirect URL from query params
  const redirectTo = new URLSearchParams(location.search).get('redirect');

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Login Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await loginUser(formData);
      const user = response.data.data.user;
      login(user, response.data.token);
      toast.success('Welcome Back!');

      if (redirectTo) {
        navigate(redirectTo, { replace: true });
      } else if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || 'Invalid Email or Password'
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Animation Variants ──────────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -8 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.12 + 0.3, duration: 0.5, ease: 'easeOut' },
    }),
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 18, repeat: Infinity, ease: 'linear' },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.3, 0.55, 0.3],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  // ── Cursor glow ──
    const { springX, springY } = useCursorGlow();

    // ── Hue shift state for color-changing glow ──
    const [hue, setHue] = useState(245); // start indigo
    const hueRef = useRef(245);
    useEffect(() => {
      const interval = setInterval(() => {
        hueRef.current = (hueRef.current + 0.6) % 360;
        setHue(hueRef.current);
      }, 30);
      return () => clearInterval(interval);
    }, []);

  return (
    <div className="relative z-[9999] min-h-screen bg-[#020817] flex items-center justify-center px-6 overflow-hidden">
      {/* ──────────────────────────────────────────────────────────────────────
          CURSOR GLOW LAYER — paste this <motion.div> into Login.jsx too.
          springX / springY come from useCursorGlow() hook above.
          hue cycles 0–360 creating the rainbow color-shift effect.
          ────────────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: `radial-gradient(circle, hsla(${hue}, 85%, 65%, 0.13) 0%, hsla(${hue + 40}, 80%, 60%, 0.07) 45%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(2px)',
        }}
      />
      {/* ────────────────────────────────────────────────────────────────── */}



      {/* ── 3D Ambient Background Orbs ── */}
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
      />
      <motion.div
        variants={pulseVariants}
        animate="animate"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
        className="absolute bottom-[-100px] right-[-100px] w-[380px] h-[380px] rounded-full"
      />

      {/* ── Orbiting Ring ── */}
      <motion.div
        variants={orbitVariants}
        animate="animate"
        className="absolute"
        style={{ width: 520, height: 520, pointerEvents: 'none' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px dashed rgba(99,102,241,0.12)',
            position: 'absolute',
          }}
        />
        {/* Orbit dot */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(99,102,241,0.55)',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px 2px rgba(99,102,241,0.4)',
          }}
        />
      </motion.div>

      {/* ── Card ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
        className="w-full max-w-md"
      >
        {/* Inner glow border wrapper */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.1) 50%, rgba(99,102,241,0.05) 100%)',
            borderRadius: 20,
            padding: 1,
          }}
        >
          <div
            className="bg-[#08152f] rounded-[19px] p-8 relative overflow-hidden"
            style={{ backdropFilter: 'blur(24px)' }}
          >
            {/* Inner shimmer line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                width: '80%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
              }}
            />

            {/* ── Header ── */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="text-center mb-8"
            >
              {/* Icon badge */}
              <div className="flex justify-center mb-4">
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.3)' }}
                >
                  <Sparkles size={28} className="text-indigo-400" />
                </motion.div>
              </div>
              <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400 mt-2 text-sm">Sign in to continue your journey</p>
            </motion.div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email Field */}
              <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                <label className="text-gray-300 block mb-2 text-sm font-medium">Email</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200">
                    <Mail size={17} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-[#020817] border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none placeholder-gray-600 transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-300 text-sm font-medium">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-150 focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200">
                    <Lock size={17} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-[#020817] border border-slate-700 rounded-xl pl-11 pr-12 py-3 text-white outline-none placeholder-gray-600 transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-400 transition-colors duration-150"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="pt-1"
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="w-full relative overflow-hidden text-white py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: loading
                      ? 'rgba(79,70,229,0.6)'
                      : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)',
                    boxShadow: loading ? 'none' : '0 4px 24px rgba(99,102,241,0.35)',
                  }}
                >
                  {/* Shimmer on hover */}
                  {!loading && (
                    <motion.span
                      initial={{ x: '-100%', opacity: 0 }}
                      whileHover={{ x: '200%', opacity: 0.15 }}
                      transition={{ duration: 0.55 }}
                      className="absolute inset-0 bg-white"
                      style={{ skewX: '-20deg' }}
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        {/* Spinner */}
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Signing In...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <LogIn size={17} />
                        Sign In
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </form>

            {/* ── Footer ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center text-gray-400 mt-6 text-sm"
            >
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-150"
              >
                Create one
              </Link>
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* ── Forgot Password Modal ── */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            key="forgot-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center px-6"
            style={{ background: 'rgba(2,8,23,0.75)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowForgotPassword(false);
            }}
          >
            <motion.div
              key="forgot-modal"
              initial={{ opacity: 0, scale: 0.92, y: 24, rotateX: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 1000, transformStyle: 'preserve-3d', width: '100%', maxWidth: 448 }}
            >
              <ForgotPassword onClose={() => setShowForgotPassword(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
