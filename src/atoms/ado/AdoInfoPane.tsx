import { useForm } from "react-hook-form";
import { Jira } from "../../interfaces/Interfaces";

interface Props {
  ado: Jira;
}
const AdoInfoPane = ({ ado }: Props) => {
  const { register, resetField, getValues, setValue, control, watch } =
    useForm<Jira>({
      mode: "onChange",
    });

  setValue("id", ado.id);
  setValue("comments", ado.comments);
  return (
    <>
      <span>
        <div>
          <b>
            {" "}
            {ado.id}
            {" : "}
            {ado.title}
          </b>
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

export default AdoInfoPane;
