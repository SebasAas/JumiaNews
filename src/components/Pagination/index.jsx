import React, { useEffect, useState } from 'react'

// Utils
import scrollToTop from '../../utils/scrollToTop.js';

// Styles
import styled from 'styled-components';
import { primaryOrange } from '../../theme/colors.js'

// Icons
import { ArrowLeft, ArrowRight } from '../../assets/Icons';

function Pagination({ page = 1, setPage, hits }) {
  const [pages, setPages] = useState(page);

  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    if (page !== pages) {
      setPages(page)
    }
  }, [page])

  return (
    <PaginationContainer>
      <PrevButton data-testid="prev-button" disabled={pages <= 1} onClick={() => { setPages(prev => prev - 1); setPage(prev => prev - 1); scrollToTop() }}>
        <ArrowLeft />
      </PrevButton>
      <NumberPage><span>{pages}</span> of <span>{hits ? Math.floor(hits / 10) : ''}</span></NumberPage>
      <NextButton data-testid="next-button" disabled={pages * 10 === hits} onClick={() => { setPages(prev => prev + 1); setPage(prev => prev + 1); scrollToTop() }}>
        <ArrowRight />
      </NextButton>
    </PaginationContainer>
  )
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 250px;
  margin-top: 30px;
`

const PrevButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${primaryOrange};
  color: white;
  border-radius: 50%;
  padding: 7px;
  cursor: pointer;

  &:disabled {
    color: #d6d6d6;
  }
`

const NextButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${primaryOrange};
  color: white;
  border-radius: 50%;
  padding: 7px;
  cursor: pointer;

  &:disabled {
    color: #bebebe;
  }
`

const NumberPage = styled.p`
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 0.05em;
`

export default Pagination
