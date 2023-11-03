import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import noteReducer from "./note/noteSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
  },
});
