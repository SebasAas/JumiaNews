import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
// import { MemoryRouter } from 'react-router-dom'

// Components
import Pagination from '../index'


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

  test('should start in the first page', () => {
    const {
      getByText,
      // debug
    } = render(<Pagination />)

    expect(getByText('1')).toBeVisible()
  })

  test('prev button should be disabled at first page', () => {
    const { getByTestId } = render(<Pagination />)

    expect(getByTestId('prev-button')).toBeDisabled();
  })

  test('next button should be disabled at last page', () => {
    // Are showed 10 news per page
    const { getByTestId } = render(<Pagination page={5} hits={50} />)

    expect(getByTestId('next-button')).toBeDisabled();
  })

  test('prev and next button should be enabled between first and end page', () => {

    const { getByTestId } = render(<Pagination page={2} hits={50} />)

    expect(getByTestId('prev-button')).not.toBeDisabled();
    expect(getByTestId('next-button')).not.toBeDisabled();
  })

  test('should add 1 page on click next button', async () => {
    const setPage = jest.fn();

    const { getByTestId, getByText } = render(<Pagination page={1} setPage={setPage} />)

    expect(getByText('1')).toBeVisible()

    userEvent.click(getByTestId('next-button'))

    // Validations
    expect(setPage).toBeCalledTimes(1)

    expect(getByText('2')).toBeVisible()
  })

  test('should go back 2 pages on click prev button', async () => {
    const setPage = jest.fn();

    const { getByTestId, getByText } = render(<Pagination page={4} setPage={setPage} />)
    expect(getByText('4')).toBeVisible()

    fireEvent.click(getByTestId('prev-button'))
    fireEvent.click(getByTestId('prev-button'))

    expect(setPage).toBeCalledTimes(2)

    expect(getByText('2')).toBeVisible()
  })

  test('should show remaining pages', () => {
    const hits = 50;

    const { getByText } = render(<Pagination page={1} hits={hits} />)

    // As we show 10 news per page, 50/10 = 5 remeaning pages
    expect(getByText(Math.floor(hits / 10))).toBeVisible()
  })

  test('should match snapshot pagination', () => {
    const hits = 50;
    const { container } = render(<Pagination page={1} hits={hits} />);
    expect(container).toMatchSnapshot()
  })

})