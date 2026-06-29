import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { createCODOrder } from '../api/orderApi';
import { getCurrentUser } from '../api/authApi';
import { createRazorpayOrder, verifyPayment } from '../api/paymentApi';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';
import BackButton from '../components/button/BackButton';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { cart, clearCart, cartTotal, removeFromCart } = useCart();

  const course = state?.course;
  const checkoutItems = course ? [course] : cart;
  const hasItems = checkoutItems && checkoutItems.length > 0;

  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState('COD');

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        customerName: user.name || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
      });
    }
  }, [user]);

  // Redirect if no items to checkout
  if (!hasItems) {
    navigate('/courses');
    return null;
  }

  const totalAmount = course ? course.price : cartTotal;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle COD order and Admin approval Wait
  const handleCODOrder = async () => {
    try {
      setLoading(true);

      const data = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        items: checkoutItems.map((item) => ({
          course: item._id,
        })),
        paymentMode: 'COD',
        paymentStatus: 'Pending',
      };

      const response = await createCODOrder(data);
      if (response.success) {
        // Clear cart if we purchased cart items
        if (!course) {
          clearCart();
        }

        const userResponse = await getCurrentUser();
        login(
          userResponse.data.user,
          localStorage.getItem('token')
        );

        toast.success('Order placed successfully. Wait for admin approval.');
        navigate('/courses');
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        'Failed to place order'
      );
    } finally {
      setLoading(false);
    }
  };

  // handle ONLINE payment And Instant enroll course
  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);

      const orderData = await createRazorpayOrder({
        items: checkoutItems.map((item) => ({
          course: item._id,
        })),
      });

      const options = {
        key: orderData.key,
        amount: orderData.razorpayOrder.amount,
        currency: orderData.razorpayOrder.currency,
        name: 'E Learn Platform',
        description: course ? course.title : `${checkoutItems.length} Courses Checkout`,
        image: course ? course.image : '',
        order_id: orderData.razorpayOrder.id,
        handler: async function (response) {
          try {
            const verifyData = {
              customerName: formData.customerName,
              email: formData.email,
              phone: formData.phone,
              items: checkoutItems.map((item) => ({
                course: item._id,
              })),
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyResponse = await verifyPayment(verifyData);

            if (verifyResponse.success) {
              // Clear cart if we purchased cart items
              if (!course) {
                clearCart();
              }

              const userResponse = await getCurrentUser();
              login(
                userResponse.data.user,
                localStorage.getItem('token')
              );

              toast.success('Payment successful 🎉');

              if (course) {
                navigate(`/learn/${course._id}`);
              } else {
                navigate('/my-courses');
              }
            }
          } catch (error) {
            toast.error(
              error?.response?.data?.message ||
              'Payment verification failed'
            );
          }
        },
        prefill: {
          name: formData.customerName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#4f46e5',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        toast.error('Payment Failed');
      });
      rzp.open();

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#020817] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <BackButton />
        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          {user ? (
            <div className="bg-[#08152f] p-6 rounded-2xl">
              <h2 className="text-white text-2xl font-semibold mb-6">
                Billing Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full bg-[#0f1d3b] text-white border border-slate-700 rounded-lg px-4 py-3 outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0f1d3b] text-white border border-slate-700 rounded-lg px-4 py-3 outline-none"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0f1d3b] text-white border border-slate-700 rounded-lg px-4 py-3 outline-none"
                    placeholder="Enter phone"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-8">
                <h3 className="text-white text-xl font-semibold mb-4">
                  Payment Method <span className='pl-3 text-sm text-red-400 '>(For Instant Enrollment Choose Online Payment)</span>
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-white cursor-pointer">
                    <input
                      type="radio"
                      value="COD"
                      checked={paymentMode === 'COD'}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    />
                    Cash On Delivery (COD)
                  </label>

                  <label className="flex items-center gap-3 text-white cursor-pointer">
                    <input
                      type="radio"
                      value="RAZORPAY"
                      checked={paymentMode === 'RAZORPAY'}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    />
                    Razorpay (Online Payment)
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#08152f] p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">Secure Checkout</h3>
                <p className="text-gray-400 mt-2 text-sm max-w-sm">
                  Please log in or create an account to access billing details, choose payment options, and complete your enrollment.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                  onClick={() => navigate('/login?redirect=/checkout')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition duration-300 cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/register?redirect=/checkout')}
                  className="px-6 py-3 bg-[#0f1d3b] hover:bg-[#162548] border border-slate-700 text-white font-semibold rounded-xl transition duration-300 cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {/* RIGHT SIDE */}
          <div className="bg-[#08152f] p-6 rounded-2xl h-fit">

            <h2 className="text-white text-2xl font-semibold mb-6">
              Order Summary
            </h2>

            {/* Checkout Items List */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {checkoutItems.map((item) => (
                <div 
                  key={item._id} 
                  className="flex gap-4 items-center bg-[#0f1d3b] p-3 rounded-xl border border-slate-700/50 hover:border-slate-600 transition duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-700/55"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-semibold truncate">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs truncate mt-0.5">
                      {item.level} • {item.duration || 'N/A'}
                    </p>
                    <span className="text-emerald-400 text-xs font-bold block mt-1">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Remove Button */}
                  {!course && (
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                      title="Remove from Cart"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-700 pt-6">

              <div className="flex justify-between text-white text-lg">
                <span>Total Items</span>
                <span>{checkoutItems.length}</span>
              </div>

              <div className="flex justify-between text-white text-2xl font-bold mt-4">
                <span>Grand Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* PLACE ORDER / LOGIN BUTTON */}
            {user ? (
              <button
                disabled={loading}
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-4 rounded-xl font-semibold transition duration-300 shadow-lg shadow-indigo-600/20 cursor-pointer"
                onClick={() => {
                  if (paymentMode === 'COD') {
                    handleCODOrder();
                  } else {
                    handleRazorpayPayment();
                  }
                }}
              >
                {loading
                  ? 'Processing...'
                  : paymentMode === 'COD'
                    ? 'Place COD Order'
                    : 'Pay With Razorpay'}
              </button>
            ) : (
              <button
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-semibold transition duration-300 shadow-lg shadow-indigo-600/20 cursor-pointer"
                onClick={() => {
                  toast.error('Please login or signup to enroll');
                  navigate('/login?redirect=/checkout');
                }}
              >
                Log In to Enroll
              </button>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;
