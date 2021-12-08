import styled from 'styled-components';

const Button = styled.button<{ primary: boolean }>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? '#01696E' : 'white')};
  color: ${(props) => (props.primary ? 'white' : '#01696E')};

  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1.25em;
  border: 2px solid;
  border-color: #01696e;
  font-weight: bold;
  border-radius: 5px;
`;

export default Button;
