import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import "../App.css";
import Chat from "./Chat";
import LandingPage from "./LandingPage";

const theme = createMuiTheme({ fontSize: 16 });

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
      username: "ilaiwi",
      userId: null
    };
  }

  // set username
  setUsername = (username) => {
    this.setState({
      username
    });
  };

  // check usernme and  perform login
  login = (id) => {
    this.setState({
      isLoggedIn: true,
      userId: id
    });
  };

  render() {
    const { username, isLoggedIn, userId } = this.state;
    // Login if not logged in and head to chat
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoggedIn ? (
            <LandingPage
              setUsername={this.setUsername}
              login={this.login}
              username={username}
            />
          ) : (
            <Chat username={username} userId={userId} />
          )}
        </div>
      </ThemeProvider>
    );
  }
}
