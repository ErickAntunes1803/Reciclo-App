const INITIAL_STATE = {
    data: {
        token: false
    }
}

function setToken(state = INITIAL_STATE, action)
{   
    switch (action.type)
    {
        case 'SET_TOKEN':
        return {...state, data:{ token: action.token}};
        break;

        case 'CLEAR_TOKEN':
        return {...state};
        break;

        default:
        return state;
    }
}

export default setToken;