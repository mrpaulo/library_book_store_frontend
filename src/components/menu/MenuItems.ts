import {
  BOOKS_URL,
  ADD_BOOK_URL,
  PUBLISHERS_URL,
  ADD_PUBLISHER_URL,
  AUTHORS_URL,
  ADD_AUTHOR_URL,
  ABOUT_URL,
  ROLE_ALL,
  ROLE_ADM_OPER,
  USERS_URL,
  ROLE_ADMIN,
  ADD_USER_URL
} from '../../services/api/constants';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

export const menuItems = [
  
  {
    name: 'menu.books',
    Icon: MenuBookIcon,
    visibleToRoles: ROLE_ALL,
    items: [
      {
        name: 'menu.search_books',
        link:BOOKS_URL,
        Icon: SearchIcon,
        visibleToRoles: ROLE_ALL,
      },
      {
        name: 'menu.add_book',
        link: ADD_BOOK_URL,
        Icon: AddIcon,
        visibleToRoles: ROLE_ADM_OPER,
      }     
    ],
  },
  {
    name: 'menu.publishers',
    Icon: BusinessIcon,
    visibleToRoles: ROLE_ALL,
    items: [
      {
        name: 'menu.search_publishers',
        link: PUBLISHERS_URL,
        Icon: SearchIcon,
        visibleToRoles: ROLE_ALL,
      },
      {
        name: 'menu.add_publisher',
        link: ADD_PUBLISHER_URL,
        Icon: AddIcon,
        visibleToRoles: ROLE_ADM_OPER,
      }],
  },
  {
    name: 'menu.authors',
    Icon: AccountBoxIcon,
    visibleToRoles: ROLE_ALL,
    items: [
      {
        name: 'menu.search_authors',
        link: AUTHORS_URL,
        Icon: SearchIcon,
        visibleToRoles: ROLE_ALL,
      },
      {
        name: 'menu.add_author',
        link: ADD_AUTHOR_URL,
        Icon: PersonAddIcon,
        visibleToRoles: ROLE_ADM_OPER,
      }],
  },
  
  {
    name: 'menu.user',    
    Icon: PersonIcon,
    visibleToRoles: [ROLE_ADMIN],
    items: [
      {
        name: 'menu.search_users',
        link: USERS_URL,
        Icon: SearchIcon,
        visibleToRoles: ROLE_ALL,
      },
      {
        name: 'menu.add_user',
        link: ADD_USER_URL,
        Icon: PersonAddIcon,
        visibleToRoles: ROLE_ADM_OPER,
      }],
  }, 
  {
    name: 'menu.about',
    link: ABOUT_URL,
    Icon: InfoIcon,
    visibleToRoles: ROLE_ALL,
  }
]