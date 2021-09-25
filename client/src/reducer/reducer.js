
export const reducer = (state, action) => {
    switch(action.type){
        case 'LOGIN_INFO':
            const data = action.payload
            state.authenticateUser._id = data.user._id
            state.authenticateUser.Username = data.user.Username
            state.authenticateUser.IsAdmin=  data.user.IsAdmin
            state.authenticateUser.IsSuperAdmin= data.user.IsSuperAdmin
            state.authenticateUser.Email=  data.user.Email
            state.authenticateUser.branch.branch= data.user.branch.branch
            state.authenticateUser.branch.id= data.user.branch._id
            state.authenticateUser.branch.contact= data.user.branch.contact
            console.log(state.authenticateUser.IsAdmin)
            console.log(state.authenticateUser.IsSuperAdmin)
            state.auth.isAuthenticated = true
            return {...state,IsAdmin:state.authenticateUser.IsAdmin,
                                    _id:state.authenticateUser._id,
                                    Username:state.authenticateUser.Username,
                                    IsSuperAdmin:state.authenticateUser.IsSuperAdmin,
                                    Email:state.authenticateUser.Email,
                                    branch:state.authenticateUser.branch.branch
                                }

        case 'NOTIFICATION ADD':
            state.notification.message = action.payload.message
            state.notification.code = action.payload.code 
            return {...state, message:action.payload.message, code:action.payload.code}
        
        case 'NOTIFICATION CLEAR':
            state.notification.message = ""
            state.notification.code = ""
            return {...state, message:"", code:""}
        
        case 'UPDATE_USER':
            state.authenticateUser.Username = action.payload.Username
            state.authenticateUser.Email=  action.payload.Email

            return {...state,
                Username:state.authenticateUser.Username,
                Email:state.authenticateUser.Email,
            }
        
            
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