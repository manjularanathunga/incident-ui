import { useForm } from "react-hook-form";
import { Info } from "../../interfaces/Interfaces";

interface Props {
  modalNote: Info;
  handleNote: (action: string, r: Info) => void;
}
const VolvoNotesInfoPane = ({ modalNote, handleNote }: Props) => {
  const { register, resetField, getValues, setValue, control, watch } =
    useForm<Info>({
      mode: "onChange",
    });

  setValue("id", modalNote.id);
  setValue("comments", modalNote.comments);
  return (
    <>
      <span>
        <div>
          <b>
            {" "}
            {modalNote.id}
            {" : "}
            {modalNote.title}
          </b>
          {" : "}
          <span
            className="badge bg-primary fw-bolder text-end"
            onClick={() => handleNote("C", modalNote)}
          >
            Change
          </span>
        </div>

        <textarea
          readOnly
          {...register("comments")}
          className="form-control"
          rows="21"
          cols="50"
        />
      </span>
    </>
  );
};

export default VolvoNotesInfoPane;
