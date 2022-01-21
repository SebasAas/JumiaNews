import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

// Components
import Filter from '../index'

describe('Rendering Filter Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('should display the correct number of options', () => {
    const { getAllByRole } = render(<Filter />)
    expect(getAllByRole('option').length).toBe(3)
  })

  test('should have set default option', () => {
    window.scrollTo = jest.fn();
    const { getByRole } = render(<Filter />)
    expect(getByRole('option', { name: 'Relevance' }).selected).toBe(true)
  })

  test('should allow to change the value', () => {
    const setSortBy = jest.fn()
    const setPage = jest.fn()

    const { getByRole } = render(<Filter setSortBy={setSortBy} setPage={setPage} />)
    userEvent.selectOptions(
      // Find the select element
      getByRole('combobox'),
      // Find and select the Newest option
      getByRole('option', { name: 'Newest' }),
    )
    expect(getByRole('option', { name: 'Newest' }).selected).toBe(true)
  })

})