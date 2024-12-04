import { BrowserRouter, Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import store from './store';
import { Provider } from "react-redux";
import Nav from "./nav";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Login from "./login/Login";
import Register from "./login/Register";
import CurrentUserContext from "./users/current-user-context";
import Admin from "./login/Admin";
import ProfileEdit from "./profile/ProfileEdit";
import Make from "./make/Make.js";
import Prompts from "./prompts/Prompts.js";
import PromptStories from "./prompts/PromptStories.js"
import Details from "./details/Details.js";


function App() {
  return (
    <div className="container-fluid">
      <Provider store={store}>
        <CurrentUserContext>
          <BrowserRouter>

            <Nav />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prompts" element={<Prompts />} />
              <Route path="/prompts/:promptId" element={<PromptStories />} />
              <Route path="/details/:storyId" element={<Details />} />
              <Route path="/make" element={<Make />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
        </CurrentUserContext>
      </Provider>
    </div>
  );
}

export default App;