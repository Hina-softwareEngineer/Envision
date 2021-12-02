import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {authenticationUI} from '../../queries/auth';

const userDetails = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      let userDBDetail = await authenticationUI.getUserAuthDetailFromDB(
        userData.uid,
      );

      if (userDBDetail) {
        let userObject = {
          ...userDBDetail[userData.uid],
          uid: userData.uid,
          displayName: userDBDetail[userData.uid].username,
        };
        return resolve(userObject);
      }
      return reject("Can't find user.");
    });
  },
); // for login

const authSlice = createSlice({
  name: 'authState',
  initialState: {
    loading: 'idle',
    isAuthenticated: false,
    error: null,
    user: null,
  },
  reducers: {
    loadedUser(state) {
      state.loading = 'resolved';
    },
    logoutUser(state) {
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(userDetails.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(userDetails.fulfilled, (state, action) => {
      // console.log('---loading 2---', action.payload);
      state.loading = 'resolved';
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(userDetails.rejected, (state, action) => {
      console.log('---loading 3---', action);
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = 'resolved';
    });
  },
});

const {actions, reducer} = authSlice;

const {logoutUser, loadedUser} = actions;

export {logoutUser, userDetails, loadedUser};

export default reducer;
