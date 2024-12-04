import { BrowserRouter, Link } from "react-router-dom";
import { Routes, Route } from "react-router";
// import Home from "./Home";
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



function App() {
  return (
      <div className="container-fluid">
        <Provider store={store}>
            <CurrentUserContext>
                <BrowserRouter>

                  <Nav/>

                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/profile/edit" element={<ProfileEdit />} />
                      <Route path="/profile/:username" element={<Profile />} />
                      <Route path="/admin" element={<Admin/>}/>
                  </Routes>
                </BrowserRouter>
            </CurrentUserContext>
        </Provider>
      </div>
  );
}

export default App;