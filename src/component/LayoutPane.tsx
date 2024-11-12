import "../css/layout.css";
import PIInfomation from "./PIInfomation.tsx";
import MenuPane from "./MenuPane.tsx";
import { Outlet } from "react-router-dom";

const LayoutPane = () => {
  const httpUrl = "http://localhost:7001";
  return (
    <div className="full-page">
      <div className="topnav">
        <MenuPane />
      </div>
      <div className="header">
        <PIInfomation httpUrl={httpUrl} />
      </div>
      <div className="body-content">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPane;
