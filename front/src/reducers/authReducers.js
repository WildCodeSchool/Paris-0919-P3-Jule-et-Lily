export  default  function (state  = {}, action) {
    switch (action.type) {
        case  "CREATE_SESSION":
            return { ...state, token:  action.token, login:action.user ? action.user[0].user_login : '' }
        case "UNSET_SESSION":
            return {...state, token: '', login: ''}
        default:
            return  state;
    }
}