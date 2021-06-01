const INITIAL_STATE = {
  data: {
    state: false,
  },
};

function showModal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "STATE_MODAL":
      return { ...state, data: { state: action.state } };

    default:
      return state;
  }
}

export default showModal;
