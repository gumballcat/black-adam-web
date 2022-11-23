import BasicForm from "components/basic/BasicForm";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AccountAction from "redux/actions/AccountAction";
import AuthenticationService from "services/AuthenticationService";

const LoginModal = ({ signal, setSignal }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isShown, setIsShown] = useState(signal);
  const [message, setMessage] = useState({});
  const dispatch = useDispatch();

  let messageStyle;
  switch (message.type) {
    case "error":
      messageStyle = { color: "red" };
      break;
    default:
      messageStyle = {};
      break;
  }

  const onSignInSubmit = (e) => {
    const username = e.target.username.value;
    const password = e.target.password.value;

    AuthenticationService.login(username, password)
      .then((loginResponse) => {
        let token = loginResponse.headers.authorization;

        AuthenticationService.getProfile(token).then((getProfileResponse) => {
          dispatch(AccountAction.login(getProfileResponse.content, token));
        });

        setSignal(false);
        setMessage({});
      })
      .catch((error) => {
        console.log(error);
        setMessage({ type: "error", text: error.errorMessage });
      });
  };

  const onSignUpSubmit = (e) => {
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;

    AuthenticationService.signUp(username, password, email)
      .then((response) => {
        console.log(response);
        dispatch(AccountAction.login(response.content));
        setSignal(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          type: "error",
          text: error.errorMessage,
        });
      });
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

  const formFields = [
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
  ];
  if (isSignUp) {
    formFields.push({
      name: "email",
      type: "email",
      id: "email",
      placeholder: "Email",
    });
  }

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
        <BasicForm
          id="login"
          method="post"
          onSubmit={isSignUp ? onSignUpSubmit : onSignInSubmit}
          fields={formFields}
        />
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <div style={messageStyle}>{message.text}</div>
        {isSignUp ? (
          <Button
            variant="primary"
            onClick={(e) => {
              handleSignIn();
            }}
          >
            Sign In
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={(e) => {
              handleSignUp();
            }}
          >
            Sign Up
          </Button>
        )}

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
