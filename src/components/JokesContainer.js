import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";

const BASE_URL = "https://icanhazdadjoke.com/";

export default class JokesContainer extends Component {
  state = {
    jokes: [],
    loading: true
  };

  componentDidMount() {
    const jokes = JSON.parse(localStorage.getItem("jokes") || "[]");

    if (jokes.length) {
      this.setState({ jokes, loading: false });
    } else {
      this.getJokes();
    }
  }

  getJokes = async () => {
    this.setState({ loading: true });
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
    this.setState({ jokes, loading: false });
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
    const jokes = this.state.jokes
      .sort((a, b) => b.votes - a.votes)
      .map(joke => {
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

    const loader = (
      <div className="loader" style={{ height: 692 + "px" }}>
        <div />
        <div />
      </div>
    );
    return (
      <div className="JokesContainer flex container mx-auto mt-20 flex-col md:flex-row lg:flex-row px-2">
        <div className="bg-blue-100 shadow-lg lg:w-3/12 md:w-6/12 w-full z-10 h-auto">
          <h1>Dad's Jokes</h1>
          <button onClick={this.getJokes}>Get Jokes</button>
        </div>
        <div className="bg-gray-100 lg:my-10 md:my-10 px-6 py-4">
          {this.state.loading ? loader : jokes}
        </div>
      </div>
    );
  }
}
