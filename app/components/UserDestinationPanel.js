import React, { PropTypes, Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from "lodash";
import DestinationListItem from '../components/DestinationListItem';

require("!style!css!less!./UserDestinationPanel.less");

export default class UserDestinationPanel extends Component {

  setLoadingStateForCurrentUserPanel(userID) {
    const {isLoading, currentUser} = this.props;
    const classLoading = isLoading && userID === currentUser.id ? "isLoading" : "";
    return classLoading;
  }

  setDisableForTheRestTravelers(userID) {
    const { isLoading, currentUser } = this.props;
    const classDisable = userID !== currentUser.id || isLoading ? "disabled" : "";
    return classDisable;
  }

  setDisplayError(userID) {
    const { currentUser, isError } = this.props;
    const shouldShow = userID === currentUser.id && isError ? "" : "hide";
    return shouldShow;
  }

  render() {
    const {...other} = this.props;
    const data = _.get(this.props, "destinations.data") || [];

    const panels =
      _.map(data, (user, i) =>
      <Panel key={i} collapsible header={user.name} className={this.setLoadingStateForCurrentUserPanel(user.id)}>
      <ListGroup fill>
      {user.destinations.map((des, y) =>
        <DestinationListItem 
        key={y}
        destination={des}
        {...other}
        disabled={this.setDisableForTheRestTravelers(user.id)}
        />
      )}
      <div className={"list-group-item-danger delete-error " + this.setDisplayError(user.id)}>Oops, there was error when editing destinations, should we do that again?</div>
      </ListGroup>
      </Panel>
      )

      return (
        <div>
        {panels}
        </div>
      );
  }
}

UserDestinationPanel.propTypes = {
  destinations: PropTypes.array.isRequired
};
