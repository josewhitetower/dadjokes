import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";

const BASE_URL = "https://icanhazdadjoke.com/";

export default class JokesContainer extends Component {
  state = {
    jokes: [],
    loading: true
  };

  static defaultProps = {
    numOfJokes: 5
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
    while (jokes.length < this.props.numOfJokes) {
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
      <div className="loader">
        <div />
        <div />
      </div>
    );
    return (
      <div className="JokesContainer flex container mx-auto py-20 flex-col-reverse md:flex-row lg:flex-row px-2 h-screen">
        <div className="bg-blue-200 h-auto lg:w-6/12 md:w-8/12 py-6 shadow-lg text-center w-full z-10 text-red-500">
          <h1 className="font-semibold lg:my-16 text-5xl">Dad's Jokes</h1>
          <button
            className="border border-red-400 hover:bg-red-400 hover:text-white mt-6 p-4 rounded text-xl"
            onClick={this.getJokes}
          >
            New Jokes
          </button>
        </div>
        <div
          className={`bg-gray-100 container h-full lg:my-10 md:my-10 overflow-auto px-6 py-4 shadow-lg${
            this.state.loading ? " flex justify-center items-center" : ""
          }`}
        >
          {this.state.loading ? loader : jokes}
        </div>
      </div>
    );
  }
}
