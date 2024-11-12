import { useState, useEffect } from "react";
import ListGroup from "../atoms/links/ListGroup";
import "../css/layout.css";
import { Record } from "../interfaces/Interfaces";
import AddLinkModal from "../atoms/links/AddLinkModal";
import axios from "axios";
import MButton from "../common/MButton";

const Links = () => {
  const [endPoint] = useState("http://localhost:7001/link");
  //const [modalState, setModalState] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [generalList, setGeneralList] = useState([]);
  const [volvoList, setVolvoList] = useState([]);
  const [supportList, setSupportList] = useState([]);
  const [link, setLisnk] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  //const [state, setState] = useState({});

  //Functions or Methods
  const handleClose = () => setShowLinkModal(false);

  const handleSelectItem = (item: Record) => {
    console.log("Links " + item.url);
    localStorage.setItem(item.title, item.url);
    window.open(item.url, "_blank"); //to open new page
  };

  const changeLink = (link: Record, event: Event) => {
    event.preventDefault();
    setLisnk(link);
    setShowLinkModal(true);
    setIsEditable(true);
  };

  const removeLink = (link: Record) => {
    setLisnk(link);
    setShowLinkModal(true);
    setIsEditable(false);
  };

  const handleChangeLink = (link: Record) => {
    setLisnk(link);
    setShowLinkModal(true);
    setIsEditable(true);
  };

  const loadLinks = async (item: string) => {
    const typeInf =
      item === "Genaral" ? "INFO" : item === "Support" ? "SUPPORT" : "VOLVO";

    fetch(endPoint + "/links/" + typeInf)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (item === "Genaral") {
          setGeneralList(json);
        }
        if (item === "Volvo") {
          setVolvoList(json);
        }
        if (item === "Support") {
          setSupportList(json);
        }
      });
  };

  const handleAddNewLink = () => {
    setLisnk({});
    setShowLinkModal(true);
    setIsEditable(true);
  };

  const handleSaveLink = async (link: Record) => {
    axios
      .post(endPoint + "/add", link)
      .then((response) => {
        console.log(response.data);
        setShowLinkModal(false);
        setPageLoaded(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Update the document title using the browser API
    if (!pageLoaded) {
      setPageLoaded(true);
      loadLinks("Genaral");
      loadLinks("Volvo");
      loadLinks("Support");
    }
    //
  });

  return (
    <>
      <AddLinkModal
        handleSaveLink={handleSaveLink}
        handleClose={handleClose}
        show={showLinkModal}
        linkRecord={link}
        isEditable={isEditable}
        handleChangeLink={handleChangeLink}
      />

      <div className="container-flex scroll-container">
        <div className="row">
          <div className="col">
            <ListGroup
              heading="Genaral"
              items={generalList}
              onSelectItem={handleSelectItem}
              submitExpences={loadLinks}
              changeLink={changeLink}
              removeLink={removeLink}
              handleChangeLink={handleChangeLink}
            />
          </div>
          <div className="col">
            {" "}
            <ListGroup
              heading="Volvo"
              items={volvoList}
              onSelectItem={handleSelectItem}
              submitExpences={loadLinks}
              changeLink={changeLink}
              removeLink={removeLink}
              handleChangeLink={handleChangeLink}
            />
          </div>
          <div className="col">
            <ListGroup
              heading="Support"
              items={supportList}
              onSelectItem={handleSelectItem}
              submitExpences={loadLinks}
              changeLink={changeLink}
              removeLink={removeLink}
              handleChangeLink={handleChangeLink}
            />
            <div className="col col-1">
              <MButton
                color="info"
                bootstrap_style=""
                onClick={handleAddNewLink}
              >
                ADD
              </MButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Links;
