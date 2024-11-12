import { useEffect, useState } from "react";
import { Jira } from "../interfaces/Interfaces";
import AdoListPane from "../atoms/ado/AdoListPane";
import AdoInfoPane from "../atoms/ado/AdoInfoPane";
import configData from "../../config.json";

interface Props {
  handleAdoNotes: (rc: Jira) => void;
}

const Ado = () => {
  const [isDurtyAdo, setIsDurtyAdo] = useState(true);
  const [adoEndPoint] = useState(configData.SERVER_URL + "/ado");
  const [adoNotes, setAdoNotes] = useState("");

  const handleAdoNotes = (r: Jira) => {
    console.log("handleAdoNotes", r);
    setAdoNotes(r);
  };

  useEffect(() => {});

  return (
    <>
      <div className="container-flex border">
        <div className="row col-12">
          <div className="col col-lg-9 border">
            <AdoInfoPane ado={adoNotes} />
          </div>
          <div className="col col-lg-3 border">
            <AdoListPane
              adoEndPoint={adoEndPoint}
              isDurtyAdo={isDurtyAdo}
              setIsDurtyAdo={setIsDurtyAdo}
              handleAdoNotes={handleAdoNotes}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Ado;
