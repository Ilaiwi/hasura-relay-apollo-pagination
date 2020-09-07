import { Button, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";

const ChatBox = ({ username, onInsertComment }) => {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onInsertComment(text, username);
        setText("");
      }}
    >
      <Grid spacing={2} container>
        <Grid xs={12} lg={8} item>
          <TextField
            style={{ width: "100%" }}
            name="text"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </Grid>
        <Grid xs={4} item>
          <Button type="submit" style={{ width: "100%" }} variant="contained">
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChatBox;
