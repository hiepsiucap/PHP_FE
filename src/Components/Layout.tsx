/** @format */

import React, { useEffect, useState } from "react";
import {
  Search,
  BarChart2,
  Home,
  Settings,
  FileText,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { Outlet } from "react-router";
import { useLocation, useNavigate } from "react-router";

const Layout: React.FC<React.PropsWithChildren> = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    setActiveTab(pathname);
    console.log(pathname);
  }, [pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-900 to-blue-700 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-blue-800">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">G-Scores</h1>
          ) : (
            <h1 className="text-xl font-bold">GS</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="bg-blue-800 rounded-full p-1 hover:bg-blue-700"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${
                !sidebarOpen ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-4">
          <NavItem
            icon={<Home />}
            text="Dashboard"
            active={activeTab === "/"}
            collapsed={!sidebarOpen}
            onClick={() => {
              navigate("/");
            }}
          />
          <NavItem
            icon={<Search />}
            text="Tìm kiếm điểm"
            active={activeTab === "/search"}
            collapsed={!sidebarOpen}
            onClick={() => {
              navigate("/search");
            }}
          />
          <NavItem
            icon={<BarChart2 />}
            text="Báo cáo"
            active={activeTab === "/report"}
            collapsed={!sidebarOpen}
            onClick={() => {
              navigate("/report");
            }}
          />
          <NavItem
            icon={<FileText />}
            text="Bảng điểm"
            active={activeTab === "/score"}
            collapsed={!sidebarOpen}
            onClick={() => {
              navigate("/score");
            }}
          />
          <NavItem
            icon={<Settings />}
            text="Cài đặt"
            active={activeTab === "/settings"}
            collapsed={!sidebarOpen}
            onClick={() => {
              navigate("/settings");
            }}
          />
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <button className="text-xs text-blue-200 flex items-center">
                  <LogOut className="h-3 w-3 mr-1" /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout Only */}
      <div className="flex-1 overflow-auto bg-white">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "search" && "Tìm kiếm điểm số"}
              {activeTab === "reports" && "Báo cáo phân tích"}
              {activeTab === "scores" && "Bảng điểm chi tiết"}
              {activeTab === "settings" && "Cài đặt hệ thống"}
            </h2>
          </div>
        </header>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

type NavItemProps = {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  text,
  active,
  collapsed,
  onClick,
}) => {
  return (
    <button
      className={`w-full flex items-center px-4 py-3 ${
        active ? "bg-blue-800 text-white" : "text-blue-100 hover:bg-blue-800/50"
      } transition-colors`}
      onClick={onClick}
    >
      <span className={`${collapsed ? "mx-auto" : "mr-3"}`}>{icon}</span>
      {!collapsed && <span>{text}</span>}
    </button>
  );
};

export default Layout;
