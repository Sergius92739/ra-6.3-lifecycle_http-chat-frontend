import React from "react";
import Message from "../Message/Message";
import PropTypes from 'prop-types';

const MesList = React.forwardRef((props, ref) => (
  <ul ref={ref} className="app__mes-list list">
    {props.messages.map((mes) => <Message key={mes.id} mes={mes} />)}
  </ul>
));

MesList.propTypes = {
  messages: PropTypes.array.isRequired
}

export default MesList;
