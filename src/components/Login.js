import { useRef } from "react";
import { FormControl, Form, FloatingLabel, Button, Nav } from "react-bootstrap";
import classes from "./Login.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const usernameref = useRef();
  const passwordInputRef = useRef();

  const ForgotPasswordHandler = () => {
    alert("you may have received an email with reset link");
    console.log(usernameref.current.value);
    
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBO-uWvkbDxYCjipLzXz0ZulQvNenR57ww",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: usernameref.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.ok) {
        console.log("Password reset succesfullly");
        console.log(res);
        return res.json();
      } else {
        return res.json().then((data) => {
          console.log(data);
          let errorMessage = "Email not able to sent for reset password";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      alert(err.message);
    });
    
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const EmailId = usernameref.current.value;
    const Password = passwordInputRef.current.value;

    if (EmailId === "" || Password === "") {
      alert("Must fill both Email and Password");
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBO-uWvkbDxYCjipLzXz0ZulQvNenR57ww",
        {
          method: "POST",
          body: JSON.stringify({
            email: EmailId,
            password: Password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("successfully logged in");
          alert("Successfully Logged In");

          // history.replace("/composemail")
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(
          authActions.login({ token: data.idToken, email: data.email })
        );

        console.log(data);
        console.log(data.idToken);
        alert("welcome to your mail box");
        history.replace("/inbox");
      })
      .catch((err) => {
        alert(err.message);
      });
    }
    usernameref.current.value = "";
    passwordInputRef.current.value = "";
  };
  return (
    <div className={classes.login}>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <FloatingLabel label="UserName" className="m-3">
          <FormControl
            type="text"
            placeholder="UserName"
            required
            ref={usernameref}
          />
        </FloatingLabel>
        <FloatingLabel label="Password" className="m-3">
          <FormControl
            type="password"
            placeholder="UserName"
            required
            ref={passwordInputRef}
          />
        </FloatingLabel>
        <div className={classes.button}>
          <Button variant="outline-info" type="submit">
            Login
          </Button>
        </div>
        <div>
          <Nav>
            <Button onClick={ForgotPasswordHandler}>forgot password ?</Button>
            <NavLink to="/signUp" style={{color:"white",marginLeft: "1rem"}}>Don't Have an account?</NavLink>
          </Nav>
        </div>
      </Form>
    </div>
  );
};
export default Login;