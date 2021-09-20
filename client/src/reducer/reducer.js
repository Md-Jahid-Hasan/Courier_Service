export const reducer = (state, action) => {
    switch(action.type){
        case 'LOGIN_INFO':
            const data = action.payload
            state.IsAdmin=  data.user.IsAdmin
            state.IsSuperAdmin= data.user.IsSuperAdmin
            console.log(state.IsAdmin)
            console.log(state.IsSuperAdmin)

            return {...state,IsAdmin:state.IsAdmin,IsSuperAdmin:state.IsSuperAdmin}
            
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