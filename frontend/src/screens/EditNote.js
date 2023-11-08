import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { createAxios } from "../createInstance";
import { getNoteByIdSuccess, updateNoteSuccess } from "../redux/note/noteSlice";
import { loginSuccess } from "../redux/user/userSlice";
import {
  getNoteById,
  updateNote,
  deleteNote,
} from "../redux/note/noteApiRequest";

const EditNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.user.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const foundNote = useSelector((state) => state.note.getById.note);
  const { id } = useParams();

  useEffect(() => {
    if (user?.accessToken) {
      getNoteById(id, dispatch, axiosJWT);
    }
  }, [id]);
  useEffect(() => {
    if (foundNote) {
      setTitle(foundNote.title);
      setContent(foundNote.content);
      setCategory(foundNote.category);
    }
  }, [foundNote]);

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    const updatedNote = {
      title: title,
      content: content,
      category: category,
    };

    await updateNote(updatedNote, id, user?.accessToken, dispatch, axiosJWT);
    navigate("/mynotes");
  };

  const handleDeleteNote = async () => {
    const result = window.confirm("Are you sure you want to delete this note?");
    if (result) {
      await deleteNote(id, user?.accessToken, dispatch, axiosJWT);
      navigate("/mynotes");
    }
  };
  const handleArrowBack = () => {
    navigate("/mynotes");
  };

  return (
    <div>
      <div>
        <div className=" fixed top-0 w-full z-10 bg-black/10">
          <div className="">
            <div className="flex p-2 mx-3 justify-between">
              <button onClick={handleArrowBack}>
                <div className="text-[rgb(134,122,245)]">
                  <AiOutlineArrowLeft className="w-8 h-8" />
                </div>
              </button>
              <div className="flex items-center">
                <div className="text-[rgb(134,122,245)]">Edit note</div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="mt-24 sm:mx-32 md:mx-40 lg:mx-60 xl:mx-80">
          <div className="m-6">
            <form
              className="my-2 text-sm mx-4 lg:mx-28 md:mx-12"
              onSubmit={handleUpdateNote}
            >
              <div className="flex flex-col  my-6 gap-y-1">
                <label className="font-thin" htmlFor="title">
                  Title
                </label>
                <input
                  className="rounded-md h-8 border border-1"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col  my-6 gap-y-1">
                <label className="font-thin" htmlFor="content">
                  Content
                </label>
                <textarea
                  className="rounded-md border border-1 h-24"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex flex-col  my-6 gap-y-1">
                <label className="font-thin" htmlFor="category">
                  Category
                </label>
                <input
                  className="rounded-md h-8 border border-1"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="flex justify-start font-light text-slate-400 mx-4 my-6">
                <div>Editing on - {new Date().toLocaleDateString()}</div>
              </div>

              <div className="flex justify-center">
                <div className="rounded-md bg-[rgb(134,122,245)] text-white text-sm mx-4 p-2 px-14 my-4">
                  <button type="submit">UPDATE NOTE</button>
                </div>
              </div>
            </form>
            <div className=" flex justify-center items-center   ">
              <button
                className=" bg-[#e07272]/90 w-[30%] rounded-md text-white text-sm px-14 p-2 text-center my-4"
                onClick={handleDeleteNote}
              >
                DELETE NOTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
