import { createSlice } from "@reduxjs/toolkit";
import socket from "../Socket";// Import global socket instance
 
 const socketSlice = createSlice({
   name: "socket",
   initialState: { isConnected: false },
   reducers: {
     connectSocket: (state, action) => {
       if (!state.isConnected) {
         const userId = action.payload; // Get userId from action
         socket.connect();
         socket.emit("newUser", userId); // Send userId to server
         state.isConnected = true;
       }
     },
     disconnectSocket: (state) => {
       if (state.isConnected) {
         socket.disconnect();
         state.isConnected = false;
       }
     },
   },
 });
 
 export const { connectSocket, disconnectSocket } = socketSlice.actions;
 export default socketSlice.reducer;
 export { socket }; // Export socket instance