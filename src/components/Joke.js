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
      <div className="Joke flex items-center mb-2 border-b-2 pb-2">
        <div className="flex items-center">
          <span onClick={this.upVote} className="mr-2 cursor-pointer">
            <i className="fa fa-arrow-up fa-xs" />
          </span>
          <span className="border-2 border-red-300 h-12 rounded rounded-full w-12 inline-flex justify-center items-center mr-2">
            <span>{this.props.votes}</span>
          </span>
          <span onClick={this.downVote} className="cursor-pointer">
            <i className="fa fa-arrow-down fa-xs" />
          </span>
        </div>
        <p className="ml-4">{this.props.joke}</p>
      </div>
    );
  }
}
