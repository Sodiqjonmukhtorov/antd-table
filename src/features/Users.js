import { createSlice } from "@reduxjs/toolkit";

import { UsersData } from "../FakeData";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: UsersData },
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },

    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    filterUser: (state, action) => {
        state.value = state.value.filter((user) => user.name.toLowerCase().includes(action.payload.toLowerCase()) 
        || user.birthday.includes(action.payload) || user.grade.toString().includes(action.payload));
    },

    cancelFilterUser: (state, action) => {
      state.value = UsersData;
    },

    updateUsername: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.name = action.payload.name;
          user.birthday = action.payload.birthday;
          user.grade = action.payload.grade;
        }
      });
    },
  },
});

export const { addUser, deleteUser, filterUser, cancelFilterUser, updateUsername } = userSlice.actions;
export default userSlice.reducer;