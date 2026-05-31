import React from 'react';
import styled from 'styled-components';

const Button = ({label}) => {
  return (
    <StyledWrapper>
      <button>
        <span className="button_top"> {label} </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
      /* Variables */
    --button_radius: 0.75em;
    --button_color: #e8e8e8;
    --button_outline_color: #000000;
    font-size: 17px;
    font-weight: bold;
    border: none;
    border-radius: var(--button_radius);
    background: var(--button_outline_color);
  }

  .button_top {
      /* New variables */
    --gradient-color-1: #8360c3;
    --gradient-color-2: #2ebf91;
    display: block;
    box-sizing: border-box;
    border: 2px solid var(--button_outline_color);
    border-radius: var(--button_radius);
    padding: 0.75em 1.5em;
    background: linear-gradient(to bottom, var(--gradient-color-1), var(--gradient-color-2));
    color: var(--button_outline_color);
    transform: translateY(-0.2em);
    transition: transform 0.1s ease;
  }

  button:hover .button_top {
      /* Pull the button upwards when hovered */
    transform: translateY(-0.33em);
  }

  button:active .button_top {
      /* Push the button downwards when pressed */
    transform: translateY(0);
  }`;

export default Button;
