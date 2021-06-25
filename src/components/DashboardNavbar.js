import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'; // material-ui Link 
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { makeStyles } from '@material-ui/core/styles';
import Logo from './Logo';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    color: "#FFF",
    backgroundColor: "#5F9EA0"
  }
})


const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const classes = useStyles()

  console.log(rest)
  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.root}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <RouterLink to="/login">
              <InputIcon />
            </RouterLink>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
