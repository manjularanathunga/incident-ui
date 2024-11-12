import { useState } from "react";
import VolvoNotesInfoPane from "../atoms/notes/VolvoNotesInfo";
import VolvoNotesListPane from "../atoms/notes/VolvoNotesListPane";
import { Info } from "../interfaces/Interfaces";
import NoteModal from "../atoms/notes/NoteModal";

interface Props {}

const VolvoNotes = () => {
  const httpUrl = "http://localhost:7001";
  const [isDurtyNotes, setIsDurtyNotes] = useState(true);
  const [notesEndPoint] = useState(httpUrl + "/notes");
  const [modalNote, setModalNote] = useState({});
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleSwonNote = (r: Info) => {
    setModalNote(r);
  };

  const handleNoteModalClose = () => {
    setShowNoteModal(false);
  };

  const handleNote = (action: string, record: {}) => {
    setModalNote({});
    if (action === "A") {
      setModalNote({});
    } else {
      setModalNote(record);
    }
    setShowNoteModal(true);
  };

  return (
    <>
      <NoteModal
        handleNoteModalClose={handleNoteModalClose}
        isEditable={true}
        modalNote={modalNote}
        showNoteModal={showNoteModal}
        notesEndPoint={notesEndPoint}
      />
      <div className="container-flex border">
        <div className="row col-12">
          <div className="col col-lg-9 border">
            <VolvoNotesInfoPane modalNote={modalNote} handleNote={handleNote} />{" "}
          </div>
          <div className="col col-lg-3 border">
            <VolvoNotesListPane
              notesEndPoint={notesEndPoint}
              isDurtyNotes={isDurtyNotes}
              setIsDurtyNotes={setIsDurtyNotes}
              handleSwonNote={handleSwonNote}
              handleNote={handleNote}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VolvoNotes;
