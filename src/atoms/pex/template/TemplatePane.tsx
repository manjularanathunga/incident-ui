import { useEffect, useState } from "react";
import { PexTemplate } from "../../../interfaces/Interfaces";
import axios from "axios";
import AddTemplate from "./AddTemplate";
import moment from "moment";

interface Props {
  showAdd: boolean;
  setShowAdd: (showAdd: boolean) => void;
  isDurty: boolean;
  setIsDurty: (isDurty: boolean) => void;
  handleNewBalance: (rc: PexTemplate) => void;
  httpUrl: string;
  handleFilter: (rc: PexTemplate) => void;
  handleUpdateTemplate: (act: string) => void;
  initBalance: (act: string) => void;
}

const TemplatePane = ({
  showAdd,
  setShowAdd,
  isDurty,
  setIsDurty,
  handleNewBalance,
  httpUrl,
  handleFilter,
  handleUpdateTemplate,
  initBalance,
}: Props) => {
  const [templateList, setTemplateList] = useState([]);
  const [pexTemplate, setPexTemplate] = useState({});
  const [templateEndPoint] = useState(httpUrl + "/template");

  const initTemplate = async () => {
    fetch(templateEndPoint + "/findAll")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setTemplateList(json);
        setIsDurty(false);
      });
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  const editTemplateRecord = (rc: PexTemplate) => {
    setPexTemplate(rc);
    setShowAdd(true);
  };

  const addBalanceRecord = () => {
    setPexTemplate({});
    setShowAdd(true);
  };

  const deleteTemplate = (r: number) => {
    console.log("deleteTemplate >" + r);

    //alert("Hello! I am an alert box!!");

    if (
      confirm("Are you sure you want to delete this thing into the database?")
    ) {
      axios
        .delete(templateEndPoint + "/delete/" + r)
        .then((response) => {
          setIsDurty(true);
          alert("Deleted record with ID " + r);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("record not deleted from the database.");
    }
  };

  const handleSaveTemplate = async (pexTemplate: PexTemplate) => {
    console.log("pexTemplate", pexTemplate);
    axios
      .post(templateEndPoint + "/add", pexTemplate)
      .then((response) => {
        console.log(response.data);
        setPexTemplate(response.data);
        setShowAdd(false);
        setIsDurty(true);
        //setsDurtyBalance(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isDurty) {
      initTemplate();
    }
  });

  return (
    <>
      <div hidden={showAdd}>
        <AddTemplate
          handleClose={handleCloseAdd}
          handleSaveTemplate={handleSaveTemplate}
          isEditable={true}
          show={showAdd}
          pexTemplate={pexTemplate}
        />
      </div>
      <div className="container-flex">
        <div className="row p-2 text-center border-bg-primary bg-secondary">
          <div className="col col-1 font-weight-bold text-start">ID</div>
          <div className="col col-4 font-weight-bold text-start">Desc</div>
          <div className="col col-2 font-weight-bold text-start">BankGiro</div>
          <div className="col col-5 font-weight-bold text-end">
            <button onClick={() => initBalance()} color="dark">
              All
            </button>{" "}
            <button onClick={() => handleUpdateTemplate("L")} color="dark">
              List
            </button>{" "}
            <button onClick={addBalanceRecord} color="dark">
              ADD
            </button>
            <button onClick={() => handleUpdateTemplate("LOAD")} color="dark">
              LOAD
            </button>{" "}
            <button onClick={() => handleUpdateTemplate("U")} color="dark">
              Update
            </button>{" "}
          </div>
        </div>

        {templateList.map((item: PexTemplate, indx: number) => (
          <div
            className="row p-2 text-center"
            key={indx}
            onDoubleClick={() => editTemplateRecord(item)}
          >
            <div
              className="col  col-1 font-weight-bold"
              onClick={() => {
                deleteTemplate(item.id);
              }}
            >
              {item.id}
            </div>
            <div className="col col-4 font-weight-bold text-start">
              {item.comment}
            </div>
            <div className="col col-3 font-weight-bold text-start">
              {item.bankgiro}
            </div>

            <div className="col col-4 font-weight-bold text-end ">
              <button
                className="btn btn-primary pt-0 pb-0"
                onClick={() => handleFilter(item)}
              >
                Filter
              </button>{" "}
              <button
                className="btn btn-secondary pt-0 pb-0"
                onClick={() => handleNewBalance(item)}
              >
                Bill
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TemplatePane;
