import React, { Component } from 'react';

class Liked extends Component {
 
  render() {
    let heartToggler = "fa fa-heart";

    if (!this.props.liked)
      heartToggler += '-o';

    return (
      <i onClick={this.props.onClick} className={heartToggler} aria-hidden="true"></i>

      );
  }
}

export default Liked;