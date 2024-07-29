import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import goalServices from './goalServices';

const initialState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

//get goal action

export const getGoals = createAsyncThunk('goals/getGoals', async thunkAPI => {
  try {
    goalServices.getGoals();
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//create goal action

// Create new goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalServices.createGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createGoal.pending, state => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

    // .addCase(getGoals.pending, state => {
    //   state.isLoading = true;
    // })
    // .addCase(getGoals.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.goals = action.payload;
    // })
    // .addCase(getGoals.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // })
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
