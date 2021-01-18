import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions/index";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  state = {
    counter: 100,
  };
  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 15"
          clicked={this.props.onSubtractCounter}
        />
        <br />
        <CounterControl
          label="Store Result"
          clicked={() => this.props.onStoreResult(this.props.ctr)}
        />

        <ul>
          {this.props.results.map((element, index) => (
            <li
              onClick={() => this.props.onDeleteResult(index, element.id)}
              key={index}
            >
              {element.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ctr: state.counterReducer.counter,
    results: state.resultReducer.result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch(actionCreator.increment()),
    onDecrementCounter: () => dispatch(actionCreator.decrement()),
    onAddCounter: () => dispatch(actionCreator.add(10)),
    onSubtractCounter: () => dispatch(actionCreator.subtract(15)),
    onStoreResult: (result) => dispatch(actionCreator.storeResult(result)),
    onDeleteResult: (index, id) =>
      dispatch(actionCreator.deleteResult(index, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
