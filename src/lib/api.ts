const BASE_URL = 'https://zovoaapi.lytortech.com';

// API response types
export interface AuthResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}

export interface SaveItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number; // price per kg
  color: string;
}

export interface Order {
  id?: string;
  userID: string;
  waste_type: string;
  weight: number;
  points: number;
  location: string;
  name: string;
  number: string;
  mail: string;
  pickUpDate: string;
  dropDate: string;
  status: string;
}

export interface Account {
  uid: string;
  user_points: number;
  user_money: number;
  name: string;
  email: string;
  phone: string;
}

// Auth APIs
export const authApi = {
  signup: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }
    return response.json();
  },

  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    return response.json();
  },
};

// Save Items APIs
export const saveItemsApi = {
  getAll: async (): Promise<SaveItem[]> => {
    const response = await fetch(`${BASE_URL}/api/save-items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  },
};

// Orders APIs
export const ordersApi = {
  place: async (order: Omit<Order, 'id'>): Promise<{ message: string }> => {
    const response = await fetch(`${BASE_URL}/api/orders/place`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to place order');
    }
    return response.json();
  },

  getUserOrders: async (userId: string): Promise<Order[]> => {
    const response = await fetch(`${BASE_URL}/api/orders/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  getUserOrdersByStatus: async (userId: string, status: string): Promise<Order[]> => {
    const response = await fetch(`${BASE_URL}/api/orders/user/${userId}/status/${status}`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },
};

// Account APIs
export const accountsApi = {
  getByUid: async (uid: string): Promise<Account> => {
    const response = await fetch(`${BASE_URL}/api/accounts/uid/${uid}`);
    if (!response.ok) throw new Error('Failed to fetch account');
    return response.json();
  },
};
