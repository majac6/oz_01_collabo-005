import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopNav from "./Components/Topnav";
import UserContext from "./Context/Authuser";
import ClubCategory from "./Pages/Clubcategory";
import CreateBoard from "./Pages/Createboard";
import CreateMeet from "./Pages/Createmeet";
import CreateSchedules from "./Pages/Createschedules";
import FeedScreen from "./Pages/FeedScreen";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import MeetHome from "./Pages/Meethome";
import MyInfo from "./Pages/Myinfo";
import MyMeet from "./Pages/Mymeet";
import SignUp from "./Pages/Signup";
import Success from "./Pages/Signup/Success";
import PrivateRoute from "./Privateroute/Privateroute";

export type AuthData = {
  first_name: string | null;
  last_name: string | null;
  refreshToken: string | null;
  accessToken: string | null;
  pk: number | null;
} | null;

export function setAuthDataToLocalStorage(data: {
  first_name: string;
  last_name: string;
  refreshToken: string;
  accessToken: string;
  pk: number;
}) {
  localStorage.setItem("first_name", data.first_name);
  localStorage.setItem("last_name", data.last_name);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("pk", String(data.pk));
  return data;
}

function getAuthDataFormLocalStorage(): AuthData {
  let isAuth = true;
  const result = {
    first_name: localStorage.getItem("first_name"),
    last_name: localStorage.getItem("last_name"),
    refreshToken: localStorage.getItem("refreshToken"),
    accessToken: localStorage.getItem("accessToken"),
    pk: Number(localStorage.getItem("pk")),
  };
  Object.keys(result).forEach((key) => {
    if (result[key] === null) {
      isAuth = false;
    }
  });

  if (isAuth) {
    return result;
  } else {
    return null;
  }
}

function App() {
  const [userInfo, setUserInfo] = useState<AuthData>(
    getAuthDataFormLocalStorage(),
  );

  return (
    <div className="App">
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <TopNav />

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signUp" element={<SignUp />}></Route>
          <Route path="/signUp/Success" element={<Success />} />
          <Route path="/clubCategory/:id" element={<ClubCategory />}></Route>

          <Route element={<PrivateRoute />}>
            <Route path="/myMeet" element={<MyMeet />}></Route>
            <Route path="/meetHome/:id" element={<MeetHome />}></Route>
            <Route path="/myInfo/:pk" element={<MyInfo />}></Route>
            <Route path="createMeet" element={<CreateMeet />}></Route>
            <Route path="/createBoard" element={<CreateBoard />}></Route>
            <Route path="/feedScreen" element={<FeedScreen />}></Route>

            <Route
              path="/createSchedules"
              element={<CreateSchedules />}
            ></Route>
            <Route path="*" element={<div> 없는 페이지임</div>}></Route>
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
