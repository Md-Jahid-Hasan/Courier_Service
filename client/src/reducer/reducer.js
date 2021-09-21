export const reducer = (state, action) => {
    switch(action.type){
        case 'LOGIN_INFO':
            const data = action.payload
            state.authenticateUser.IsAdmin=  data.user.IsAdmin
            state.authenticateUser.IsSuperAdmin= data.user.IsSuperAdmin
            console.log(state.authenticateUser.IsAdmin)
            console.log(state.authenticateUser.IsSuperAdmin)
            state.auth.isAuthenticated = true
            return {...state,IsAdmin:state.authenticateUser.IsAdmin,
                                    IsSuperAdmin:state.authenticateUser.IsSuperAdmin}
            
        default:
            return {...state}

    }
    
}
// Email:"",
//         IsAdmin:Boolean,
//         IsSuperadmin:Boolean,
//         branch:{
//             branch:"",
//             contact:"",
//             id:""
//         }