import { createStyles, makeStyles, TableCell, Theme, withStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
input: {
   marginBottom: '2%',   
   height: '2.5em'
},
table: {    
  width: '80%',
  margin: '3%',
},
submitButton: {
  display:'inline-block',
 padding:'0.7em 1.4em',
 margin:'0 0.3em 0.3em 0',
 borderRadius:'0.15em',
 boxSizing: 'border-box',
 textDecoration:'none',
 fontFamily:'Roboto ,sans-serif',
 textTransform:'uppercase',

 color:'#FFFFFF',
 backgroundColor:'#3369ff',
 boxShadow:'inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17)',
 textAlign:'center',
 position:'relative',
}
});

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

export const useStylesPagination = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);