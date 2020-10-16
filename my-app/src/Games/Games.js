import React, {Component} from 'react';

class Games extends Component {
    render (props) {
        return (
            <div> 
                <p>{this.props.name} {this.props.children} {this.props.company}</p> 
            </div>)
    }
}

export default Games;