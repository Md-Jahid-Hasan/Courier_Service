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

        case 'NOTIFICATION ADD':
            state.notification.message = action.payload.message
            state.notification.code = action.payload.code 
            return {...state, message:action.payload.message, code:action.payload.code}
        
        case 'NOTIFICATION CLEAR':
            state.notification.message = ""
            state.notification.code = ""
            return {...state, message:"", code:""}
            
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