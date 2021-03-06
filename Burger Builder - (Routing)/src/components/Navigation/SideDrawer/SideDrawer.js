import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import BackDrop from '../../UI/BackDrop/BackDrop'
import Aux from '../../../hoc/Aux/Aux'
import classes from './SideDrawer.css'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close].join(' ')
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open].join(' ')
    }
    return(
        <Aux>
            <BackDrop show={props.open} clicked={props.sideDrawerCanceled} />
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
               <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer