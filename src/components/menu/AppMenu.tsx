
import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'

import MenuBookIcon from '@material-ui/icons/MenuBook';
import AddIcon from '@material-ui/icons/Add';
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'


import { menuStyles } from '../../styles/Styles'
import AppMenuItem from './AppMenuItem'

const appMenuItems = [
  {
    name: 'Books',
    link: '/',
    Icon: MenuBookIcon,
  },    
  {
    name: 'Add book',
    link: '/reports',
    Icon: AddIcon,
  },
  {
    name: 'Nested Pages',
    Icon: IconLibraryBooks,
    items: [
      {
        name: 'Level 2',
      },
      {
        name: 'Level 2',
        items: [
          {
            name: 'Level 3',
          },
          {
            name: 'Level 3',
          },
        ],
      },
    ],
  },
]

const AppMenu: React.FC = () => {
  const classes = menuStyles()

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  )
}

 export default AppMenu
