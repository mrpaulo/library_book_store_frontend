
import React from 'react'
import { menuStyles } from '../../styles/Styles'
import AppMenuItem from './AppMenuItem'

import {
  BOOKS_URL,
  ADD_BOOK_URL,
  COMPANIES_URL,
  ADD_COMPANY_URL,
  PEOPLE_URL,
  ADD_PERSON_URL
} from '../../services/api/constants';

import List from '@material-ui/core/List'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const appMenuItems = [
  {
    name: 'Books',
    link: BOOKS_URL,
    Icon: MenuBookIcon,
  },    
  {
    name: 'Add book',
    link: '/add-book',
    Icon: AddIcon,
  }, 
  {
    name: 'Books',
    Icon: IconLibraryBooks,
    items: [
      {
        name: 'Search books',
        link:BOOKS_URL,
        Icon: SearchIcon,
      },
      {
        name: 'Add book',
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
    name: 'Companies',
    Icon: BusinessIcon,
    items: [
      {
        name: 'Search companies',
        link: COMPANIES_URL,
        Icon: SearchIcon,
      },
      {
        name: 'Add company',
        link: ADD_COMPANY_URL,
        Icon: AddIcon,
      }],
  },
  {
    name: 'People',
    Icon: PersonIcon,
    items: [
      {
        name: 'Search people',
        link: PEOPLE_URL,
        Icon: GroupIcon,
      },
      {
        name: 'Add person',
        link: ADD_PERSON_URL,
        Icon: PersonAddIcon,
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
