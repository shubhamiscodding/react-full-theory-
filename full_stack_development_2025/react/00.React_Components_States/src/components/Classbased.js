import React, { Component } from "react";

// https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

class CounterClass extends Component {
  // constructor(props) {
  //   console.log("Constructor");
  //   super(props);
  //   this.state = {
  //     count: 100,
  //     str:"have fun"
  //   };
  // }
  constructor(props) {
        console.log("Constructor");
    super(props)
    this.state = {
      pname: "pikachu"
    }
  }

  favPokemon = () => {
    let p=prompt("add fav pokemon")
    this.setState({pname: this.state.pname + p})
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // increment = () => {
  //   this.setState({ count: this.state.count +  1});
  //   this.setState({ str: this.state.str + "+1"})
  // };

  // decrementnmae= () => {
  //   this.setState({ str: this.state.str + "-1"});
  //   this.setState({ count: this.state.count - 1 });
  // }

  render() {
    return (
      <div>
        {/* <h2>Counter (Class-Based)</h2>
        <p>Count: {this.state.count}</p>
        <p>str: {this.state.str}</p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrementnmae}>Decrement</button> */}
        <p>state: {this.state.pname}</p>
        <button onMouseEnter={this.favPokemon}>classbased componant</button>
      </div>
    );
  }
}

export default CounterClass;
