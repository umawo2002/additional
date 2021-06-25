import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from './Logo';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    color: "#FFF",
    backgroundColor: "#5F9EA0"
  }
})

const MainNavbar = (props) => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root}
      elevation={0}
      {...props}
    >
      <Toolbar sx={{ height: 40 }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  )
}

export default MainNavbar;
