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
      <div className="Joke">
        <span onClick={this.downVote}>-</span>
        <p>{this.props.joke}</p>
        <span onClick={this.upVote}>+</span>
      </div>
    );
  }
}
