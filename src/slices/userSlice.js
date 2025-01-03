// src/slices/userSlice.js
import Cookies from 'js-cookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from "../API/Api";
const getStoredUser = () => {
  const userCookie = Cookies.get('user');
  const tokenCookie = Cookies.get('authToken');
  
  // Check if the user cookie exists and is not empty
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie); // Parse only if cookie exists
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      user = null; // Fallback to null if parsing fails
    }
  }

  // Return user and token (even if one is missing, handle gracefully)
  return { user, token: tokenCookie || null };
};

const storedData = getStoredUser();
;

// Initial state
const initialState = {
  user: storedData.user || null,
  token: storedData.token || null,
  authenticated: !!storedData.token,
  cart: [],
  wishlists: [],
  rewards: [],
  alreadyRegistered: false,
};




export const checkAuthentication = createAsyncThunk(
  'user/checkAuthentication',
  async (_, { dispatch }) => {
    // Get user and token from cookies
    const storedUser = Cookies.get('user');
    const storedToken = Cookies.get('authToken');
console.log(storedUser);
console.log(storedToken);


    if (storedUser && storedToken) {
      // If both user and token exist in cookies, consider the user as authenticated
      const user = JSON.parse(storedUser);
      try {
        const response = await fetch(`${baseUrl}/check`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`, // Send token for server-side validation
          },
        });
console.log(response);

        if (!response.ok) {
          console.error('Authentication check failed:', response.status, response.statusText);
          throw new Error('Not authenticated');
        }

        const data = await response.json();
        return data; // Return user info and other details
        
      } catch (error) {
        console.error('Error during authentication check:', error);
        throw error;
      }
    } else {
      // If no user or token in cookies, return null to indicate no authentication
      throw new Error('Not authenticated');
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authenticated = true;

           // Save user data and token to cookies
           Cookies.set('user', JSON.stringify(action.payload.user), { expires: 7, secure: true, sameSite: 'Strict' });
           Cookies.set('token', action.payload.token, { expires: 7, secure: true, sameSite: 'Strict' });
              
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.authenticated = false;
      state.cart = [];
      state.wishlists = [];
      state.rewards = [];
      state.alreadyRegistered = false;

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    addToCart: (state, action) => {
      state.cart.push(action.payload); // Add item to cart
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id); // Remove item from cart
    },

    clearCart: (state) => {
      state.cart = []; // Clear all items in the cart
    },

    verifyOTP: (state, action) => {
      const { user, register, cart, wishlists, rewards } = action.payload;
      state.user = user;
      state.authenticated = true;
      state.alreadyRegistered = register === 1; // If registered, update the flag
      state.cart = cart;
      state.wishlists = wishlists;
      state.rewards = rewards;

      // Save user data and token to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        const { user, register, cart, wishlists, rewards } = action.payload;
        state.user = user;
        state.authenticated = true;
        state.alreadyRegistered = register === 1;
        state.cart = cart;
        state.wishlists = wishlists;
        state.rewards = rewards;
      })
      .addCase(checkAuthentication.rejected, (state) => {
        state.user = null;
        state.authenticated = false;
        state.alreadyRegistered = false;
      });
  },
});

// Export actions and reducer
export const { login, logout, addToCart, removeFromCart, clearCart, verifyOTP } = userSlice.actions;
export default userSlice.reducer;
