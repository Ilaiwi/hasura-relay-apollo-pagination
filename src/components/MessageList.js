import { Card, Grid, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";

function MessageList({ data, loading, username }) {
  return !loading && data && data.message.length > 0 ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "max-content"
      }}
    >
      {data.message.map((message) => {
        return (
          <Card
            raised
            key={message.id}
            style={{
              marginBottom: 8,
              width: "60%",
              alignSelf:
                username === message.username ? "flex-end" : "flex-start"
            }}
          >
            <Grid
              style={{
                padding: "0px 8px",
                justifyContent: "space-between"
              }}
              container
            >
              <Grid xs={9} item>
                <Typography variant="subtitle1">{message.username}</Typography>
                <Typography variant="body2">{message.text}</Typography>
              </Grid>
              <Grid
                container
                alignItems="flex-start"
                justify="flex-end"
                xs={3}
                item
              >
                <Typography variant="subtitle2">
                  {moment(message.timestamp).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </div>
  ) : loading ? (
    <h1>loading</h1>
  ) : null;
}

export default MessageList;
