import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import React from "react";
import "../App.css";

const addUser = gql`
  mutation($username: String!) {
    insert_user(objects: [{ username: $username }]) {
      returning {
        id
        username
      }
    }
  }
`;

const LandingPage = (props) => {
  const handleKeyPress = (key, mutate, loading) => {
    if (!loading && key.charCode === 13) {
      mutate();
    }
  };
  const [insert_user, { loading }] = useMutation(addUser, {
    onCompleted: (data) => {
      props.login(data.insert_user.returning[0].id);
    },
    onError: () => {
      alert("Please try again with a different username.");
      props.setUsername("");
    },
    variables: {
      username: props.username
    }
  });
  return (
    <div className="formGroupWrapper">
      <div className="input-group inputGroup">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your username"
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
          onKeyPress={(key) => handleKeyPress(key, insert_user, loading)}
          disabled={loading}
        />
        <div className="input-group-append groupAppend">
          <button
            className="btn btn-outline-secondary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (props.username.match(/^[a-z0-9_-]{3,15}$/g)) {
                insert_user();
              } else {
                alert(
                  "Invalid username. Spaces and special characters not allowed. Please try again"
                );
                props.setUsername("");
              }
            }}
            disabled={loading || props.username === ""}
          >
            {loading ? "Please wait ..." : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  auth: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

export default LandingPage;
