import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../createInstance";
import { createNoteSuccess } from "../redux/note/noteSlice";
import { createNote } from "../redux/note/noteApiRequest";
import { loginSuccess } from "../redux/user/userSlice";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const user = useSelector((state) => state.user.login.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleCreateNote = (e) => {
    e.preventDefault();
    const newNote = {
      title: title,
      content: content,
      category: category,
    };
    if (!user) {
      navigate("/");
    }
    if (accessToken) {
      createNote(newNote, accessToken, dispatch, navigate, axiosJWT);
    }
  };
  const handleResetFields = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <div>
      <div>
        <div className=" fixed top-0 w-full z-10 bg-black/10">
          <div className="">
            <div className="flex p-2 mx-3 justify-between">
              <Link to="/mynotes">
                <div className="text-[rgb(134,122,245)]">
                  <AiOutlineArrowLeft className="w-8 h-8" />
                </div>
              </Link>
              <div className="flex items-center">
                <div className="text-[rgb(134,122,245)]">Create new note</div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="mt-24 sm:mx-32 md:mx-40 lg:mx-60 xl:mx-80">
          <div className="m-6">
            <form
              className="my-2 text-sm mx-4 lg:mx-28 md:mx-12"
              onSubmit={handleCreateNote}
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
                <input
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
                <div>Creating on - {new Date().toLocaleDateString()}</div>
              </div>

              <div className="flex justify-center">
                <div className="rounded-md bg-[rgb(134,122,245)] text-white text-sm mx-4 p-2">
                  <button type="submit">CREATE NOTE</button>
                </div>
                <div className="rounded-md bg-[#e07272]/90 text-white text-sm mx-4 p-2">
                  <button onClick={handleResetFields}>RESET FIELDS</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
