import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { connect } from "react-redux";
import { FixedSizeList as List } from "react-window";

import { movieTitlesSelector } from "../selectors";
class MovieList extends React.Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    handleChange: PropTypes.func
  };

  render() {
    return (
      <Downshift onChange={this.props.handleChange}>
        {({
          getLabelProps,
          getInputProps,
          getMenuProps,
          getItemProps,
          inputValue,
          isOpen
        }) => (
          <div>
            <label {...getLabelProps()}>{this.props.label}: </label>
            <input {...getInputProps()} />
            <ul {...getMenuProps()}>
              {isOpen
                ? (() => {
                    const items = this.props.movies.filter(
                      item => !inputValue || item.includes(inputValue)
                    );
                    return (
                      <List
                        height={150}
                        itemCount={items.length}
                        itemData={items}
                        itemSize={35}
                        width={300}
                      >
                        {({ data, index, style }) => {
                          const item = data[index];
                          return (
                            <li
                              {...getItemProps({ key: item, item })}
                              style={style}
                            >
                              {item}
                            </li>
                          );
                        }}
                      </List>
                    );
                  })()
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }
}

const mapStateToProps = state => ({
  movies: movieTitlesSelector(state)
});

export default connect(mapStateToProps)(MovieList);
