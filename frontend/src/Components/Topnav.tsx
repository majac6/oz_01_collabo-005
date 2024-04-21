import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserContext from "../Context/Authuser";
import "./Topnav.css";
import { AuthData } from "../App";

function TopNav(): JSX.Element {
  const { userInfo, setUserInfo } = useContext<AuthData>(UserContext);

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(
    userInfo?.accessToken ? true : false,
  );

  useEffect(() => {
    if (userInfo === null) setIsLogin(false);
    else setIsLogin(true);
  }, [userInfo]);

  const toggleMenu = (): void => {
    setShowMenu(!showMenu);
  };

  const logoutHandler = () => {
    // 여기에서 로그아웃 api 콜 해야함.
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    setUserInfo(null);
    alert("로그아웃 되었습니다.");
  };

  return (
    <div className="topNavContainer">
      <div className="headerBox">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="Logo">LANDING</div>
        </Link>
        <div className="navbarButtonBox">
          {/* {showSearch && (
            <form className="searchScreen">
              <label className="searchInputLabel">
                <input
                  className="searchInput"
                  type="text"
                  placeholder="어떤 모임을 찾으시나요?"
                />
                <button type="submit" className="inScreenSearch">
                  <FiSearch />
                </button>
              </label>
            </form>
          )} */}
          <div className="navMenuIcon">
            {/* <button className="searchButton" onClick={toggleSearch}>
              {showSearch ? <RxCross1 size={27} /> : <FiSearch size={27} />}
            </button> */}

            <label className="dropdownLabel" onClick={toggleMenu}>
              <FaUser className="userIcon" />
              <FaAngleDown className="caretIcon" />
            </label>
            <div className={showMenu ? "aboutMyMenuHidden" : "myMenuList"}>
              <ul className="menuList">
                {isLogin ? (
                  <>
                    <li className="logoutList">
                      <button className="logoutButton" onClick={logoutHandler}>
                        로그아웃
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="loginList">
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        로그인
                      </Link>
                    </li>
                  </>
                )}
                <li className="myInfoList">
                  <Link
                    to="/myInfo"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    나의정보
                  </Link>
                </li>
                <li className="myMeetList">
                  <Link
                    to="/myMeet"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    나의모임
                  </Link>
                </li>
              </ul>
            </div>

            <Link to="/createMeet">
              <button>➕</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
