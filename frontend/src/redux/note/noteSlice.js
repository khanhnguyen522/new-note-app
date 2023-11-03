import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    get: {
      allNotes: null,
      isFetching: false,
      error: false,
    },
    create: {
      isFetching: false,
      error: false,
    },
    getById: {
      note: null,
      isFetching: false,
      error: false,
    },
    update: {
      isFetching: false,
      error: false,
    },
    delete: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getNotesStart: (state) => {
      state.get.isFetching = true;
    },
    getNotesSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.allNotes = action.payload;
    },
    getNotesFailed: (state) => {
      state.get.isFetching = false;
      state.get.error = true;
    },
    createNoteStart: (state) => {
      state.create.isFetching = true;
    },
    createNoteSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.error = false;
      state.get.allNotes = state.get.allNotes
        ? [...state.get.allNotes, action.payload]
        : [action.payload];
    },
    createNoteFailed: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
    getNoteByIdStart: (state) => {
      state.getById.isFetching = true;
    },
    getNoteByIdSuccess: (state, action) => {
      state.getById.isFetching = false;
      state.getById.note = action.payload;
      state.getById.error = false;
    },
    getNoteByIdFailed: (state) => {
      state.getById.isFetching = false;
      state.getById.error = true;
    },
    updateNoteStart: (state) => {
      state.update.isFetching = true;
    },
    updateNoteSuccess: (state, action) => {
      state.update.isFetching = false;
      const updatedNote = action.payload;
      const { allNotes } = state.get;
      if (allNotes) {
        const index = allNotes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.get.allNotes.splice(index, updatedNote);
        }
      }
      state.update.error = false;
    },
    updateNoteFailed: (state) => {
      state.update.isFetching = false;
      state.update.error = true;
    },
    deleteNoteStart: (state) => {
      state.delete.isFetching = true;
    },
    deleteNoteSuccess: (state, action) => {
      state.delete.isFetching = false;
      const { allNotes } = state.get;
      if (allNotes) {
        state.get.allNotes = allNotes.filter(
          (note) => note.id !== action.payload.id
        );
      }
      state.delete.error = false;
    },
    deleteNoteFailed: (state) => {
      state.delete.isFetching = false;
      state.delete.error = true;
    },
  },
});
export const {
  getNotesStart,
  getNotesSuccess,
  getNotesFailed,
  createNoteStart,
  createNoteSuccess,
  createNoteFailed,
  getNoteByIdStart,
  getNoteByIdSuccess,
  getNoteByIdFailed,
  updateNoteStart,
  updateNoteSuccess,
  updateNoteFailed,
  deleteNoteStart,
  deleteNoteSuccess,
  deleteNoteFailed,
} = noteSlice.actions;
export default noteSlice.reducer;
