//@ts-nocheck
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { getAllOrders,updateOrderStatus } from '../api/orderApi';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();

      setOrders(data.orders || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        'Failed to load orders'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  // Handle Approve COD Order Payment
  const handleApprove = async (id) => {
    const toastId = toast.loading(
      'Approving order...'
    );

    try {
      await updateOrderStatus(id, {
        paymentStatus: 'Paid',
        status: 'Confirmed',
      });

      toast.success(
        'Order approved successfully',
        {
          id: toastId,
        }
      );

      fetchOrders();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        'Failed to approve order',
        {
          id: toastId,
        }
      );
    }
  };

  // Handle Cancel COD payment
  const handleCancel = async (id) => {
    const toastId = toast.loading(
      'Cancelling order...'
    );

    try {
      await updateOrderStatus(id, {
        paymentStatus: 'Failed',
        status: 'Cancelled',
      });

      toast.success(
        'Order cancelled successfully',
        {
          id: toastId,
        }
      );

      fetchOrders();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        'Failed to cancel order',
        {
          id: toastId,
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="text-white p-6">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020817] via-[#08152f] to-[#020817] p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Manage Orders
        </h1>
        <span className="bg-indigo-600 px-4 py-2 rounded-lg">
          Total Orders: {orders.length}
        </span>
      </div>

      <div className="relative z-40 bg-[#08152f] rounded-xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-slate-900">
              <tr>
                <th className="text-left p-4 whitespace-nowrap">
                  Customer
                </th>

                <th className="text-left p-4 whitespace-nowrap">
                  Email
                </th>

                <th className="text-left p-4 whitespace-nowrap">
                  Amount
                </th>

                <th className="text-left p-4 whitespace-nowrap">
                  Payment Mode
                </th>

                <th className="text-left p-4 whitespace-nowrap">
                  Payment Status
                </th>

                <th className="text-left p-4 whitespace-nowrap">
                  Order Status
                </th>

                <th className="text-left p-4 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-slate-800"
                  >
                    <td className="p-4 whitespace-nowrap">
                      {order.customerName}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      {order.email}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      ₹{order.totalAmount}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                        {order.paymentMode}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full ${order.paymentStatus ===
                            'Paid'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full ${order.status ===
                            'Confirmed'
                            ? 'bg-green-500/20 text-green-400'
                            : order.status ===
                              'Cancelled'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        {order.paymentStatus !==
                          'Paid' && (
                            <button
                              onClick={() =>
                                handleApprove(
                                  order._id
                                )
                              }
                              className="bg-green-600 hover:bg-green-700 p-2 rounded"
                            >
                              <FaCheck />
                            </button>
                          )}

                        {order.status !==
                          'Cancelled' && (
                            <button
                              onClick={() =>
                                handleCancel(
                                  order._id
                                )
                              }
                              className="bg-red-600 hover:bg-red-700 p-2 rounded"
                            >
                              <FaTimes />
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                      className="text-center py-8 text-gray-400 whitespace-nowrap"
                  >
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
