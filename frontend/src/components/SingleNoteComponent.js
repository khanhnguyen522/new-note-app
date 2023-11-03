import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteNote } from "../redux/note/noteApiRequest";
import { createAxios } from "../createInstance";
import { loginSuccess } from "../redux/user/userSlice";

const SingleNoteComponent = ({ note, onUpdate }) => {
  const { _id, title, content, category, createdAt } = note;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.login.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [isOpen, setOpen] = useState(false);

  const handleNoteClick = () => {
    setOpen(!isOpen);
  };

  const handleDeleteNote = async (event) => {
    event.stopPropagation();
    const result = window.confirm("Are you sure you want to delete this note?");
    if (result) {
      await deleteNote(_id, user?.accessToken, dispatch, axiosJWT);
      onUpdate();
    }
  };
  const handleEditClick = () => {
    navigate(`/note/${_id}`);
  };

  return (
    <div
      onClick={handleNoteClick}
      className="w-full text-[#696a6a] bg-[#f7f8f9] rounded-lg p-1"
    >
      <div>
        <div className="flex justify-between m-6 gap-x-4">
          <div className=" text-left ">
            <p>{title}</p>
          </div>
          <div className="flex gap-x-2">
            <div className="bg-[rgb(134,122,245)]/90 p-2 rounded-lg h-8 flex items-center">
              <button onClick={handleEditClick}>Edit</button>
            </div>
            <div className="bg-[#e07272]/90 p-2 rounded-lg h-8 flex items-center">
              <button onClick={handleDeleteNote}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="bg-[#f7f8f9] border border-transparent rounded-lg m-6">
          <hr />
          <div className="flex flex-col gap-y-4 rounded-lg mt-6">
            <div className="flex justify-start">
              <div className="p-2 rounded-lg bg-slate-400">{category}</div>
            </div>
            <div className="text-left">
              <div>{content}</div>
            </div>
            <div className="flex justify-start font-light text-slate-400">
              <div>Created on - {createdAt.substring(0, 10)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleNoteComponent;
