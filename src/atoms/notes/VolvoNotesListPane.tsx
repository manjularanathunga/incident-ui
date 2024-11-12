import { useEffect, useState } from "react";
import { Info } from "../../interfaces/Interfaces";

interface Props {
  notesEndPoint: string;
  isDurtyNotes: boolean;
  setIsDurtyNotes: (t: boolean) => void;
  handleSwonNote: (rc: Info) => void;
  handleNote: (action: string, record: {}) => void;
}

const VolvoNotesListPane = ({
  notesEndPoint,
  isDurtyNotes,
  setIsDurtyNotes,
  handleSwonNote,
  handleNote,
}: Props) => {
  const [adoList, setAdoList] = useState([]);

  const initBalance = async () => {
    fetch(notesEndPoint + "/findAll")
      .then((response) => response.json())
      .then((json) => {
        setAdoList(json);
        setIsDurtyNotes(false);
      });
  };

  useEffect(() => {
    if (isDurtyNotes) {
      initBalance();
      setIsDurtyNotes(false);
    }
  });
  return (
    <>
      <div
        className="badge bg-success  text-end"
        onClick={() => handleNote("A", {})}
      >
        {" "}
        New
      </div>
      <div>
        <div className="text-center text-bold">ADO</div>
        <ul>
          {adoList.map((j: Info, indx: number) => (
            <li key={j.id}>
              <a onClick={() => handleSwonNote(j)}>{j.info}</a>
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

export default VolvoNotesListPane;
