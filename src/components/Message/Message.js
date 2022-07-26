import PropTypes from 'prop-types';

export default function Message(props) {
  const { mes } = props;

  return (
    <li
      id={mes.id}
      className={
        mes.userID === window.localStorage.getItem('userID')
          ? 'list__item right'
          : 'list__item'}>
      <div className="item__content">{mes.content}</div>
    </li>
  );
}

Message.propTypes = {
  mes: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userID: PropTypes.string,
    content: PropTypes.string.isRequired
  })
}
