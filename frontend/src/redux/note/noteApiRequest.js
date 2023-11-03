import {
  getNotesStart,
  getNotesSuccess,
  getNotesFailed,
  createNoteStart,
  createNoteSuccess,
  createNoteFailed,
  getNoteByIdStart,
  getNoteByIdFailed,
  getNoteByIdSuccess,
  updateNoteStart,
  updateNoteSuccess,
  updateNoteFailed,
  deleteNoteStart,
  deleteNoteSuccess,
  deleteNoteFailed,
} from "./noteSlice";

export const getNotes = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getNotesStart());
  try {
    const res = await axiosJWT.get("/v1/note/", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getNotesSuccess(res.data));
  } catch (err) {
    dispatch(getNotesFailed());
  }
};
export const createNote = async (
  note,
  accessToken,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(createNoteStart());
  try {
    const res = await axiosJWT.post("/v1/note/create", note, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(createNoteSuccess(res.data));
    navigate("/mynotes");
  } catch (err) {
    dispatch(createNoteFailed());
  }
};
export const getNoteById = async (id, dispatch, axiosJWT) => {
  dispatch(getNoteByIdStart());
  try {
    const res = await axiosJWT.get("/v1/note/" + id);
    dispatch(getNoteByIdSuccess(res.data));
  } catch (err) {
    dispatch(getNoteByIdFailed());
  }
};
export const updateNote = async (note, id, accessToken, dispatch, axiosJWT) => {
  dispatch(updateNoteStart());
  try {
    const res = await axiosJWT.put("/v1/note/" + id, note, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateNoteSuccess(res.data));
  } catch (err) {
    dispatch(updateNoteFailed());
  }
};
export const deleteNote = async (id, accessToken, dispatch, axiosJWT) => {
  dispatch(deleteNoteStart());
  try {
    const res = await axiosJWT.delete("/v1/note/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });

    dispatch(deleteNoteSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(deleteNoteFailed(err.response.data));
  }
};
