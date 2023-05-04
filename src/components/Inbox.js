import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const userEmail = localStorage.getItem("email");
  const sanitizedEmail = userEmail.replace(/[@.]/g, "");

  const setIsReadToTrue = () => {
    const key = localStorage.getItem("key which is clicked");
    axios
      .patch(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${sanitizedEmail}/inbox/${key}.json`,
        { read: true }
      )
      .then((response) => {
        console.log("Todo updated successfully:", response.data);
        // window.location.reload();
        // setIsEditing(false);
      })
      .catch((error) => {
        console.log("Error updating todo:", error);
      });
  };

  const setKeyToLocalStorege = (key) => {
    localStorage.setItem("key which is clicked", key);
    setIsReadToTrue();
    setSelectedEmail(messages[key]);
  };

  useEffect(() => {
    if (!sanitizedEmail) {
      console.log("Email not found in localStorage");
      return;
    }

    axios
      .get(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${sanitizedEmail}/outbox.json`
      )
      .then((response) => {
        console.log(
          `Logging from local inbox ${JSON.stringify(response.data)}`
        );
        if (response.data) {
          setMessages(response.data);
        }
      })
      .catch((error) => {
        console.log(`Error getting messages: ${error}`);
      });
  }, [sanitizedEmail]);

  const handleClose = () => {
    setSelectedEmail(null);
  };

  const deleteEmail = (key) => {
    axios
      .delete(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${sanitizedEmail}/outbox/${key}.json`
      )
      .then((response) => {
        console.log("Email deleted successfully:", response.data);
        const updatedMessages = { ...messages };
        delete updatedMessages[key];
        setMessages(updatedMessages);
      })
      .catch((error) => {
        console.log("Error deleting email:", error);
      });
  };

  return (
    <div>
      <h3 style={{ color: "white" }}>Inbox-({sanitizedEmail})</h3>
      <Card className="text-left">
        <ListGroup variant="flush">
        {Object.keys(messages)
            .reverse()
            .map((key, index) => (
              <ListGroup.Item key={key}>
                <div onClick={() => setKeyToLocalStorege(key)}>
                  {!messages[key].read && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "blue",
                        marginRight: "5px",
                      }}
                    ></span>
                  )}
                  {`${messages[key].to}: ${messages[key].subject} - ${messages[key].content}`}
                  <Button
                    variant="outline-danger"
                    style={{ marginLeft: "60rem" }}
                    onClick={() => deleteEmail(key)}
                  >
                    Delete
                  </Button>{" "}
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
        <NavLink to="/composemail">
          {" "}
          <Button>Compose Email</Button>
        </NavLink>
      </Card>
      <Modal show={selectedEmail !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Email Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>To: </strong>
            {selectedEmail && selectedEmail.to}
          </p>
          <p>
            <strong>Subject: </strong>
            {selectedEmail && selectedEmail.subject}
          </p>
          <p>
            <strong>Content: </strong>
            {selectedEmail && selectedEmail.content}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};
  


export default Inbox;