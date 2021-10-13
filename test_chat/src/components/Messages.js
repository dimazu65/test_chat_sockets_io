import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./messages.css";

import Message from "./Message";

function Messages({ messages, name }) {
  return (
    <ScrollToBottom className="messages ">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
}

export default Messages;
