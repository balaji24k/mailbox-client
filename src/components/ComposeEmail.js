import React, { useState, useRef } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Form,
  Button,
  FloatingLabel,
  FormControl,
  Card,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const ComposeEmail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const toRef = useRef();
  const subjectRef = useRef();

  const senderEmail = useSelector((state) => state.auth.userEmail);
  const sanitizedSenderEmail = senderEmail.replace(/[@.]/g, "");

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    // Showing data in the console
    // console.log("To:", toRef.current.value);
    // console.log("Subject:", subjectRef.current.value);
    // console.log("Content:", editorState.getCurrentContent().getPlainText());

    console.log(toRef.current.value);
    const receiverEmail = toRef.current.value;
    const sanitizedReceiverEmail = receiverEmail.replace(/[@.]/g, "");
    const message = {
      to: toRef.current.value,
      subject: subjectRef.current.value,
      content: editorState.getCurrentContent().getPlainText(),
    };
    // sending data to the outbox
    axios
      .post(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${sanitizedSenderEmail}/outbox.json`,
        message
      )
      .then((response) => {
        console.log(response);
        toRef.current.value = "";
        subjectRef.current.value = "";
        setEditorState("");
      })
      .catch((error) => {
        console.log(error);
      });

    //Sending data to inbox of the user
    axios
      .post(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${sanitizedReceiverEmail}/inbox.json`,
        {
          from: toRef.current.value,
          subject: subjectRef.current.value,
          content: editorState.getCurrentContent().getPlainText(),
          read: false,
        }
      )
      .then((response) => {
        console.log(response);
        console.log(sanitizedReceiverEmail);
        toRef.current.value = "";
        subjectRef.current.value = "";
        setEditorState("");
        alert("sent");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={SubmitHandler}>
      <Card
        style={{
          width: "90%",
          padding: "2rem",
          marginLeft: "5rem",
          marginTop: "2rem",
        }}
      >
        <Card.Title style={{ fontFamily: "Arial", fontWeight: "bolder" }}>
          Compose Email
        </Card.Title>
        <FloatingLabel label="To:">
          <FormControl type="Email" placeholder="To" ref={toRef} />
        </FloatingLabel>
        <FloatingLabel label="Subject">
          <FormControl type="text" placeholder="Subject" ref={subjectRef} />
        </FloatingLabel>
        <Card.Body
          style={{
            backgroundColor: "black",
            color: "white",
            textAlign: "left",
          }}
        >
          Compose email
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </Card.Body>
        <Button variant="success" type="submit">
          Send
        </Button>
      </Card>
    </Form>
  );
};

export default ComposeEmail;