import { useEffect, useState } from "react";
import { Jira } from "../../interfaces/Interfaces";

interface Props {
  adoEndPoint: string;
  isDurtyAdo: boolean;
  setIsDurtyAdo: (t: boolean) => void;
  handleAdoNotes: (rc: Jira) => void;
}

const AdoListPane = ({
  adoEndPoint,
  isDurtyAdo,
  setIsDurtyAdo,
  handleAdoNotes,
}: Props) => {
  const [adoList, setAdoList] = useState([]);

  const initBalance = async () => {
    fetch(adoEndPoint + "/findAll")
      .then((response) => response.json())
      .then((json) => {
        setAdoList(json);
        setIsDurtyAdo(false);
      });
  };

  useEffect(() => {
    if (isDurtyAdo) {
      initBalance();
      setIsDurtyAdo(false);
      false;
    }
  });
  return (
    <>
      {" "}
      <div>
        <div className="text-center text-bold">ADO</div>
        <ul>
          {adoList.map((j: Jira, indx: number) => (
            <li key={j.id}>
              <a onClick={() => handleAdoNotes(j)}>{j.jira}</a>
              <span className="text-center font-weight-bold text-black bg-white">
                &nbsp;:&nbsp;
              </span>
              <a>{j.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdoListPane;
