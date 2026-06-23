//@ts-nocheck

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllOrders } from '../../api/orderApi';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();

        setOrders(data.orders?.slice(0, 5) || []);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
          'Failed to load recent orders'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#08152f]/90 backdrop-blur-xl p-4 sm:p-6 mt-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Recent Orders
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Latest payments and enrollments
          </p>
        </div>

        <Link
          to="/dashboard/orders"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-white font-medium hover:scale-[1.02] transition"
        >
          View All →
        </Link>

      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid gap-4">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 rounded-2xl bg-white/5 animate-pulse"
            />
          ))}

        </div>
      ) : orders.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">

          <h3 className="text-white text-lg font-semibold">
            No Orders Yet
          </h3>

          <p className="text-gray-400 mt-2">
            Orders will appear here when students purchase courses.
          </p>

        </div>

      ) : (

        <>
          {/* Desktop View */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10">

            <table className="w-full">

              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-left text-gray-400">Customer</th>
                  <th className="p-4 text-left text-gray-400">Amount</th>
                  <th className="p-4 text-left text-gray-400">Payment</th>
                  <th className="p-4 text-left text-gray-400">Method</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {order.customerName?.charAt(0)}
                        </div>

                        <div>
                          <h3 className="text-white font-medium">
                            {order.customerName}
                          </h3>

                          <p className="text-xs text-gray-500">
                            Order ID: {order._id.slice(-6)}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="p-4 text-green-400 font-semibold">
                      ₹{order.totalAmount}
                    </td>

                    <td className="p-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${order.paymentStatus === "Paid"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                          }`}
                      >
                        {order.paymentStatus}
                      </span>

                    </td>

                    <td className="p-4 text-gray-300">
                      {order.paymentMode}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 lg:hidden">

            {orders.map((order) => (

              <div
                key={order._id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >

                <div className="flex items-center gap-4">

                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {order.customerName?.charAt(0)}
                  </div>

                  <div className="flex-1">

                    <h3 className="text-white font-semibold">
                      {order.customerName}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {order.paymentMode}
                    </p>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${order.paymentStatus === "Paid"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {order.paymentStatus}
                  </span>

                </div>

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-gray-400 text-sm">
                    Order #{order._id.slice(-6)}
                  </span>

                  <span className="text-lg font-bold text-green-400">
                    ₹{order.totalAmount}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </>
      )}

    </div>
  );
};

export default RecentOrders;
