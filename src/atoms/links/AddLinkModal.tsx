import { Button, Modal } from "react-bootstrap";
import { Record } from "../../interfaces/Interfaces";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  handleSaveLink: (rc: Record) => void;
  handleClose: () => void;
  show: boolean;
  linkRecord: Record;
  isEditable: boolean;
}

function AddLinkModal({
  handleSaveLink,
  handleClose,
  show,
  linkRecord,
  isEditable,
}: Props) {
  const [rcd, setRcd] = useState<Record>({});

  useEffect(() => {
    setRcd(linkRecord);
  });

  interface Record {
    id: number;
    title: string;
    url: string;
    type: string;
    priority: number;
    comments: string;
    lastUpdated: string;
    status: string;
  }

  const { register, resetField, setValue, getValues } = useForm<Record>({});

  setValue("id", rcd.id);
  setValue("title", rcd.title);
  setValue("url", rcd.url);
  setValue("type", rcd.type);
  setValue("status", rcd.status);
  setValue("priority", rcd.priority ? rcd.priority : 0);
  setValue("lastUpdated", rcd.lastUpdated);
  setValue("comments", rcd.comments);

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="change-link">
        <Modal.Header closeButton>
          <Modal.Title>Change Link Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset disabled={!isEditable}>
              <legend>{linkRecord.title}</legend>
              <div className="row g-3 align-items-center m-2">
                <div className="col-2">
                  <label className="col-form-label">Id</label>
                </div>
                <div className="col-auto">
                  <input
                    readOnly
                    type="number"
                    {...register("id")}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-2">
                  <label className="col-form-label">Title</label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    {...register("title")}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row g-1 align-items-center m-1">
                <div className="col-2">
                  <label className="col-form-label">URL</label>
                </div>
                <div className="col-8">
                  <textarea
                    {...register("url")}
                    className="form-control"
                    rows={2}
                    cols={190}
                  ></textarea>
                </div>
              </div>

              <div className="row g-1 align-items-center m-1">
                <div className="col-2">
                  <label className="col-form-label">Type</label>
                </div>
                <div className="col-8">
                  <select
                    {...register("type")}
                    className="form-select"
                    onChange={(e) => {}}
                  >
                    <option>INFO</option>
                    <option>VOLVO</option>
                    <option>SUPPORT</option>
                  </select>
                </div>
              </div>

              <div className="row g-1 align-items-center">
                <div className="col-2">
                  <label className="col-form-label">Status</label>
                </div>
                <div className="col-8">
                  <label className="switch">
                    <input
                      type="checkbox"
                      className="form-control"
                      {...register("status")}
                      value={status}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="row g-3 align-items-center m-2">
                <div className="col-2">
                  <label className="col-form-label">Id</label>
                </div>
                <div className="col-auto">
                  <input
                    type="number"
                    {...register("priority")}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-2">
                  <label className="col-form-label">Last Updated</label>
                </div>
                <div className="col-auto">
                  <input
                    {...register("lastUpdated")}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row g-1 align-items-center">
                <div className="col-2">
                  <label className="col-form-label">Comment</label>
                </div>
                <div className="col-8">
                  <textarea
                    {...register("comments")}
                    className="form-control"
                    placeholder="Leave a comment here"
                    rows={2}
                    cols={190}
                  ></textarea>
                </div>
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSaveLink(getValues());
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddLinkModal;
