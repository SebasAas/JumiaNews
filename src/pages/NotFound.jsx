import React from 'react'
import { Link } from 'react-router-dom'
// Styles
import styled from 'styled-components';

import { primaryOrange, white } from '../theme/colors'

function NotFound() {
  return (
    <div className="flex justify-center items-center flex-column min-vh-100">
      <Error>
        <h2>404</h2>
      </Error>
      <Title>We couldn't find that page</Title>
      <Button>
        <Link to={'/'}>Return to home</Link>
      </Button>
    </div>
  )
}

const Button = styled.button`
  background: ${primaryOrange};
  margin-top: 20px;
  padding: 12px 28px;
  color: ${white};
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.825rem;

`

const Error = styled.div`
  display: flex;
  position: relative;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  overflow: hidden;

  h2 {
    font-size: 120px
  }
`

const Title = styled.h1`
  position: relative;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 2.25rem;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1.875rem;
  padding-top: 10px;

  &:after {
    content: '';
    position: absolute;
    top: 0; 
    right: 0; 
    left: 0; 
    margin-left: auto; 
    margin-right: auto;
    width: 15%;
    height: 3px;
    border-radius: 2px;
  }
`

export default NotFound
