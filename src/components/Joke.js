import React, { Component } from "react";

export default class Joke extends Component {
  downVote = () => {
    this.props.downVote(this.props.id);
  };

  upVote = () => {
    this.props.upVote(this.props.id);
  };

  render() {
    return (
      <div className="Joke flex">
        <div className="flex ">
          <span onClick={this.upVote}>
            <i className="fa fa-angle-up fa-xs" />
          </span>
          <span className="border-2 border-red-300 h-8 rounded rounded-full w-8 inline-flex justify-center content-center">
            {this.props.votes}
          </span>
          <span onClick={this.downVote}>
            <i className="fa fa-angle-down fa-xs" />
          </span>
        </div>
        <p>{this.props.joke}</p>
      </div>
    );
  }
}
