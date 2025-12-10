const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const reviewApi = {
  // Create a new review
  createReview: async (reviewData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      credentials: "include",
      body: reviewData,
    });
    return response.json();
  },

  // Get all reviews
  getAllReviews: async () => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  },

  // Get host review stats
  getHostReviewStats: async (hostId: string) => {
    const response = await fetch(`${API_BASE_URL}/reviews/host/${hostId}/stats`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  },

  // Get review by ID
  getReviewById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  },

  // Update review
  updateReview: async (id: string, reviewData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: reviewData,
    });
    return response.json();
  },

  // Delete review (Admin only)
  deleteReview: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return response.json();
  },
};