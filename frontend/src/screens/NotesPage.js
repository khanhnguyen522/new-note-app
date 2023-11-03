import React, { useEffect, useState } from "react";
import SingleNoteComponent from "../components/SingleNoteComponent";
import { useDispatch, useSelector } from "react-redux";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BiMessageEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { getNotes } from "../redux/note/noteApiRequest";
import { createAxios } from "../createInstance";
import { loginSuccess } from "../redux/user/userSlice";

const Notespage = () => {
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.login.currentUser);
  const noteList = useSelector((state) => state.note.get.allNotes);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    console.log("call");
    if (user?.accessToken) {
      getNotes(user?.accessToken, dispatch, axiosJWT);
    }
    if (!user) {
      navigate("/");
    }
  }, [user, update]);

  const onUpdate = () => {
    setUpdate(!update);
  };

  return (
    <div className=" container text-white">
      <div className=" fixed top-0 w-full z-10 bg-black/10">
        <div className="">
          <div className="flex justify-between p-3 mx-3">
            <Link to="/profile">
              <div className="text-[rgb(134,122,245)]">
                <IoPersonCircleSharp className="w-8 h-8" />
              </div>
            </Link>
            <div className="flex items-center">
              <p className="text-[rgb(134,122,245)] ">Notes</p>
            </div>
            <Link to="/createnote">
              <div className="text-[rgb(134,122,245)]">
                <BiMessageEdit className="w-8 h-8" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center pt-14">
        <input
          className="w-11/12 h-8 border rounded-lg border-hidden focus:outline-none backdrop-blur-md bg-[#e9ecee] pl-2 text-md font-thin mt-2 text-black"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-9">
        <div className="max-h-max">
          {noteList
            ?.slice()
            .reverse()
            .filter((filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((note) => (
              <div className="w-full px-4 py-2 " key={note._id}>
                <SingleNoteComponent
                  key={note._id}
                  note={note}
                  onUpdate={onUpdate}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notespage;
