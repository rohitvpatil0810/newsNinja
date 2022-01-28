import React, { Component } from "react";

export default class Spinners extends Component {
  render() {
    return (
      <div className="text-center">
        <button className="btn btn-primary my-3" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm "
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    );
  }
}
