var React = require('react');
import {Component} from 'react';
import $ from 'jquery';
var Geosuggest = require('react-geosuggest');

require("!style!css!less!./AutoCompleteCountry.less");

export default class AutoCompleteCountry extends Component {

  getDefaultProps() {
    return {
      geosuggest: this.refs.geosuggest
    }
  }

  componentDidMount() {
  }

  render() {
    let types = ["(cities)"]
    return (
      <div className="auto-complete-country">
      <Geosuggest
      placeholder="Enter city name"
      types={types}
      ref="geosuggest"
      onBlur={this.onBlur}
      onFocus={this.onFocus}
      />
      </div>
    )

  }

}
