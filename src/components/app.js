import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MovieList from "./movie-list";
import { Form, Button, Box, Heading, Text } from "grommet";
import { Search } from "grommet-icons";
import Graph from "../utils/graph";

class App extends React.Component {
  static propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        cast: PropTypes.arrayOf(PropTypes.string)
      })
    ),
    isFetching: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      source: undefined,
      target: undefined,
      result: undefined,
      error: undefined
    };
    this.graph = new Graph();
  }

  componentDidMount() {
    if (this.props.movies.length) {
      this.addEdges();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isFetching !== this.props.isFetching &&
      this.props.movies.length
    ) {
      this.addEdges();
    }
  }

  addEdges() {
    this.props.movies.forEach(movie => {
      movie.cast.forEach(actor => this.graph.addEdge(movie.title, actor));
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { source, target } = this.state;

    if (!source || !target) {
      this.setState({ error: "Please select a source and target movie" });
      return;
    }

    const result = this.graph.bidirectionalSearch(source, target);

    if (!result) {
      this.setState({ error: "Could not find a path" });
      return;
    }

    this.setState({ result });
  };

  changeSource = selection => {
    this.setState({ source: selection, error: undefined });
  };

  changeTarget = selection => {
    this.setState({ target: selection, error: undefined });
  };

  render() {
    if (this.props.isFetching) {
      return <p>Loading&hellip;</p>;
    }

    return (
      <Box
        border={{ color: "neutral-1", size: "xlarge" }}
        pad="medium"
        animation="fadeIn"
      >
        <Heading margin={{ top: "none", bottom: "large" }} size="small">
          Degrees of Separation
        </Heading>
        <Form onSubmit={this.handleSubmit}>
          <MovieList label="Source" handleChange={this.changeSource} />
          <MovieList label="Target" handleChange={this.changeTarget} />
          <Button
            type="submit"
            primary
            label="Search"
            margin={{ top: "medium" }}
            icon={<Search />}
            reverse={true}
            padding="large"
            color="neutral-1"
          />
        </Form>
        {this.state.error && (
          <Text
            color="status-error"
            className="error"
            margin={{ top: "medium" }}
          >
            {this.state.error}
          </Text>
        )}
        {this.state.result && (
          <ul className="result">
            {this.state.result.map(item => (
              <li key={item}>
                <Text size="medium">{item}</Text>
              </li>
            ))}
          </ul>
        )}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  isFetching: state.isFetching
});

export default connect(mapStateToProps)(App);
