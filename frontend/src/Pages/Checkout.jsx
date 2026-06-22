import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { createCODOrder } from '../api/orderApi';
import { getCurrentUser } from '../api/authApi';
import { createRazorpayOrder, verifyPayment } from '../api/paymentApi';
import BackButton from '../components/button/BackButton';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user,login } = useAuth();

  const course = state?.course;

  const [loading, setLoading] = useState(false);

  const [paymentMode, setPaymentMode] = useState('COD');

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
  });

  // Redirect if course not found
  if (!course) {
    navigate('/courses');
    return null;
  }

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

        items: [
          {
            course: course._id,
          },
        ],

        paymentMode: 'COD',
        paymentStatus: 'Pending',
      };
      const response = await createCODOrder(data);
      if (response.success) {
        const userResponse =
          await getCurrentUser();
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
        items: [
          {
            course: course._id,
          },
        ],
      });

      const options = {
        key: orderData.key,

        amount: orderData.razorpayOrder.amount,

        currency: orderData.razorpayOrder.currency,

        name: 'E Learn Platform',

        description: course.title,

        image: course.image,

        order_id: orderData.razorpayOrder.id,

        handler: async function (response) {
          try {
            const verifyData = {
              customerName: formData.customerName,

              email: formData.email,

              phone: formData.phone,

              items: [
                {
                  course: course._id,
                },
              ],

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            };

            const verifyResponse =
              await verifyPayment(verifyData);

            if (verifyResponse.success) {

              const userResponse =
                await getCurrentUser();

              login(
                userResponse.data.user,
                localStorage.getItem('token')
              );

              toast.success(
                'Payment successful 🎉'
              );

              navigate(`/learn/${course._id}`);
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
        // console.log(response);
        toast.error('Payment Failed');
      });
      rzp.open();

    } catch (error) {
      toast.error(error?.response?.data?.message ||'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#020817] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <BackButton/>
        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
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
                    onChange={(e) =>
                      setPaymentMode(e.target.value)
                    }
                  />
                  Cash On Delivery (COD)
                </label>

                <label className="flex items-center gap-3 text-white cursor-pointer">
                  <input
                    type="radio"
                    value="RAZORPAY"
                    checked={paymentMode === 'RAZORPAY'}
                    onChange={(e) =>
                      setPaymentMode(e.target.value)
                    }
                  />
                  Razorpay (Online Payment)
                </label>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#08152f] p-6 rounded-2xl h-fit">

            <h2 className="text-white text-2xl font-semibold mb-6">
              Order Summary
            </h2>

            <img
              src={course.image}
              alt={course.title}
              className="w-full h-60 object-cover rounded-xl"
            />

            <h3 className="text-white text-2xl font-bold mt-5">
              {course.title}
            </h3>

            <p className="text-gray-400 mt-3">
              {course.description}
            </p>

            <div className="mt-6 border-t border-slate-700 pt-6">

              <div className="flex justify-between text-white text-lg">
                <span>Course Price</span>
                <span>₹{course.price}</span>
              </div>

              <div className="flex justify-between text-white text-2xl font-bold mt-4">
                <span>Total</span>
                <span>₹{course.price}</span>
              </div>
            </div>

            {/* PLACE ORDER BUTTON */}
            <button
              disabled={loading}
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-4 rounded-xl font-semibold"
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

          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;
