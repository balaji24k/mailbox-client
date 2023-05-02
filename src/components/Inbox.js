import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, Card, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Inbox = () => {
  const [messages, setMessages] = useState([]);

  const userEmail = localStorage.getItem("email");
  const sanitizedEmail = userEmail.replace(/[@.]/g, "");

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
          setMessages(Object.values(response.data));
        }
      })
      .catch((error) => {
        console.log(`Error getting messages: ${error}`);
      });
  }, [sanitizedEmail]);
  return (
    <div>
      <h3 style={{ color: "white" }}>Inbox-({sanitizedEmail})</h3>
      <Card className="text-left">
        <ListGroup variant="flush">
          {messages.map((message, index) => (
            <ListGroup.Item key={index}>
              <div>
                {`to-${message.to}: subject-${message.subject} - ${message.content}`}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <NavLink to="/composemail">
          {" "}
          <Button>Compose Email</Button>
        </NavLink>
      </Card>
    </div>
  );
};
  


export default Inbox;