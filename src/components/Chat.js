import { gql, useSubscription, useMutation } from "@apollo/client";
import { Divider, Grid, Paper } from "@material-ui/core";
import React from "react";
import ChatBox from "./ChatBox";
import MessageList from "./MessageList";

const messageQuery = gql`
  subscription Messages {
    message(order_by: { timestamp: asc }) {
      id
      text
      timestamp
      username
    }
  }
`;

const insertCommentMutation = gql`
  mutation insertMessage($text: String!, $username: String!) {
    insert_message(
      objects: { text: $text, timestamp: "now()", username: $username }
    ) {
      affected_rows
    }
  }
`;

const Chat = ({ username }) => {
  const messageListRef = React.useRef(null);
  const { loading, error, data } = useSubscription(messageQuery);
  const [insertComment] = useMutation(insertCommentMutation);
  const handleInsertComment = async (text, username) => {
    await insertComment({ variables: { text, username } });
  };
  return (
    <Grid style={{ height: "100vh", justifyContent: "center" }} container>
      <Grid
        xs={8}
        style={{
          height: "100%",
          padding: 8
        }}
        item
      >
        <Paper
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 8
          }}
        >
          <div ref={messageListRef} style={{ overflowY: "auto" }}>
            <MessageList data={data} username={username} loading={loading} />
          </div>
          <Divider style={{ margin: "16px 0px" }} />
          <ChatBox onInsertComment={handleInsertComment} username={username} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;
