import "./App.css";
import {
  Navigate,
  Outlet,
  useLocation,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Regester from "./pages/Regester";
import ResetPassword from "./pages/ResetPassword";
import {useSelector ,useDispatch } from 'react-redux'
import { setTheme } from "./redux/theme";
import { setLogout } from "./redux/userSlice";
// import { useDis} from '@reduxjs/toolkit'
const Layout = () => {
  const user = useSelector((state)=> state.user)
  const location = useLocation();
  return user.token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
function App() {

 const theme = useSelector((state)=> state.theme.theme);
  return (
    <>
      <div  data-mode={theme} className={`w-full min-h-[100vh] `}>
        
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/profile/:id?' element={<Profile></Profile>}></Route>
            </Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Regester/>}></Route>
            <Route path='/reset-password' element={<ResetPassword/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
