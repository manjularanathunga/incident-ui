import { BalanceForm } from "../../../interfaces/Interfaces";

import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

interface Props {
  handleSaveBalance: (bl: BalanceForm) => void;
  handleBalanceFormClose: () => void;
  showBalanceForm: boolean;
  isEditable: boolean;
  balance: any;
}

const AddBalanacePane = ({
  handleSaveBalance,
  handleBalanceFormClose,
  showBalanceForm,
  isEditable,
  balance,
}: Props) => {
  const { register, resetField, getValues, setValue, control, watch } =
    useForm<BalanceForm>({
      mode: "onChange",
      defaultValues: {
        id: balance.id,
        exDesc: balance.exDesc,
        exType: balance.exType,
        payMethod: balance.payMethod,
        exAmount: balance.exAmount,
        paidStatus: balance.paidStatus,
        exPaidBy: balance.exPaidBy,
        comment: balance.comment,
        lastUpdated: balance.lastUpdated,
        status: balance.status,
      },
    });
  const [hideid, setHideid] = useState(true);

  setValue("id", balance.id);
  setValue("exDesc", balance.exDesc);
  setValue("exType", balance.exType ? balance.exType : "E");
  setValue("payMethod", balance.payMethod ? balance.payMethod : "KLARNA");

  const effectiveMonth = balance.expectedDate
    ? balance.effectiveMonth
    : moment().format("MMM");
  setValue("effectiveMonth", effectiveMonth);
  setValue("exAmount", balance.exAmount);
  setValue("paidStatus", balance.paidStatus);
  setValue("ocr", balance.ocr);
  setValue("comment", balance.comment);
  setValue("status", balance.status);
  const expectedDate = balance.expectedDate
    ? moment(balance.expectedDate).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  setValue("expectedDate", expectedDate);

  const lastUpdated = balance.lastUpdated
    ? moment(balance.lastUpdated).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  setValue("lastUpdated", lastUpdated);

  return (
    <>
      <Modal
        show={showBalanceForm}
        onHide={handleBalanceFormClose}
        dialogClassName="change-link"
      >
        <Modal.Header closeButton>
          <Modal.Title>Pay Information</Modal.Title>
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
                  <label>Description :</label>
                </div>
                <div className="col-8">
                  <div className="text-center">
                    <textarea
                      className="form-control"
                      {...register("exDesc")}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center  m-2">
                <div className="col-3">
                  <label>Effective Month :</label>
                </div>
                <div className="col-auto">
                  <div className="text-center">
                    <select
                      {...register("effectiveMonth")}
                      className="form-control form-select"
                    >
                      <option>24Jan</option>
                      <option>24Feb</option>
                      <option>24Mar</option>
                      <option>24Apr</option>
                      <option>24May</option>
                      <option>24Jun</option>
                      <option>24Jul</option>
                      <option>24Aug</option>
                      <option>24Sep</option>
                      <option>24Oct</option>
                      <option>24Nov</option>
                      <option>24Dec</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center m-2">
                <div className="col-3">
                  <label>Expected Date :</label>
                </div>
                <div className="col-3">
                  <input
                    {...register("expectedDate")}
                    className="form-control form-date"
                    type="date"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center  m-2">
                <div className="col-3">
                  <label>Type of Pay:</label>
                </div>
                <div className="col-2">
                  <div className="text-center">
                    <select
                      {...register("exType")}
                      className="form-control form-select"
                    >
                      <option>SELECT TYPE </option>
                      <option>I</option>
                      <option>E</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center  m-2">
                <div className="col-3">
                  <label>Payment :</label>
                </div>
                <div className="col-4">
                  <div className="text-center">
                    <select
                      {...register("payMethod")}
                      className="form-control form-select"
                    >
                      <option>SELECT METHOD</option>
                      <option>BANK</option>
                      <option>SWISH</option>
                      <option>BANKGIRA</option>
                      <option>CARD</option>
                      <option>APP</option>
                      <option>KLARNA</option>
                      <option>TRANSFER</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-3 align-items-center  m-2">
                <div className="col-3">
                  <label>OCR :</label>
                </div>
                <div className="col-3">
                  <div className="text-center">
                    <input {...register("ocr")} className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row g-3 align-items-center  m-2">
                <div className="col-3">
                  <label>Amount :</label>
                </div>
                <div className="col-3">
                  <div className="text-center">
                    <input {...register("exAmount")} className="form-control" />
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center  m-2">
                <div className="col-3">
                  <label>Paid Status :</label>
                </div>
                <div className="col-auto">
                  <div className="text-center">
                    <select
                      {...register("paidStatus")}
                      className="form-control form-select"
                    >
                      <option>SELECT PAY</option>
                      <option>PENDING</option>
                      <option>SCHEDULED</option>
                      <option>PAID</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center  m-2">
                <div className="col-2">
                  <label>Payed By :</label>
                </div>
                <div className="col-3">
                  <div className="text-center">
                    <input {...register("exPaidBy")} className="form-control" />
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
                      {...register("comment")}
                    />
                  </div>
                </div>
              </div>
              <div className="row g-3 align-items-center m-2">
                <div className="col-2">
                  <label>Payed Date :</label>
                </div>
                <div className="col-3">
                  <input
                    {...register("lastUpdated")}
                    className="form-control form-date"
                    type="date"
                  />
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
              handleSaveBalance(getValues());
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleBalanceFormClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBalanacePane;
