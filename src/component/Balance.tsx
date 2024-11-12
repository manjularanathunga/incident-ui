import axios from "axios";
import { useEffect, useState } from "react";
import { BalanceForm, PexTemplate } from "../interfaces/Interfaces";
import AddBalanacePane from "../atoms/pex/balance/AddBalanacePane";
import TemplatePane from "../atoms/pex/template/TemplatePane";
import MAleart from "../common/MAlert";
import BalanceSummery from "../atoms/pex/balance/BalanceSummery";
import moment from "moment";

const Balance = () => {
  const httpUrl = "http://localhost:7001";
  const [isDurty, setIsDurty] = useState(true);
  const [isDurtyBalance, setsDurtyBalance] = useState(true);
  const [balanceList, setBalanceList] = useState([]);
  const [filterBalanceList, setFilterBalanceList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showBalanceForm, setShowBalanceForm] = useState(Boolean);
  const [balanceEndPoint] = useState(httpUrl + "/balance");
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [isDurtySummary, setIsDurtySummary] = useState(true);
  const [summry, setSummary] = useState({});
  const [filteredUsers, setFilteredUsers] = useState();

  const [balanceForm, setBalanceForm] = useState<BalanceForm>();

  const initBalance = async () => {
    fetch(balanceEndPoint + "/findAll")
      .then((response) => response.json())
      .then((json) => {
        setBalanceList(json);
        setFilterBalanceList(balanceList);
        setIsDurty(false);
        setsDurtyBalance(false);
      });
  };

  const handleFilter = (rc: PexTemplate) => {
    setFilterBalanceList(balanceList.filter((t) => rc.id == t.templateId));
  };

  const loadShopItem = async () => {
    fetch(balanceEndPoint + "/findAllWithType?type=KLARNA")
      .then((response) => response.json())
      .then((json) => {
        setBalanceList(json);
        setIsDurty(false);
        setsDurtyBalance(false);
        setIsDurtySummary(true);
      });
  };

  const handleSummary = async () => {
    fetch(balanceEndPoint + "/summery")
      .then((response) => response.json())
      .then((json) => {
        setSummary(json);
        setIsDurtySummary(false);
      });
  };

  const deleteBalance = (r: number) => {
    // console.log("deleteTemplate >" + r);
    if (
      confirm("Are you sure you want to delete this thing into the database?")
    ) {
      axios
        .delete(balanceEndPoint + "/delete/" + r)
        .then((response) => {
          setIsDurty(true);
          setsDurtyBalance(true);
          setIsDurtySummary(true);
          alert("Deleted record with ID " + r);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("record not deleted from the database.");
    }
  };
  const handleNewBalance = (pt: PexTemplate) => {
    const balanceForm: BalanceForm = {
      id: 0,
      exDesc: pt.exDesc,
      exDate: new Date(),
      exType: "",
      payMethod: "",
      exAmount: pt.exAmount,
      exPaid: false,
      exPaidBy: "",
      comment: pt.comment,
      lastUpdated: new Date(),
      templateId: pt.id,
      status: pt.status,
    };
    setBalanceForm(balanceForm);
    setShowBalanceForm(true);
  };
  const handleBalanceFormClose = () => {
    setShowBalanceForm(false);
  };

  const handleEditBalance = (item: BalanceForm) => {
    setBalanceForm(item);
    setShowBalanceForm(true);
    setIsDurtySummary(true);
  };

  const handleSaveBalance = (balance: BalanceForm) => {
    console.log("handleSaveBalance >", balance);

    axios
      .post(balanceEndPoint + "/add", balance)
      .then((response) => {
        console.log(response.data);
        setShowBalanceForm(response.data);
        setShowAdd(false);
        setIsDurty(true);
        setsDurtyBalance(true);
        setIsDurtySummary(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isDurtyBalance) {
      initBalance();
      setsDurtyBalance(false);
    }

    if (isDurtySummary) {
      setIsDurtySummary(false);
      handleSummary();
    }
  });

  const handleUpdateTemplate = (act: string) => {
    fetch(balanceEndPoint + "/updateTemplate?action=" + act).then((response) =>
      response.json()
    );
  };

  return (
    <>
      <MAleart setVisibleAlert={setVisibleAlert} visibleAlert={visibleAlert} />
      <div className="container-flex m-2 justify-content-around">
        <BalanceSummery summry={summry} />
        <div className="row">
          <div className="col-3 m-2">
            {" "}
            <TemplatePane
              setShowAdd={setShowAdd}
              showAdd={showAdd}
              isDurty={isDurty}
              setIsDurty={setIsDurty}
              handleNewBalance={handleNewBalance}
              httpUrl={httpUrl}
              handleFilter={handleFilter}
              handleUpdateTemplate={handleUpdateTemplate}
              initBalance={initBalance}
            />
          </div>

          <div
            className="col col-8
           border border-dark text-end"
          >
            {showBalanceForm == true ? (
              <AddBalanacePane
                handleSaveBalance={handleSaveBalance}
                handleBalanceFormClose={handleBalanceFormClose}
                showBalanceForm={showBalanceForm}
                isEditable={true}
                balance={balanceForm}
              />
            ) : (
              <div className="container-flex border-bg-primary ">
                <div className="row p-2 text-center border border-primary bg-secondary">
                  <div className="col col-3 font-weight-bold">Desciption</div>
                  <div className="col col-1 font-weight-bold text-end">
                    Amount
                  </div>

                  <div className="col col-1 font-weight-bold">Method</div>

                  <div className="col col-1 font-weight-bold">Paid: Date</div>
                  <div className="col col-1 font-weight-bold">P: Status</div>
                  <div className="col col-1 font-weight-bold">Type</div>
                  <div className="col col-1 font-weight-bold">ID</div>
                </div>

                {filterBalanceList.map((item: BalanceForm, indx: number) => (
                  <div
                    className="row p-1 text-center border border-success"
                    key={indx}
                    onDoubleClick={() => handleEditBalance(item)}
                  >
                    <div className="col col-3 font-weight-bold text-start">
                      {item.exDesc}
                    </div>

                    <div className="col col-1 font-weight-bold text-end text-danger">
                      {item.exAmount.toFixed(2)}
                    </div>

                    <div className="col col-1 font-weight-bold">
                      {item.payMethod}
                    </div>

                    <div className="col col-1 font-weight-bold text-primary">
                      {moment(item.lastUpdated).format("YYYY/MM/DD ")}
                    </div>
                    <div className="col col-1 font-weight-bold">
                      {item.paidStatus}
                    </div>
                    <div className="col col-1 font-weight-bold">
                      {item.exType}
                    </div>
                    <div className="col col-1 font-weight-bold">
                      <button
                        className="btn btn-danger pt-0 pb-0"
                        onClick={() => deleteBalance(item.id)}
                      >
                        REM
                      </button>
                    </div>
                    {item.templateId}
                  </div>
                ))}
                <div className="row p-2 text-center border border-primary">
                  <div className="col col-3 font-weight-bold">&nbsp;</div>
                  <div className="col col-1 font-weight-bold text-end">
                    &nbsp;
                  </div>

                  <div className="col col-1 font-weight-bold">&nbsp;</div>

                  <div className="col col-1 font-weight-bold">&nbsp;</div>
                  <div className="col col-1 font-weight-bold">&nbsp;</div>
                  <div className="col col-1 font-weight-bold">&nbsp;</div>
                  <div className="col col-1 font-weight-bold">
                    <button onClick={() => loadShopItem()}>Shop</button>
                  </div>
                  <div className="col col-1 font-weight-bold">
                    <button onClick={() => initBalance()}>All</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Balance;
