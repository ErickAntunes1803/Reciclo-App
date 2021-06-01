const INITIAL_STATE = {
  data: {
    state: false,
  },
};

function showModal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "STATE_COLLECTOR_MINHAS_COLETAS":
      return { ...state, data: { state: action.state } };
      break;

    default:
      return state;
  }
}

export default showModal;
