import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, urlToImage, url, author, time, source } = this.props;
    return (
      <div>
        <div className="card mb-3" >
        <span className="position-absolute top-0 start-0 badge rounded-pill bg-info text-dark">{source}</span>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={urlToImage} className="img-fluid rounded-start img-thumbnail" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                  {description}
                </p>
                <p className="card-text"><small className="text-muted">By {author} on {new Date(time).toGMTString()} </small></p>
                <a href={url} rel="noreferrer" target="_blank" className="btn btn-primary">ReadMore</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
