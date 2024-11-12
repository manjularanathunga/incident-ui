import { useState } from "react";
import { Record } from "../../interfaces/Interfaces";

interface Props {
  items: any;
  heading: string;
  onSelectItem: (item: any) => void;
  submitExpences: (item: string) => void;
  changeLink: (rc: Record, e: Event) => void;
  removeLink: (rc: Record) => void;
  handleChangeLink: (rc: Record) => void;
}

function ListGroup({
  items,
  heading,
  onSelectItem,
  submitExpences,
  changeLink,
  removeLink,
  handleChangeLink,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <div>
        {" "}
        <h3
          className="border text-center"
          onClick={() => {
            submitExpences(heading);
          }}
        >
          {heading}
        </h3>
        {items.map((item: Record, indx: number) => (
          <span key={item.id}>
            <ul className="list-group">
              <li
                className={
                  item.priority == 1
                    ? "list-group-item inline float-left bg-secondary"
                    : item.priority == 2
                      ? "list-group-item inline bg-info"
                      : "list-group-item inline float-left"
                }
                key={item.id}
                onDoubleClick={() => {
                  handleChangeLink(item);
                }}
              >
                <div className="container-flex">
                  <div className="row">
                    <div className="col-1">{item.id + ". "}</div>
                    <div className="col-7">
                      <span>{item.title}</span>
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        onClick={() => {
                          onSelectItem(item);
                        }}
                      >
                        Open
                      </button>
                      <button
                        className="btn btn-sm btn-secondary m-1"
                        type="button"
                        onClick={(e) => {
                          changeLink(item, e);
                          setSelectedIndex(indx);
                        }}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-danger "
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        onClick={() => {
                          removeLink(item);
                          setSelectedIndex(indx);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </span>
        ))}
      </div>
    </>
  );
}

export default ListGroup;
