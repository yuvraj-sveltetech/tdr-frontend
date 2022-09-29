import React from "react";
import not_found from "../../assets/images/not-found.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container-fluid row not-found px-5">
      <div className="col-md-6 m-auto">
        <img src={not_found} alt="Not Found" className="img-fluid" />
      </div>
      <div className="col-md-6 m-auto text-center">
        <h1>404</h1>
        <p className="m-0">Aha! You see! You can be wrong!</p>
        <span>(or it could be us)...</span>
        <br />
        <br />
        <p>
          ...either way, you should probably <br />
          <Link to="/dashboard">go back to the homepage</Link>
        </p>
      </div>
    </div>
  );
};

export { PageNotFound };
