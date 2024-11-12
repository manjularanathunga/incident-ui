import { Summery } from "../../../interfaces/Interfaces";

interface Props {
  summry: Summery;
}

const BalanceSummery = ({ summry }: Props) => {
  const {
    monthlyIncome,
    monthlyExpenses,
    currentPaid,
    remainingPay,
    curMonth,
  } = summry;

  return (
    <>
      <div className="container-flex">
        <div className="row border border-info border-2 text-center m-1">
          <div className="col">
            <label className="bold">
              <b>{"Summery =>"}</b>
            </label>
          </div>
          <div className="col">
            <label></label>
            {parseFloat(monthlyIncome).toFixed(2)}
          </div>
          <div className="col">
            {" "}
            <label className="bold">
              <b>Exp :</b>
            </label>
            {parseFloat(monthlyExpenses).toFixed(2)}
          </div>
          <div className="col">
            {" "}
            <label className="bold">
              <b>Paid :</b>
            </label>
            {parseFloat(currentPaid).toFixed(2)}
          </div>
          <div className="col">
            {" "}
            <label className="bold">
              <b>Remain to Pay :</b>
            </label>
            {parseFloat(remainingPay).toFixed(2)}
          </div>
          <div className="col">
            {" "}
            <label className="bold">
              <b>Balance :</b>
            </label>
            {parseFloat(monthlyIncome - monthlyExpenses).toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
};

export default BalanceSummery;
