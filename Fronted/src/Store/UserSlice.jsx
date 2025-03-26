import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
let userDetails=JSON.parse(localStorage.getItem('mediaApp'))
console.log(userDetails)
const initialState = {

  login:userDetails?userDetails.login:false,
  user:userDetails?userDetails.user:'',
  token:userDetails?userDetails.token:'',
  
}
export const fetchUserBydata = createAsyncThunk(
  'fetchUserBydata',
  async (token) => {
    console.log(token)
    const response = await axios.get('https://social-media-66lv.onrender.com/user/loggedInUser',{
      headers:{
        'Authorization':token
      }
    })
    console.log(response)
    return response.data
  },
)
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  userLogin:(state,action)=>{
    state.login=true;
    state.user=action.payload.user
    state.token=action.payload.token
  },
  userLogOut:(state,action)=>{
    state.login=false;
    state.user=''
    state.token=''
    localStorage.removeItem('mediaApp')

  },
  updateUser:(state,action)=>{
    state.user=action.payload
  }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserBydata.fulfilled, (state, action) => {
      console.log(action)
      state.user=action.payload
      
      // Add user to the state array
 })
  },
})

// Action creators are generated for each case reducer function
export const { userLogin ,userLogOut,updateUser} = UserSlice.actions

export default UserSlice.reducer