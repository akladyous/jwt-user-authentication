import { Routes, Route } from "react-router-dom";
import Header from "./ui/Header.js";
import Home from "./ui/Home.js";
import UsersHome from "./users/UsersHome.js";
import UsersLogin from "./users/UsersLogin.js";
import UsersLogout from "./users/UsersLogout.js";
import UsersSignup from "./users/UsersSignup.js";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="users" element={<UsersHome />}>
                    <Route path="signin" element={<UsersLogin />} />
                    <Route path="logout" element={<UsersLogout />} />
                    <Route path="signup" element={<UsersSignup />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
