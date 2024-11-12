import { CAlert, CButton } from "@coreui/react";

interface Props {
  visibleAlert: boolean;
  setVisibleAlert: (show: boolean) => void;
}

const MAleart = ({ visibleAlert, setVisibleAlert }: Props) => {
  return (
    <>
      <CAlert
        style={{ width: "26rem" }}
        className="mb-0"
        color="danger"
        dismissible
        visible={visibleAlert}
        onClose={() => setVisibleAlert(false)}
      >
        A simple primary alert—check it out!
      </CAlert>
    </>
  );
};

export default MAleart;
