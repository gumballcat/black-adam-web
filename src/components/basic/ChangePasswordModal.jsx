import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import AuthenticationService from "services/AuthenticationService";

const ChangePasswordModal = ({ signal, setSignal }) => {
  const [form] = Form.useForm();
  const [isShown, setIsShown] = useState(signal);
  const [message, setMessage] = useState({});
  const account = useSelector((state) => state.account);

  let messageStyle;
  switch (message.type) {
    case "error":
      messageStyle = { color: "red" };
      break;
    case "success":
      messageStyle = { color: "green" };
      break;
    default:
      messageStyle = {};
      break;
  }

  const onSubmit = () => {
    const oldPassword = form.getFieldValue("oldPassword");
    const newPassword = form.getFieldValue("newPassword");

    AuthenticationService.changePassword(
      account.profile.id,
      account.token,
      oldPassword,
      newPassword
    )
      .then((response) => {
        setMessage({ type: "success", text: "Password changed" });
      })
      .catch((error) => setMessage({ type: "error", text: error.message }));
  };

  const handleClose = () => {
    form.resetFields();
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
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Password must consists of 5 or more characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div style={messageStyle}>{message.text}</div>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <Button onClick={onSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
