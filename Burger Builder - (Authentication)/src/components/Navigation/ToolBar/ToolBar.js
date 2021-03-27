import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import classes from "./ToolBar.css";

const toolBar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.sideDrawerToggle} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
};

export default toolBar;