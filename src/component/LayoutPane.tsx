import "../css/layout.css";
import PIInfomation from "./PIInfomation.tsx";
import MenuPane from "./MenuPane.tsx";
import { Outlet } from "react-router-dom";
import configData from "../../config.json";

const LayoutPane = () => {
  return (
    <div className="full-page">
      <div className="topnav">
        <MenuPane />
      </div>
      <div className="header">
        <PIInfomation httpUrl={configData.SERVER_URL} />
      </div>
      <div className="body-content">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPane;
