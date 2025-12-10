const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const paymentApi = {
  // Create payment
  createPayment: async (paymentData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: "POST",
      credentials: "include",
      body: paymentData,
    });
    return response.json();
  },

  // Verify payment
  verifyPayment: async (verificationData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/payments/verify`, {
      method: "POST",
      credentials: "include",
      body: verificationData,
    });
    return response.json();
  },

  // Get all payments (Admin/Host only)
  getAllPayments: async () => {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  },

  // Get payment by ID
  getPaymentById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  },

  // Update payment status (Admin only)
  updatePaymentStatus: async (id: string, statusData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/payments/${id}/status`, {
      method: "PATCH",
      credentials: "include",
      body: statusData,
    });
    return response.json();
  },

  // Delete payment (Admin only)
  deletePayment: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return response.json();
  },
};