import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { axiosClient } from '../lib/axios-client'

type State = {
    name: string
    email:string
    password: string
    error: boolean
    passwordVisible: boolean
}

type Action = {
    updateName: (name: State['name'])=>void,
    updateEmail: (email: State['email'])=>void,
    updatePassword: (password: State['password'])=>void
    updateError: (error: State['error']) => void
    updatePasswordVisible: (passwordVisible: State['passwordVisible']) => void
}

export const useUserStore = create<State & Action>((set)=>({
    name:'',
    email:'',
    password:'',
    error:false,
    passwordVisible: false,
    updateEmail:(email) => set(()=>({email: email})),
    updateName: (name) => set(()=>({name: name})),
    updatePassword:(password)=> set(()=>({password: password})),
    updateError: (error) => set(()=>({error: error})),
    updatePasswordVisible: (passwordVisible) => set(()=>({passwordVisible: passwordVisible}))
}))



type ButtonState = {
    sidebarOpen: boolean
     sidebarMobileOpen : boolean
}

type ButtonAction = {
    updateSideBarOpen: (sidebarOpen: ButtonState['sidebarOpen']) => void
    updateSideBarMobileOpen: (sidebarMobileOpoen: ButtonState['sidebarMobileOpen']) => void
}

   

export const useMenuStore = create<ButtonState & ButtonAction>((set)=>({
    sidebarOpen: false,
    sidebarMobileOpen: false,
    updateSideBarOpen: (sidebarOpen) => set(()=>({sidebarOpen: sidebarOpen})),
    updateSideBarMobileOpen: (sidebarMobileOpen) => set(()=>({sidebarMobileOpen: sidebarMobileOpen}))
}))



interface AuthState {
    // States
    isAuthenticated: boolean
    isLoading: boolean
    authError: string

    // Actions
    setAuthError: (authError: string)=>void
    login: (data: {email:string, password:string})=>Promise<{success?:boolean, message?:string} | undefined> 
    logout: ()=>Promise<{success?: boolean,message?: string} | undefined>
    signup: (data: {email:string, password: string, name: string})=>Promise<{success?:boolean, message?: string} | undefined>
    // checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set,get)=>({
            isAuthenticated: false,
            isLoading: false,
            authError: '',
            setAuthError: (authError) => set(()=>({authError: authError})),
            login: async(data: {email: string, password: string}) => {
                set({isLoading: true})

                // make api call 
                try{
                    const response = await axiosClient.post('/graphql',{
                    query: `mutation SignInUser($data: SignInInput!){
                            signinUser(data: $data) {
                            success,
                            message,
                             }
                            }`
                            ,
                variables: {
                            data: {
                                email: data.email,
                                password: data.password
                            }
                    }
                })
                if(response.data.data.signinUser.success === false){
                    set({
                        isAuthenticated: false,
                        authError: response.data.data.signinUser.message,
                        isLoading: false
                    })
                    return {
                        message: response.data.data.signinUser.message,
                        success: response.data.data.signinUser.success
                    }
                }
                set({isLoading: false, isAuthenticated: true})
                return {
                    message: response.data.data.signinUser.message,
                    success: response.data.data.signinUser.success
                }
                }catch(e){
                    console.error(e)
                }
            },
            logout: async()=>{
                set({isLoading: true})
                const response = await axiosClient.post('/graphql',{
                    query: `
                    mutation logoutUser{
                                        logoutUser {
                                        message,
                                        success
                                    }
                                }`
                })
                console.log(response.data.data.logoutUser)
                if(response.data.data.logoutUser.success === false) {
                    set({isLoading: false})
                    return {
                        message: "Invalid error"
                    }
                }
                set({isAuthenticated: false})
                return {
                    success: response.data.data.logoutUser.success,
                    message: response.data.data.logoutUser.message
                }
            },
            signup: async(data: {name: string, email: string, password: string})=>{
                set({isLoading: true, isAuthenticated: false})
                try{
                    const response = await axiosClient.post('/graphql',{
                    query: `
                    mutation userSignUp($data: SignUpInput!){
                            signupUser(data: $data) {
                                message,
                                success,
                                token
                            }
                        }
                    `,
                variables: {
                    data: {
                        email: data.email,
                        password: data.password,
                        name: data.name
                    }
                }
                })
                console.log(response.data.data.signupUser)
                // check if the user signedUp
                if(response.data.data.signupUser.success === false){
                    set({
                        isLoading: false,
                        authError: response.data.data.signupUser.message
                    }) 
                    return {
                        success: response.data.data.signupUser.success,
                        message: response.data.data.signupUser.message,

                    }
                }
                set({isAuthenticated: true}) 
                return {
                     success: response.data.data.signupUser.success,
                        message: response.data.data.signupUser.message,
                }
                }catch(e){
                console.error(e)
            }
            }
        }),
        {name:'auth-store'}
    )
)





