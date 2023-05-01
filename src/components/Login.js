import { useRef } from "react";
import { FormControl, Form, FloatingLabel, Button, Nav } from "react-bootstrap";
import classes from "./Login.module.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const usernameref = useRef();
  const passwordInputRef = useRef();

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
        } else {
          return res.json().then((data) => {
            let errorMessage = "authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
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
            <NavLink to="/sigup" style={{color:"white"}}>Don't Have an account?</NavLink>
          </Nav>
        </div>
      </Form>
    </div>
  );
};
export default Login;