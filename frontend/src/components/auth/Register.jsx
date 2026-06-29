import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';

import { registerUser } from '../../api/authApi';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

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
// ─────────────────────────────────────────────────────────────────────────────

// Password strength checker
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const map = [
    { label: 'Too weak', color: '#ef4444' },
    { label: 'Weak', color: '#f97316' },
    { label: 'Fair', color: '#eab308' },
    { label: 'Strong', color: '#22c55e' },
    { label: 'Very strong', color: '#6366f1' },
  ];
  return { score, ...map[score] };
};

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const containerRef = useRef(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/dashboard' : '/', { replace: true });
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

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

  // ── Password strength ──
  const strength = getPasswordStrength(formData.password);

  // ── Passwords match indicator ──
  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      setLoading(true);
      await registerUser(formData);
      toast.success('Account created! Please login.');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  // ── Animation variants ──
  const cardVariants = {
    hidden: { opacity: 0, y: 48, rotateX: -10, scale: 0.97 },
    visible: {
      opacity: 1, y: 0, rotateX: 0, scale: 1,
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -18 },
    visible: (i) => ({
      opacity: 1, x: 0,
      transition: { delay: i * 0.09 + 0.28, duration: 0.45, ease: 'easeOut' },
    }),
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 22, repeat: Infinity, ease: 'linear' },
    },
  };

  const orbitVariants2 = {
    animate: {
      rotate: -360,
      transition: { duration: 30, repeat: Infinity, ease: 'linear' },
    },
  };

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Full name', icon: User, label: 'Full Name' },
    { name: 'email', type: 'email', placeholder: 'Email address', icon: Mail, label: 'Email' },
    { name: 'phoneNumber', type: 'text', placeholder: 'Phone number', icon: Phone, label: 'Phone Number' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative z-[9999] min-h-screen bg-[#020817] flex items-center justify-center px-6 py-10 overflow-hidden"
    >
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

      {/* ── Static ambient orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-100px] left-[-80px] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[-80px] right-[-60px] w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[40%] right-[5%] w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)' }}
      />

      {/* ── Orbiting rings ── */}
      <motion.div
        variants={orbitVariants}
        animate="animate"
        className="absolute pointer-events-none"
        style={{ width: 580, height: 580 }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          border: '1px dashed rgba(99,102,241,0.1)', position: 'absolute',
        }} />
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'rgba(99,102,241,0.6)', position: 'absolute',
          top: 0, left: '50%', transform: 'translateX(-50%)',
          boxShadow: '0 0 12px 3px rgba(99,102,241,0.35)',
        }} />
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: 'rgba(139,92,246,0.5)', position: 'absolute',
          bottom: 0, left: '30%',
          boxShadow: '0 0 8px 2px rgba(139,92,246,0.3)',
        }} />
      </motion.div>

      <motion.div
        variants={orbitVariants2}
        animate="animate"
        className="absolute pointer-events-none"
        style={{ width: 420, height: 420 }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          border: '1px solid rgba(99,102,241,0.06)', position: 'absolute',
        }} />
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'rgba(168,85,247,0.55)', position: 'absolute',
          top: '20%', right: 0,
          boxShadow: '0 0 10px 2px rgba(168,85,247,0.3)',
        }} />
      </motion.div>

      {/* ── Card ── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: 1200, transformStyle: 'preserve-3d', width: '100%', maxWidth: 480, position: 'relative', zIndex: 10 }}
      >
        {/* Gradient border glow */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(139,92,246,0.12) 50%, rgba(99,102,241,0.06) 100%)',
          borderRadius: 20,
          padding: 1,
        }}>
          <div className="bg-[#08152f] rounded-[19px] p-8 relative overflow-hidden">

            {/* Top shimmer line */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', width: '80%', height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
            }} />

            {/* ── Header ── */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-center mb-7"
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: 'rgba(99,102,241,0.16)',
                    border: '1px solid rgba(99,102,241,0.28)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Sparkles size={26} className="text-indigo-400" />
                </motion.div>
              </div>
              <h1 className="text-4xl font-bold text-white">Create Account</h1>
              <p className="text-gray-400 mt-2 text-sm">Join our learning platform today</p>
            </motion.div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Text / email / phone fields */}
              {fields.map(({ name, type, placeholder, icon: Icon, label }, i) => (
                <motion.div
                  key={name}
                  custom={i}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="text-gray-300 block mb-1.5 text-sm font-medium">{label}</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200">
                      <Icon size={16} />
                    </span>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      required
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full bg-[#020817] border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none placeholder-gray-600 transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                    />
                  </div>
                </motion.div>
              ))}

              {/* Password */}
              <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                <label className="text-gray-300 block mb-1.5 text-sm font-medium">Password</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#020817] border border-slate-700 rounded-xl pl-11 pr-12 py-3 text-white outline-none placeholder-gray-600 transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password strength bar */}
                <AnimatePresence>
                  {formData.password.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden"
                    >
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((seg) => (
                          <motion.div
                            key={seg}
                            className="h-1 flex-1 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: strength.score >= seg ? 1 : 0 }}
                            transition={{ duration: 0.3, delay: seg * 0.05 }}
                            style={{
                              background: strength.score >= seg ? strength.color : 'rgba(255,255,255,0.08)',
                              transformOrigin: 'left',
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: strength.color }}>{strength.label}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm Password */}
              <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
                <label className="text-gray-300 block mb-1.5 text-sm font-medium">Confirm Password</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#020817] border border-slate-700 rounded-xl pl-11 pr-12 py-3 text-white outline-none placeholder-gray-600 transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <AnimatePresence>
                      {passwordsMatch && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <CheckCircle2 size={16} className="text-green-400" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-gray-500 hover:text-indigo-400 transition-colors"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible" className="pt-1">
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
                  {/* Shimmer sweep on hover */}
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
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Creating Account...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <UserPlus size={17} />
                        Create Account
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
              transition={{ delay: 0.8 }}
              className="text-center text-gray-400 mt-5 text-sm"
            >
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-150">
                Sign in
              </Link>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
