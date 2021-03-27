import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedCompenet, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            this.reqInterceptors = axios.interceptors.request.use(request => {
                this.setState({error:null})
                return request
            })

            this.resInterceptors = axios.interceptors.response.use(respone => respone, error => {
                this.setState({error:error})
            })
        }

        componentWillUnmount () {
            console.log(this.resInterceptors, this.reqInterceptors, '[will un mount]');
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.request.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render() { 

            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedCompenet {...this.props} />
                </Aux>
            )
        }
    }
}


export default withErrorHandler