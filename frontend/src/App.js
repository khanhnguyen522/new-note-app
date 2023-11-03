import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./screens/Homepage";
import NotesPage from "./screens/NotesPage";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import CreateNote from "./screens/CreateNote";
import EditNote from "./screens/EditNote";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Homepage />} />
          <Route path="mynotes" index element={<NotesPage />} />
          <Route path="profile" index element={<Profile />} />
          <Route path="profile/edit" index element={<EditProfile />} />
          <Route path="createnote" index element={<CreateNote />} />
          <Route path="note/:id" index element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
