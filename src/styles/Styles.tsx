import { TableCell, Theme } from '@mui/material';
import { withStyles, makeStyles, createStyles } from '@mui/styles';

const drawerWidth = 240

export const pageMenuStyles = makeStyles((theme: { spacing: (arg0: number) => any; breakpoints: { up: (arg0: string) => any; }; }) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: '2px',
  },
  menuBarButton: {
    marginRight: '2px',
    border: 'none',
    width: '100%'
  },
  title: {
    display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  //isn't working on prod, doenst load
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: '4px',
    paddingBottom: '4px',
    background: '#535454',
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  sectionDesktop: {
    display: 'none',
    // [theme.breakpoints.up('md')]: {
    //   display: 'flex',
    // },
  },
  grow: {
    flexGrow: 1,
  },
}))

export const menuStyles = makeStyles(() =>
({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }));

export const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 300
  },
  textFieldDate: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 300
  },
  input: {
    marginBottom: '2%',
    height: '2.5em'
  }, 
  table: {
    width: '82%',    
  },
  submitButton: {
    marginLeft: '10px',
    marginBottom: '20px'
  },
  resetButton: {
    marginLeft: '10px',
    marginBottom: '20px'
  },
  closeModalButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    color: 'grey',
  }
});

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    // head: {
    //   backgroundColor: theme.palette.common.black,
    //   color: theme.palette.common.white,
    // },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

export const useStylesPagination = makeStyles((theme: Theme) =>
  ({
    root: {
      flexShrink: 0,
      marginLeft: '2px',
    },
  }),
);

export const modalStyles = makeStyles((theme: Theme) =>
  ({
    paper: {
      position: 'absolute',
      width: 1000,
      height: 800,
      // backgroundColor: theme.palette.background.paper,     
      borderRadius: '10px',
      // boxShadow: theme.shadows[5],
      
    },
  }),
);

export const footerStyles = makeStyles(() =>
  ({
    box: {
      display: 'block',
      position: 'absolute',
      width: '100%',
      bottom: 0,
      padding: '80px 60px',
      background: 'black',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)