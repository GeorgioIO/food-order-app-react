import { use } from "react";
import { UserProgressContext } from "../../store/user-progress-context";
import Modal from "../Modal";
import Button from "../Button";
export default function CheckoutResult() {
  const { progress, hideResult } = use(UserProgressContext);

  function handleCloseResult() {
    hideResult();
  }

  let content = "";

  console.log(progress);
  if (progress === "orderSuccess") {
    content = (
      <>
        <h2 className="modal-title">Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email withing the next
          minutes.
        </p>
      </>
    );
  } else if (progress === "orderError") {
    content = (
      <>
        <h2 className="modal-title">Order Failed!</h2>
        <p>There was a problem in submitting you order.</p>
        <p>Please try again later.</p>
      </>
    );
  }

  return (
    <Modal open={progress === "orderSuccess" || progress === "orderError"}>
      {content}
      <p className="modal-actions">
        <Button className="button" onClick={handleCloseResult}>
          Okay
        </Button>
      </p>
    </Modal>
  );
}
