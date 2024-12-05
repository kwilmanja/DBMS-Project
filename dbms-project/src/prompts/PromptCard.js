import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as authService from "../users/auth-service";

const PromptCard = ({ prompt }) => {

  const { currentUser } = useSelector((state) => state.auth);

  const inline = {
    "display": "inline"
  }

  const card = {
    "width": "100%",
  }

  const link = {
    "text-decoration": "none",
    "color": "black"
  }

  return (
    <>
      {prompt &&
        <div className="col">
          <Link to={'/prompts/' + prompt.id} style={link}>
            <div className="card mb-3" style={card}>
              <div className="card-header align-items-center" style={inline}>
                <h3 style={inline}>{prompt.name} </h3>
              </div>
              <div className="card-body">

                <div className="d-flex">
                  <h6 className="text-muted" style={{ marginRight: '8px' }}>Description: </h6>
                  <h6 className="ml-">{prompt.description}</h6>
                </div>

                <div className="d-flex">
                  <h6 className="text-muted" style={{ marginRight: '8px' }}>Genres:</h6>
                  <h6>{prompt.genres}</h6>
                </div>

                <div className="row">
                  <div className="d-flex col">
                    <h6 className="text-muted" style={{ marginRight: '8px' }}>Created By:</h6>
                    <h6>{prompt.username}</h6>
                  </div>
                </div>

              </div>
            </div>
          </Link>
        </div>
      }
    </>

  );
};
export default PromptCard;