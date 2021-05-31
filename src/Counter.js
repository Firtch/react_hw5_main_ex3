import React from "react";

const ErrorComponent = () => <div>{props.ignore}</div>;

class Counter extends React.Component {
  constructor(props) {
    console.log("constructor");
    super(props);

    this.state = {
      counter: 0,
      seed: 0,
      initializing: true,
    };

    this.increment = () => this.setState({ counter: ++this.state.counter });
    this.decrement = () => this.setState({ counter: --this.state.counter });
  }

  componentDidMount() {
    console.log("componentDidMount");
    setTimeout(() => {
      this.setState({ initializing: false });
    }, 500);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    console.log(this.props.ignoreProp + " | " + nextProps.ignoreProp);
    if (
      nextProps.ignoreProp &&
      this.props.ignoreProp !== nextProps.ignoreProp
    ) {
      console.log("not render");
      return false;
    }
    console.log("render");
    return true;

    //   return !((nextProps.ignoreProp && this.props.ignoreProp) !== nextProps.ignoreProp);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.seed && state.seed !== props.seed) {
      return {
        seed: props.seed,
        counter: props.seed,
      };
    }
    return null;
  }

  getSnapsotBeforeUpdate(prevProps, prevState) {
    return null;
  }

  render() {
    console.log("render");
    if (this.state.initializing) {
      return <div>Initializing...</div>;
    }

    if (this.props.showErrorComponent && this.state.error) {
      return (
        <div>We have encountered an error! {this.state.error.message}</div>
      );
    }
    return (
      <div>
        <div className="counter">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Derement</button>
          Counter: {this.state.counter}
        </div>
        {this.props.showErrorComponent && <ErrorComponent />}
      </div>
    );
  }

  componentDidCatch(error, info) {
    console.log("componentDidCatch");
    this.setState({ error, info });
  }
}

export default Counter;
