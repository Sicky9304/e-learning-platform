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
    <div className="bg-[#08152f] rounded-xl p-6 mt-6 border border-slate-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-white">
          Recent Orders
        </h2>

        <Link
          to="/dashboard/orders"
          className="text-indigo-400 hover:text-indigo-300 text-sm"
        >
          View All →
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-gray-400">
          Loading orders...
        </p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">
          No orders found
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex justify-between items-center p-4 bg-slate-900 rounded-lg"
            >
              <div>
                <h3 className="text-white font-medium">
                  {order.customerName}
                </h3>

                <p className="text-sm text-gray-400">
                  ₹{order.totalAmount}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'Paid'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                >
                  {order.paymentStatus}
                </span>

                <p className="text-xs text-gray-500 mt-2">
                  {order.paymentMode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
