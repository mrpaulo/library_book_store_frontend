//export const BASE_URL = 'http://localhost:4080';
//export const BASE_URL = 'https://library-book-store-b.herokuapp.com';
export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://library-book-store-b.herokuapp.com' : 'http://localhost:4080';
export const BASE_API_URL = BASE_URL + '/api';
export const BOOKS_URL = '/books';
export const ADD_BOOK_URL = '/add-book';
export const PUBLISHERS_URL = '/publishers';
export const ADD_PUBLISHER_URL = '/add-publisher';
export const AUTHORS_URL = '/authors';
export const ADD_AUTHOR_URL = '/add-author';
export const LOGIN_URL = '/login';
export const CREATE_LOGIN_URL = '/create-login';
export const ABOUT_URL = '/about';
export const USERS_URL = '/users';
export const ADD_USER_URL = '/add-user';
export const UPDATE_PASSWORD_URL = '/update-password';

export const ROLE_ADMIN = 'ADMIN';
export const ROLE_OPERATOR = 'OPERATOR';
export const ROLE_CLIENT = 'CLIENT';
export const ROLE_ADM_OPER = [ROLE_ADMIN, ROLE_OPERATOR];
export const ROLE_ALL = [ROLE_ADMIN, ROLE_OPERATOR, ROLE_CLIENT];


