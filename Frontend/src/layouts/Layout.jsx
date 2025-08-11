import React from "react";
import Header from "../components/Header/Header";
import SidePanel from "../components/SidePanel";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout() {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <SidePanel />
          <main
            className={`flex-1 overflow-y-auto bg-[#1E1E1E] ${
              isDark ? " text-white" : "bg-white text-gray-900"
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
