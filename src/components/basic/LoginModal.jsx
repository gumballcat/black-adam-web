import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AccountAction from "redux/actions/AccountAction";
import CartAction from "redux/actions/CartAction";
import AuthenticationService from "services/AuthenticationService";
import CartService from "services/CartService";

const LoginModal = ({ signal, setSignal }) => {
  const [form] = Form.useForm();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isShown, setIsShown] = useState(signal);
  const [message, setMessage] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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

  const onSignInSubmit = (e) => {
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");

    let currentCart = {
      items: [...cart.items],
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
    };

    AuthenticationService.login(username, password)
      .then((loginResponse) => {
        let token = loginResponse.headers.authorization;

        AuthenticationService.getProfile(token).then((getProfileResponse) => {
          dispatch(AccountAction.login(getProfileResponse.content, token));

          CartService.getCart(token, getProfileResponse.content.id).then(
            (getCartResponse) => {
              if (getCartResponse.content) {
                let items = [];
                let totalPrice = 0;
                let totalItems = 0;
                for (const item of getCartResponse.content) {
                  if (item.quantity <= 0) {
                    continue;
                  }
                  items.push({
                    id: item.product.id,
                    title: item.product.title,
                    price: item.product.price,
                    quantity: item.quantity,
                  });
                  totalPrice += item.totalPrice;
                  totalItems += item.quantity;
                }

                dispatch(
                  CartAction.set({
                    items: items,
                    totalPrice: totalPrice,
                    totalItems: totalItems,
                  })
                );
              } else {
                dispatch(CartAction.set(currentCart));
              }
            }
          );
        });

        form.resetFields();

        setSignal(false);
        setMessage({});
      })
      .catch((error) => {
        console.log(error);
        setMessage({ type: "error", text: error.errorMessage });
      });
  };

  const onSignUpSubmit = (e) => {
    const name = form.getFieldValue("name");
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    const email = form.getFieldValue("email");

    AuthenticationService.signUp(name, username, password, email)
      .then((response) => {
        setMessage({
          type: "success",
          text: "Please check your email for activation URL",
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          type: "error",
          text: error.errorMessage,
        });
      });

    form.resetFields();
    setIsSignUp(false);
  };

  const handleClose = () => {
    setIsShown(false);
    setSignal(false);
    setMessage({});
  };

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
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
        {isSignUp ? (
          <Modal.Title>Sign Up</Modal.Title>
        ) : (
          <Modal.Title>Sign In</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
        >
          {isSignUp ? (
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Your name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : (
            <></>
          )}

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Your username (name you use to login)",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password must consists of 5 or more characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {isSignUp ? (
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Your email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : (
            <></>
          )}
          <div style={messageStyle}>{message.text}</div>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <Button onClick={isSignUp ? onSignUpSubmit : onSignInSubmit}>
          Submit
        </Button>
        {isSignUp ? (
          <Button
            variant="default"
            onClick={(e) => {
              handleSignIn();
            }}
          >
            Sign In
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={(e) => {
              handleSignUp();
            }}
          >
            Sign Up
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
