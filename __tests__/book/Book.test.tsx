import React from 'react';
import { shallow } from 'enzyme';
import Book from '../../src/components/book';
import EditBook from '../../src/components/book/edit';
import { Book as BookType } from '../../src/store/ducks/books/types';

describe('Book component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Book />);
    expect(wrapper).toHaveLength(1);
  }); 
});