import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuild from './containers/BurgerBuilder/BurgerBulder';

class App extends Component {
  state = {
    show: true
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({show:false})
    }, 5000);
  }
  render() {
    return (
      <div>
        <Layout>
          {this.state.show ? <BurgerBuild /> : null }
        </Layout>
      </div>
    )
  }
}

export default App;