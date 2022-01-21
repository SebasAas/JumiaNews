import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'

import 'jest-styled-components'

// Components
import Searchbox from '../index'

describe('Rendering Searchbox Component', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('should change the value', () => {
    const termToSearch = 'New York Times'

    const { queryByPlaceholderText, getByRole } = render(<Searchbox />, { wrapper: MemoryRouter })
    const searchInput = queryByPlaceholderText('search')

    fireEvent.change(searchInput, { target: { value: encodeURI(termToSearch) } })

    expect(getByRole('link')).toHaveAttribute('href', encodeURI(`/section/${termToSearch}`))
  })

  test('should assign the value of the search as id in the route', () => {
    const termToSearch = 'BBC International'

    const { queryByPlaceholderText } = render(<Searchbox />, { wrapper: MemoryRouter })
    const searchInput = queryByPlaceholderText('search')

    fireEvent.change(searchInput, { target: { value: encodeURI(termToSearch) } })

    expect(searchInput.value).toBe(encodeURI(termToSearch))
  })

  test('should render input with variation', async () => {
    const { queryByPlaceholderText } = render(<Searchbox />, { wrapper: MemoryRouter })
    const searchInput = queryByPlaceholderText('search')

    expect(searchInput).toMatchSnapshot()
  })

})