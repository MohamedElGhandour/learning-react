import React, { Component } from 'react'
import ToolBar from '../../components/Navigation/ToolBar/ToolBar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Aux from '../Aux/Aux'
import classes from './Layout.css'

class Layout extends Component{
    state = {
        showSideDrawer: false,
    }
    sideDrawerCancelHandler = () => {
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render() {
        return (
        <Aux>
            <ToolBar sideDrawerToggle={this.sideDrawerToggleHandler} />
            <SideDrawer 
                open={this.state.showSideDrawer} 
                sideDrawerCanceled={this.sideDrawerCancelHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>)
    }
}
export default Layout