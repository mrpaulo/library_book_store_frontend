import React from 'react';
import { render } from '@testing-library/react';
import EditAuthor from '../../src/components/author/edit';

test('renders EditAuthor component without crashing', () => {
  const { getByText } = render(<EditAuthor />);
  const submitButton = getByText(/Submit/i);
  expect(submitButton).toBeCalled();
});
