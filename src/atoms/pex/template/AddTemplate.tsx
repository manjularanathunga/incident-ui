import { PexTemplate } from "../../../interfaces/Interfaces";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import moment from "moment";

interface Props {
  handleSaveTemplate: (rc: PexTemplate) => void;
  handleClose: () => void;
  show: boolean;
  isEditable: boolean;
  pexTemplate: PexTemplate;
}

const AddTemplate = ({
  handleSaveTemplate,
  handleClose,
  show,
  isEditable,
  pexTemplate,
}: Props) => {
  const { register, getValues, setValue, control } = useForm<PexTemplate>({
    defaultValues: {
      id: 0,
      exDesc: "",
      exAmount: 0.0,
      comment: "",
      scheduleDate: moment().format("YYYY-MM-DD"),
      status: true,
    },
  });

  setValue("id", pexTemplate.id ? pexTemplate.id : 0);
  setValue("exDesc", pexTemplate.exDesc);
  setValue("exAmount", pexTemplate.exAmount);
  setValue("comment", pexTemplate.comment);
  const scheduleDate = pexTemplate.scheduleDate
    ? moment(pexTemplate.scheduleDate).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  setValue("scheduleDate", scheduleDate);
  setValue("status", pexTemplate.status);
  setValue("keywords", pexTemplate.keywords);

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="change-link">
        <Modal.Header closeButton>
          <Modal.Title>Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset disabled={!isEditable}>
              <div className="row g-3 align-items-center mb-1">
                <div className="col-2">
                  <label className="col-form-label">Id</label>
                </div>
                <div className="col-2">
                  <input
                    readOnly
                    type="text"
                    {...register("id")}
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-1">
                <div className="col-2">
                  <label className="col-form-label">Title</label>
                </div>
                <div className="col-6">
                  <input
                    {...register("exDesc")}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-1">
                <div className="col-2">
                  <label className="col-form-label">Amount</label>
                </div>
                <div className="col-2">
                  <input
                    {...register("exAmount")}
                    type="number"
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center m-2">
                <div className="col-3">
                  <label>Expected Date :</label>
                </div>
                <div className="col-3">
                  <input
                    {...register("scheduleDate")}
                    className="form-control form-date"
                    type="date"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-1">
                <div className="col-2">
                  <label className="col-form-label">comments</label>
                </div>
                <div className="col-6">
                  <textarea
                    {...register("comment")}
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-2">
                  <label className="col-form-label">status</label>
                </div>
                <div className="col-1">
                  <input type="checkbox" {...register("status")}></input>
                </div>
              </div>

              <div className="row g-3 align-items-center mb-1">
                <div className="col-2">
                  <label className="col-form-label">Keywords</label>
                </div>
                <div className="col-6">
                  <textarea
                    {...register("keywords")}
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleSaveTemplate(getValues());
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
};

export default AddTemplate;
