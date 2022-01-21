import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import {
  queryByTestId,
} from '@testing-library/dom'

import { MemoryRouter } from 'react-router-dom'

import 'jest-styled-components'

// Components
import Card from '../index'

describe('Component Card is Rendering', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('Should render Default Card if no news are passed', () => {
    const { getByRole } = render(<Card />, { wrapper: MemoryRouter })
    expect(getByRole('img')).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/New_York_Times_logo_variation.jpg/1125px-New_York_Times_logo_variation.jpg')
  })

  test('Should render Card Loaders if the loading state is true', () => {
    const { getByTestId } = render(<Card loading={true} />, { wrapper: MemoryRouter });

    // Check if the loaders exist in the doc
    expect(getByTestId('title-loader')).toBeInTheDocument();
    expect(getByTestId('subtitle-loader')).toBeInTheDocument();
    expect(getByTestId('image-loader')).toBeInTheDocument();
  })

  test('Should render Card with information fetched from TopStories (Hightlight)', () => {
    const origin = 'home'
    const news = {
      title: "Title News",
      abstract: "Subtitle News",
      multimedia: [
        {
          url: "https://static01.nyt.com/images/2022/01/15/us/politics/15voting-rights-3/15voting-rights-3-superJumbo.jpg"
        }
      ]
    }

    const { getByText, getByRole } = render(<Card news={news} origin={origin} />, { wrapper: MemoryRouter });

    expect(getByText(news.title)).toBeVisible();
    expect(getByText(news.abstract)).toBeVisible();
    expect(getByRole('img')).toHaveAttribute('src', 'https://static01.nyt.com/images/2022/01/15/us/politics/15voting-rights-3/15voting-rights-3-superJumbo.jpg')
  })

  test('Should render Card with information fetched from Sections', () => {
    const origin = 'section'
    const news = {
      headline: {
        main: "Title News"
      },
      snippet: "Subtitle News",
      multimedia: [
        {
          url: "images/2022/01/16/business/15NFTGAMERS/merlin_200341866_d4bb783c-85f7-4b11-9ce7-7ea77ba7365b-articleLarge.jpg"
        }
      ]
    }

    const { getByText, getByRole } = render(<Card news={news} origin={origin} />, { wrapper: MemoryRouter });

    expect(getByText(news.headline.main)).toBeVisible();
    expect(getByText(news.snippet)).toBeVisible();
    expect(getByRole('img')).toHaveAttribute('src', 'https://www.nytimes.com/images/2022/01/16/business/15NFTGAMERS/merlin_200341866_d4bb783c-85f7-4b11-9ce7-7ea77ba7365b-articleLarge.jpg')
  })

  test('Should render Card Image with custom styles', () => {
    const imageWidth = '120px'
    const imageHeight = '120px'
    const stylesImage = {
      objectFit: 'container'
    }

    const { getByRole } = render(<Card stylesImage={stylesImage} imageWidth={imageWidth} imageHeight={imageHeight} />, { wrapper: MemoryRouter });

    expect(getByRole('img')).toHaveStyle({
      objectFit: stylesImage.objectFit,
      height: imageHeight,
      width: imageWidth
    })
  })

  test('Should render Card Title with custom styles', () => {
    const stylesTitle = {
      color: 'red'
    }

    const { getByText } = render(<Card stylesTitle={stylesTitle} isError={true} />, { wrapper: MemoryRouter });

    expect(getByText('No title found')).toHaveStyle({
      color: stylesTitle.color
    })
  })

  test('Should render Card Title No Title Found on error', () => {
    const { getByText } = render(<Card isError={true} />, { wrapper: MemoryRouter });

    expect(getByText('No title found')).toBeVisible();
  })

  test('Should render Card Description No Description Found on error', () => {
    const { getByText } = render(<Card isError={true} />, { wrapper: MemoryRouter });

    expect(getByText('No description found')).toBeVisible();
  })
  // isError

  test('Should render the Card Loader at first and then re-render with new information', () => {
    const origin = 'home'
    const news = {
      title: "Title News",
      abstract: "Subtitle News",
      multimedia: [
        {
          url: "https://static01.nyt.com/images/2022/01/15/us/politics/15voting-rights-3/15voting-rights-3-superJumbo.jpg"
        }
      ]
    }

    const { rerender, container, getByText, getByRole, getByTestId } = render(<Card loading={true} />, { wrapper: MemoryRouter });
    // Check if the loaders exist in the doc
    expect(getByTestId('title-loader')).toBeInTheDocument();
    expect(getByTestId('subtitle-loader')).toBeInTheDocument();
    expect(getByTestId('image-loader')).toBeInTheDocument();

    // Re render passing new props
    rerender(<Card loading={false} origin={origin} news={news} />, { wrapper: MemoryRouter })

    // Check if the loaders have been remove
    expect(queryByTestId(container, 'title-loader')).toBeNull();
    expect(queryByTestId(container, 'subtitle-loader')).toBeNull();
    expect(queryByTestId(container, 'image-loader')).toBeNull();

    // Check if the news content is visible
    expect(getByText(news.title)).toBeVisible();
    expect(getByText(news.abstract)).toBeVisible();
    expect(getByRole('img')).toHaveAttribute('src', 'https://static01.nyt.com/images/2022/01/15/us/politics/15voting-rights-3/15voting-rights-3-superJumbo.jpg')
  })

  test('should match snapshot card information', () => {
    const origin = 'home'
    const news = {
      title: "Title News",
      abstract: "Subtitle News",
      multimedia: [
        {
          url: "https://static01.nyt.com/images/2022/01/15/us/politics/15voting-rights-3/15voting-rights-3-superJumbo.jpg"
        }
      ]
    }

    const { container } = render(<Card news={news} origin={origin} />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot()
  })
})
