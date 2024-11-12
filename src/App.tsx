import "./css/App.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutPane from "./component/LayoutPane.tsx";
import Home from "./component/Home.tsx";
import Balance from "./component/Balance.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import VolvoNotes from "./component/VolvoNotes.tsx";
import Ado from "./component/Ado.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutPane />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />}></Route>
            const httpEndPoint = "http://localhost:7001";
            <Route path="/balance" element={<Balance />}></Route>
            <Route path="/ado" element={<Ado />}></Route>
            <Route path="/notes" element={<VolvoNotes />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
