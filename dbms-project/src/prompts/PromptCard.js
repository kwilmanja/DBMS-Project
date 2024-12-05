import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as authService from "../users/auth-service";

const PromptCard = ({ prompt }) => {

  const { currentUser } = useSelector((state) => state.auth);

  const photoSize = {
    "height": "200px",
  };

  const inline = {
    "display": "inline"
  }

  const bar = {
    "width": 100 / 0.05 + '%'
  }

  const bar2 = {
    "width": '40%',
    // "display": "inline"
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

                <div>

                  <h6 className="card-subtitle text-muted">Description: </h6>
                  <div>
                    <h6>{prompt.description}</h6>
                  </div>

                  <h6 className="card-subtitle text-muted" >Created by: </h6>
                  <div>
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