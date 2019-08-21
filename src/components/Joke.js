import React, { Component } from "react";
const emoticons = ["😠", "😤", "😒", "😐", "😀", "😆", "😂"];

export default class Joke extends Component {
  downVote = () => {
    this.props.downVote(this.props.id);
  };

  upVote = () => {
    this.props.upVote(this.props.id);
  };

  getEmoticon = () => {
    const { votes } = this.props;
    if (votes > 15) {
      return emoticons[6];
    } else if (votes > 10) {
      return emoticons[5];
    } else if (votes > 5) {
      return emoticons[4];
    } else if (votes < -15) {
      return emoticons[0];
    } else if (votes < -10) {
      return emoticons[1];
    } else if (votes < -5) {
      return emoticons[2];
    }
    return emoticons[3];
  };

  render() {
    return (
      <div className="Joke flex items-center justify-between py-4 border-b-2">
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
        <p className="ml-4 mr-auto">{this.props.joke}</p>
        <div className="text-4xl">{this.getEmoticon()}</div>
      </div>
    );
  }
}
