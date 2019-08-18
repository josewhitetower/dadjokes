import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";

const BASE_URL = "https://icanhazdadjoke.com/";

export default class JokesContainer extends Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    const jokes = JSON.parse(localStorage.getItem("jokes") || "[]");

    if (jokes.length) {
      this.setState({ jokes });
    } else {
      this.getJokes();
    }
  }

  getJokes = async () => {
    const jokes = [];
    while (jokes.length < 10) {
      const response = await axios.get(BASE_URL, {
        headers: { Accept: "application/json" }
      });
      const joke = response.data;

      if (!jokes.find(j => j.id === joke.id)) {
        joke.votes = 0;
        jokes.push(joke);
      }
    }
    this.setState({ jokes });
  };

  componentDidUpdate() {
    localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
  }

  upVote = id => {
    const jokes = [...this.state.jokes];

    jokes.forEach(j => {
      if (j.id === id) {
        j.votes = j.votes + 1;
      }
    });

    this.setState({ jokes });
  };

  downVote = id => {
    const jokes = [...this.state.jokes];

    jokes.forEach(j => {
      if (j.id === id) {
        j.votes = j.votes - 1;
      }
    });

    this.setState({ jokes });
  };

  render() {
    const jokes = this.state.jokes.map(joke => {
      return (
        <Joke
          joke={joke.joke}
          key={joke.id}
          id={joke.id}
          votes={joke.votes}
          downVote={this.downVote}
          upVote={this.upVote}
        />
      );
    });
    return <div>{jokes}</div>;
  }
}
