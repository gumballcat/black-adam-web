import BasicForm from "components/basic/BasicForm";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const LoginModal = ({
  signal,
  setSignal,
  onSubmit,
  onHide,
  message,
  setMessage,
}) => {
  const [isShown, setIsShown] = useState(signal);

  let messageStyle;
  switch (message.type) {
    case "error":
      messageStyle = { color: "red" };
      break;
    default:
      messageStyle = {};
      break;
  }

  const handleClose = () => {
    setIsShown(false);
    setSignal(false);
    setMessage({});
  };

  useEffect(() => {
    setIsShown(signal);
  }, [signal]);

  return (
    <Modal
      show={isShown}
      onHide={() => {
        handleClose();
      }}
    >
      <Modal.Header>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BasicForm
          id="login"
          method="post"
          onSubmit={onSubmit}
          fields={[
            {
              name: "username",
              type: "text",
              id: "username",
              placeholder: "Username",
            },
            {
              name: "password",
              type: "password",
              id: "password",
              placeholder: "Password",
            },
          ]}
        />
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <div style={messageStyle}>{message.text}</div>
        <Button
          variant="secondary"
          onClick={(e) => {
            handleClose();
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
