
import React from 'react'
import { menuStyles } from '../../styles/Styles'
import AppMenuItem from './AppMenuItem'

import {
  BOOKS_URL,
  ADD_BOOK_URL,
  PUBLISHERS_URL,
  ADD_PUBLISHER_URL,
  AUTHORS_URL,
  ADD_AUTHOR_URL,
  ABOUT_URL
} from '../../services/api/constants';

import List from '@material-ui/core/List'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const appMenuItems = [
  
  {
    name: 'menu.books',
    Icon: MenuBookIcon,
    items: [
      {
        name: 'menu.search_books',
        link:BOOKS_URL,
        Icon: SearchIcon,
      },
      {
        name: 'menu.add_book',
        link: ADD_BOOK_URL,
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
    name: 'menu.publishers',
    Icon: BusinessIcon,
    items: [
      {
        name: 'menu.search_publishers',
        link: PUBLISHERS_URL,
        Icon: SearchIcon,
      },
      {
        name: 'menu.add_publisher',
        link: ADD_PUBLISHER_URL,
        Icon: AddIcon,
      }],
  },
  {
    name: 'menu.authors',
    Icon: PersonIcon,
    items: [
      {
        name: 'menu.search_authors',
        link: AUTHORS_URL,
        Icon: GroupIcon,
      },
      {
        name: 'menu.add_author',
        link: ADD_AUTHOR_URL,
        Icon: PersonAddIcon,
      }],
  },
  {
    name: 'menu.about',
    link: ABOUT_URL,
    Icon: InfoIcon,
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
