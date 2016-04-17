import React, { PropTypes } from 'react';
import { ListGroupItem, Input, Button } from 'react-bootstrap';

require("!style!css!less!./DestinationListItem.less");

export default class UserDestinationPanel extends ListGroupItem {
  onCheckVisited() {
    this.props.onCheckVisited(this.props.destination._id);
  }

  onDestinationDelete() {
    this.props.onDestinationDelete(this.props.destination._id);
  }

  render() {
    const {disabled} = this.props;
    const destinationsClass = this.props.destination.visited ? "strike" : "";
    const buttonDelete = <Button disabled={disabled} className="destinations-delete-button" bsSize='xsmall' onClick={this.onDestinationDelete.bind(this)}>Delete</Button>;
    const checked = this.props.destination.visited ? "checked" : "";

    return (
      <li className="destination-item list-group-item">
      <input type='checkbox' disabled={disabled} checked={checked} onChange={this.onCheckVisited.bind(this)}>
      </input>
      <span className={"destination-name" + " " + destinationsClass}>{this.props.destination.name}</span>
      {buttonDelete}
      </li>
    );
  }
}
