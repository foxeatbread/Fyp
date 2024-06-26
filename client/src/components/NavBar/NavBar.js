import React, { useContext, Fragment } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import { Link } from "react-router-dom";

import ThemeContext from "../../context/ThemeContext/ThemeContext";
import UserContext from "../../context/UserContext/UserContext";
import "../../tailwind.generated.css";

function NavBar() {
  const themeContext = useContext(ThemeContext);
  const { userInfo, isAuthenticated, logout } = useContext(UserContext);

  let mode;

  if (themeContext.theme === "light") {
    mode = (
      <Fragment>
        <span className="mr-1">
          <Brightness3Icon />
        </span>
        Dark Mode
      </Fragment>
    );
  } else if (themeContext.theme === "dark") {
    mode = (
      <Fragment>
        <span className="mr-1">
          <Brightness5Icon />
        </span>
        Light Mode
      </Fragment>
    );
  }

  const themeChanger = () => {
    if (themeContext.theme === "light") {
      themeContext.updateTheme("dark");
    } else {
      themeContext.updateTheme("light");
    }
  };
  // 登出操作
  const handleLogout = () => {
    localStorage.removeItem('token'); // 或sessionStorage
    // 更新UserContext或其他状态管理工具以反映用户未登录
    logout(); // 假设这是更新状态的函数
  };

  return (
    <nav className="bg-background-tertiary text-copy-primary px-12 flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center hover:text-copy-secondary flex-shrink-0 text-white mr-6">
        <Link to="/">
          <span className="inline-block relative" style={{ top: "-4px" }}>
            <FastfoodIcon />
          </span>
          <span className="font-semibold ml-2 text-xl tracking-tight">
            Foodies
          </span>
        </Link>
      </div>
      <div className="sm:block flex-grow flex items-center w-auto">
        {isAuthenticated ? (
          <Fragment>
            <Link to="/user">
              <span className="font-semibold ml-2 text-xl tracking-tight">
                {userInfo.username}
              </span>
            </Link>
            <button onClick={handleLogout} className="font-semibold ml-8 text-xl tracking-tight">
              Logout
            </button>
          </Fragment>
        ) : (
          <Link to="/login">
            <span className="font-semibold ml-2 text-xl tracking-tight">
              Login
            </span>
          </Link>
        )}
        <div className="text-md flex-grow text-right">
          <button onClick={themeChanger} className="outline-none focus:outline-none border-none hover:text-copy-secondary">
            {mode}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;