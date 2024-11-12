import { useForm } from "react-hook-form";
import { Info } from "../../interfaces/Interfaces";
import { useState } from "react";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
interface Props {
  modalNote: Info;
  isEditable: boolean;
  showNoteModal: boolean;
  handleNoteModalClose: () => void;
  notesEndPoint: string;
}

const NoteModal = ({
  modalNote,
  isEditable,
  showNoteModal,
  handleNoteModalClose,
  notesEndPoint,
}: Props) => {
  const defaultValues = {};
  const { register, resetField, getValues, setValue, control, watch } =
    useForm<Info>({
      mode: "onChange",
      defaultValues: defaultValues,
    });
  const [hideid, setHideid] = useState(true);

  const handleSaveNote = (note: Info) => {
    console.log("handleSavenote >", note);

    axios
      .post(notesEndPoint + "/add", note)
      .then((response) => {
        setModalNote(response.data);
        showNoteModal(false);
        setIsDurtyNotes(true);
      })
      .catch((error) => console.log(error));
  };

  setValue("id", modalNote.id);
  setValue("info", modalNote.info);
  setValue("title", modalNote.title);
  setValue("description", modalNote.description);
  setValue("comments", modalNote.comments);
  const lastUpdated = modalNote.lastUpdated
    ? moment(modalNote.lastUpdated).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  setValue("lastUpdated", lastUpdated);
  setValue("status", modalNote.status);

  const formAction = modalNote.id ? "Change" : "Add";
  return (
    <>
      <Modal
        show={showNoteModal}
        onHide={handleNoteModalClose}
        dialogClassName="change-link"
      >
        <Modal.Header closeButton>
          <Modal.Title>{formAction} Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset disabled={!isEditable}>
              <div className="row g-3 align-items-center m-2" hidden={hideid}>
                <div className="col-3">
                  <label> # :</label>
                </div>
                <div className="col-8">
                  <input
                    readOnly
                    {...register("id")}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center m-2">
                <div className="col-3">
                  <label>information :</label>
                </div>
                <div className="col-8">
                  <div className="text-center">
                    <textarea className="form-control" {...register("info")} />
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center m-2">
                <div className="col-3">
                  <label>Title :</label>
                </div>
                <div className="col-8">
                  <div className="text-center">
                    <textarea className="form-control" {...register("title")} />
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center m-2">
                <div className="col-2">
                  <label>Description :</label>
                </div>
                <div className="col-9">
                  <div className="text-center">
                    <textarea
                      className="form-control"
                      {...register("description")}
                    />
                  </div>
                </div>
              </div>
              <div className="row g-3 align-items-center m-2">
                <div className="col-2">
                  <label>Comments :</label>
                </div>
                <div className="col-9">
                  <div className="text-center">
                    <textarea
                      className="form-control"
                      {...register("comments")}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center  m-2">
                <div className="col-2">
                  <label>Status :</label>
                </div>
                <div className="col-3">
                  <div className="text-center">
                    <input {...register("status")} type="checkbox" />
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleSaveNote(getValues());
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleNoteModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NoteModal;
