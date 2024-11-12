import { useEffect, useState } from "react";

interface Props {
  currentYear?: string;
  currentPI?: string;
  weekNumber?: number;
  sprintNumber?: string;
  releaseNumber?: number;
  httpUrl: string;
}

const PIInfomation = ({
  currentYear = "24",
  currentPI = "B",
  sprintNumber = "03",
  releaseNumber = 20,
  httpUrl,
}: Props) => {
  const [summeyEndPoint] = useState(httpUrl + "/balance");
  const [summery, setSummery] = useState({});
  const [summeryLoad, setSummeryLoad] = useState(true);

  const initSummery = async () => {
    fetch(summeyEndPoint + "/piinfo")
      .then((response) => response.json())
      .then((json) => {
        setSummery(json);
        setSummeryLoad(false);
      });
  };

  useEffect(() => {
    if (summeryLoad) {
      initSummery();
    }
  });
  const style = { backgroundColor: "LightGray" };
  return (
    <div style={style}>
      <span className="text-danger">Current PI : </span>
      <b>
        {summery.currentYear}
        {summery.currentPI}:W{summery.weekNumber}
      </b>{" "}
      |{" "}
      <span className="text-danger">
        <b>Sprint :</b>
      </span>
      <b>{summery.sprintNumber}</b> |
      <span className="text-danger"> Release : </span>
      <b>
        {summery.currentYear}W{summery.releaseNumber}Release
      </b>
      <b>{sprintNumber}</b> |<span className="text-danger"> Support : </span>
      <b>W{summery.weekNumber},W23 (M)</b>
    </div>
  );
};

export default PIInfomation;
