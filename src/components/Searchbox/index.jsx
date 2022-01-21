import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

// Styles
import styled from 'styled-components';
import { primaryOrange } from '../../theme/colors.js'

// Icons
import { SearchIcon } from '../../assets/Icons';

function Searchbox({ setOpen = null }) {
  const navigate = useNavigate();
  const [termSearch, setTermSearch] = useState('');
  const [colorFill, setColorFill] = useState('');

  const handlePropagationColor = (type) => {
    if (type === 'focus') {
      setColorFill(primaryOrange)
    } else if (type === 'hover') {
      setColorFill('#6d6d6d')
    } else {
      setColorFill('#969696')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (setOpen !== null) {
      setOpen(false)
    }
    navigate(`/section/${termSearch}`);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='relative'>
      <Input
        className='input-search'
        data-testid="input-search"
        type="text"
        placeholder="search"
        onFocus={() => handlePropagationColor('focus')}
        onMouseOver={() => handlePropagationColor('hover')}
        onBlur={() => handlePropagationColor('leave')}
        value={termSearch}
        onChange={(e) => setTermSearch(e.target.value)}
        style={setOpen && { color: 'white' }}
      />
      <ButtonBox onClick={(e) => handleSubmit(e)} colorFill={colorFill}>
        <Link to={`/section/${termSearch}`}>
          {SearchIcon()}
        </Link>
      </ButtonBox>
    </form>
  )
}

const Input = styled.input`
  width: 100%;
  border: 2px solid #969696;
  border-radius: 50px;
  padding: 12px 30px;
  background: transparent;

  &:hover {
    border-color: #808080;
  }

  &:focus {
    outline: none !important; 
    border-color: ${primaryOrange};
  }
`

const ButtonBox = styled.button`
  background: transparent;
  position: absolute;
  color: ${({ colorFill }) => colorFill ? colorFill : '#969696'};
  top: 5px;
  right: 5px;
`



export default Searchbox
