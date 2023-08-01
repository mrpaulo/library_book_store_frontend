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

import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

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
    name: 'menu.users',    
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