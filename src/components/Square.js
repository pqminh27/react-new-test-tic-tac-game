import './Square.css';

const Square = ({value, onClick}) => {
  let classes;
  if (value === 'X') {
    classes = 'square-red';
  } else if (value === 'O') {
    classes = 'square-blue';
  }

  return (
    <button className={`square ${classes}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
