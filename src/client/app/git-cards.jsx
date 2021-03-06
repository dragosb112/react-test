import React from 'react'
import {
    render
} from 'react-dom'
import Axios from 'axios'

const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img width="75" src={props.avatar_url} />
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
                    {props.name}    
                </div>
                <div>{props.company}</div>  
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
           {props.cards.map(card => <Card key={card.id} {...card} />)}
        </div>
    );
};

class Form extends React.Component {
    state = {
        userName: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('onSubmit Called', this.state.userName); 
        const apiUrl = 'https://api.github.com/users/' + this.state.userName; 
        Axios.get(apiUrl)
            .then(res => {
                this.props.onSubmitSuccess(res.data);
            });       
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                    value={this.state.userName}
                    onChange={(event) => this.setState({userName: event.target.value})}
                    placeholder="github username" required/>
                <button type="submit">Add Card</button>
            </form>
        );
    }
};

class App extends React.Component {
    state = {
        cards:[]        
    };

    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    };

    render() {
        return (
            <div>
                <Form onSubmitSuccess={this.addNewCard}/>
                <CardList cards={this.state.cards}/>
            </div>
        );
    };
};

render(<App/>, document.getElementById('app'));