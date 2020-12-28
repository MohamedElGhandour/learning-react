import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loudedPost:null
    }

    deletedPostHandler = () => {
        axios.delete('/posts/' + this.props.id)
        .then(response => {
            console.log(response);
        })
    }

    componentDidUpdate() {
        if(this.props.id) 
            if (!this.state.loudedPost || (this.state.loudedPost && this.props.id !== this.state.loudedPost.id)) 
                axios.get('/posts/' + this.props.id)
                .then(response => {
                    this.setState({loudedPost:response.data})
                })
    }
    render () {
        
        let post = <p style={{textAlign:'center', fontWeight:'bold'}}>Please select a Post!</p>;
        
        if (this.props.id)
        post = <p style={{textAlign:'center', fontWeight:'bold'}}>Loading!</p>;
        
        if (this.state.loudedPost)
            post = (
                <div className="FullPost">
                    <h1>{this.state.loudedPost.title}</h1>
                    <p>{this.state.loudedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletedPostHandler}>Delete</button>
                    </div>
                </div>

            );
        return post;
    }
}

export default FullPost;