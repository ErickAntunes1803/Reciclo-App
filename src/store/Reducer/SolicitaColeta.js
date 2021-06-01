const INITIAL_STATE = {
  data: {
    state: false,
    newAddress: false,
    confirm: false,
  },
};

function showModal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "STATE_SOLICITA_COLETA":
      return { ...state, data: { state: action.state } };

    case "STATE_SOLICITA_NEW_ADDRESS":
      return { ...state, data: { newAddress: action.newAddress } };

    case "STATE_COLETA_SOLICITADA":
      console.log("STATE_COLETA_SOLICITADA ", action);
      return { ...state, data: { confirm: action.confirm } };

    default:
      return state;
  }
}

export default showModal;
