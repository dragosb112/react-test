import React from 'react'
import {
    render
} from 'react-dom'

class Button extends React.Component{
	
  handleClick = () => {
  	this.props.onClickFunction(this.props.incrementValue)
  }

  //render
	render() {
  		return(
        <button onClick={this.handleClick}>
         + {this.props.incrementValue}
        </button>
  	)
  }
}

const Result = (props) => {
	return (
  	<div>{props.counter}</div>
  )
};

class App extends React.Component {
		//constructor
  state = {
  	counter: 7
  }
	
  incrementCounter = (incrementValue) => {
  	this.setState((prevState) => ({
    	counter: prevState.counter + incrementValue
    }));
  }

	render(){
  	return (
    	<div>
      	<Button incrementValue={1} onClickFunction = {this.incrementCounter}/>
        <Button incrementValue={5} onClickFunction = {this.incrementCounter}/>
      	<Button incrementValue={10} onClickFunction = {this.incrementCounter}/>
        <Button incrementValue={100} onClickFunction = {this.incrementCounter}/>
        <Result counter={this.state.counter}/>
      </div>
    );    	    
  }
}

render(<App/>, document.getElementById('app'));