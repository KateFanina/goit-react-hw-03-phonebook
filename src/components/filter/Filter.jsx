import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  color: #2a2a2a;
  font-size: 18px;
  margin-bottom: 20px;
  &:focus {
    outline-color: #2196f3;
  }
`;

const FindName= styled.div`
  font-size: 22px;
`;

const Filter = props => {
  const { handleFilter } = props;
  return (
    <>
      <FindName>Find contact by name or number</FindName>
      <Input type="text" onChange={handleFilter} />
    </>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};
export default Filter;
