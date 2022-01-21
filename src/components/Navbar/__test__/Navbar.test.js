import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { MemoryRouter } from 'react-router-dom'

// Components
import Navbar from '../index'
import NavLinks from '../NavLinks'

describe('Rendering Navbar Component', () => {
  test('should have the correct number of links', () => {
    const { getAllByRole } = render(<NavLinks />, { wrapper: MemoryRouter })

    // 4 nav links and 1 link to the searchbox 
    expect(getAllByRole('link').length).toBe(5)
  })

  test('should have the searchbar', () => {
    const { getAllByTestId } = render(<Navbar />, { wrapper: MemoryRouter })

    // 2 input search, 1 showed in the navbar and the other in the hamburger menu
    expect(getAllByTestId('input-search').length).toBe(2)
  })

  test('should be visible the logo', () => {
    const { getByTestId } = render(<Navbar />, { wrapper: MemoryRouter })

    expect(getByTestId('logo')).toBeVisible()
  })

})