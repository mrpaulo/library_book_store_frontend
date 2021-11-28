
import { List } from '@material-ui/core'
import React from 'react'
import { menuStyles } from '../../styles/Styles'
import AppMenuItem from './AppMenuItem'
import { menuItems} from './MenuItems'

const AppMenu: React.FC = () => {
  const classes = menuStyles()
   
  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {menuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  )
}

 export default AppMenu
