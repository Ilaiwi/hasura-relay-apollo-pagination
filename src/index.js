import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const scheme = (proto) => {
  return window.location.protocol === "https:" ? `${proto}s` : proto;
};
const HASURA_GRAPHQL_ENGINE_HOSTNAME = "hasura-apollo-relay-chat.herokuapp.com";

export const WEBSOCKET_ENDPOINT = `${scheme(
  "ws"
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

const socketLink = new WebSocketLink({
  uri: WEBSOCKET_ENDPOINT,
  options: {
    reconnect: true
  }
});

// Instantiate client
const client = new ApolloClient({
  link: socketLink,
  cache: new InMemoryCache({
    addTypename: false
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
