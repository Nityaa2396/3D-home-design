// Base API URL
const API_URL = 'https://api.example.com';

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

// Room design API functions
export const roomDesignAPI = {
  // Get all designs
  getDesigns: () => fetchAPI('/designs'),
  
  // Get a specific design
  getDesign: (id: string) => fetchAPI(`/designs/${id}`),
  
  // Create a new design
  createDesign: (design: any) => fetchAPI('/designs', {
    method: 'POST',
    body: JSON.stringify(design),
  }),
  
  // Update a design
  updateDesign: (id: string, design: any) => fetchAPI(`/designs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(design),
  }),
  
  // Delete a design
  deleteDesign: (id: string) => fetchAPI(`/designs/${id}`, {
    method: 'DELETE',
  }),
};

// Furniture API functions
export const furnitureAPI = {
  // Get all furniture
  getFurniture: () => fetchAPI('/furniture'),
  
  // Get furniture by category
  getFurnitureByCategory: (category: string) => fetchAPI(`/furniture?category=${category}`),
  
  // Get a specific furniture item
  getFurnitureItem: (id: string) => fetchAPI(`/furniture/${id}`),
};

// AI recommendation API functions
export const aiAPI = {
  // Get recommendations based on room dimensions and furniture
  getRecommendations: (roomData: any) => fetchAPI('/ai/recommendations', {
    method: 'POST',
    body: JSON.stringify(roomData),
  }),
  
  // Get color scheme recommendations
  getColorSchemes: (roomData: any) => fetchAPI('/ai/colors', {
    method: 'POST',
    body: JSON.stringify(roomData),
  }),
};

// User API functions
export const userAPI = {
  // Get user profile
  getProfile: () => fetchAPI('/user/profile'),
  
  // Update user profile
  updateProfile: (profileData: any) => fetchAPI('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
  
  // Get user's saved designs
  getSavedDesigns: () => fetchAPI('/user/designs'),
};