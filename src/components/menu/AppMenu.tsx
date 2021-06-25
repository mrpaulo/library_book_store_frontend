
import React from 'react'
import { menuStyles } from '../../styles/Styles'
import AppMenuItem from './AppMenuItem'

import List from '@material-ui/core/List'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import BusinessIcon from '@material-ui/icons/Business';

const appMenuItems = [
  {
    name: 'Books',
    link: '/books',
    Icon: MenuBookIcon,
  },    
  {
    name: 'Add book',
    link: '/add-book',
    Icon: AddIcon,
  },
  {
    name: 'Companies',
    link: '/companies',
    Icon: BusinessIcon,
  },
  {
    name: 'Books',
    Icon: IconLibraryBooks,
    items: [
      {
        name: 'Search books',
        link: '/books',
        Icon: SearchIcon,
      },
      {
        name: 'Add book',
        link: '/add-book',
        Icon: AddIcon,
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
  {
    name: 'Companies',
    Icon: BusinessIcon,
    items: [
      {
        name: 'Search companies',
        link: '/companies',
        Icon: SearchIcon,
      },
      {
        name: 'Add company',
        link: '/add-company',
        Icon: AddIcon,
      }],
  }
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
