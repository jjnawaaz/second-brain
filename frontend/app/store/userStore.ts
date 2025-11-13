import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { axiosClient } from '../lib/axios-client'


// Forms and Forms Validation Store

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

// SideBar Open Close Store 

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


// Login Logout SignUp Store 

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

// Content Store


export enum ContentType{
   YOUTUBE = 'YOUTUBE',
   LINKEDIN = "LINKEDIN",
   TWEET = "TWEET",
   DOCUMENT = "DOCUMENT"
}

interface ContentState{
    title: string
    description: string
    link: string
    type: ContentType
    tag: string
    tags: string[]
    tagError: string
    error: string

    setError: (error: string)=>void
    setTagError: (tagError: string)=>void
    setTitle: (title: string)=>void
    setDescription: (description: string)=> void
    setLink: (link: string) => void
    setType: (type: ContentType) => void
    setTag: (tag: string) => void
    setTags: (tags: string) => void
    setDeleteTag: (id: number) => void
    resetStore: ()=>void
    getContent: ()=>Promise<{message?: string, success?: boolean, contents?:[{id?:string,title?: string, description?:string, link?: string, type?: ContentType, tags?: string[]}]} | undefined>
    addContent: (data: {title: string, description: string, link: string, type: ContentType, tags: string[]})=>Promise<{message?: string,success?: boolean, content?: {title: string, id: string, description: string, tags: string[],type: ContentType, userId: string}} | undefined>
    updateContent: (data: {title?: string, description?: string, link?: string, type?: ContentType, tags?: string[]})=>Promise<{message?: string,success?: boolean, content?: {title: string, id: string, description: string, tags: string[],type: ContentType, userId: string}} | undefined>
    deleteContent: (id: string) => Promise<{success?: boolean, message?:string} | undefined>
}


export const useContentStore = create<ContentState>()(
    persist(
        (set,get)=>({
            // initial state
                title: '',
                description: '',
                link: '',
                type: ContentType.DOCUMENT, // Default value
                tag: '',
                tags: [],
                tagError: '',
                deleteNo: false,
                deleteYes: false,

            // reset Store
            resetStore: ()=> set({
                title: '',
                description: '',
                link: '',
                type: ContentType.DOCUMENT, // Default value
                tag: '',
                tags: [],
                tagError: '',

            }),

            // set data 
            setTitle: (title: string)=> set(()=>({title: title})),
            setDescription: (description: string) => set(()=>({description: description})),
            setLink: (link: string)=> set(()=>({link: link})),
            setType:(type: ContentType)=>set(()=>({type: type})),
            setTag: (tag: string)=>set(()=>({tag: tag})),
            setTags: (tag: string) => set((state) => {
                // Check if we already have 4 tags
                if (state.tags.length >= 4) {
                    return {
                        tagError: 'Maximum 4 tags allowed'
                    };
                }
                
                // Check if tag is empty
                if (tag.trim() === '') {
                    return {
                        tagError: 'Tag cannot be empty'
                    };
                }
                
                // Check if tag already exists
                if (state.tags.includes(tag.trim())) {
                    return {
                        tagError: 'Tag already exists'
                    };
                }
                
                // Add the tag and clear error
                return {
                    tags: [...state.tags, tag.trim()],
                    tag: '', // Clear the input field
                    tagError: '' // Clear any previous errors
                };
            }),
            setDeleteTag: (id:number)=>set((state)=>({
                tags: state.tags.filter((_,idx:number)=> id !== idx)
            })),

            setTagError: (tagError: string)=>set({tagError: tagError}),
            setError: (error: string)=>set(({error: error})),
            // mutations 


            getContent: async()=>{
                const response = await axiosClient.post('/graphql',{
                    query: `
                        query getContents{
                                    getContents {
                                        message
                                        success
                                        contents {
                                        title
                                        description
                                        link
                                        type
                                        tags
                                        id
                                        }
                                    }
                                }
                    `
                })
                if(response.data.data.getContents.message === false){
                    return {
                        success: response.data.data.getContents.success,
                        message: response.data.data.getContents.message
                    }
                }

                return {
                    success: response.data.data.getContents.success,
                    message: response.data.data.getContents.message,
                    contents: response.data.data.getContents.contents
                }
            },
            addContent: async({title,description,link,type,tags})=>{
                const response = await axiosClient.post('/graphql',{
                    query: `
                    mutation createContent($data: CreateContentInput!) {
                                createContent(data: $data) {
                                message
                                success
                                content {
                                    link
                                    title
                                    id
                                    description
                                    tags
                                    type
                                    userId
                                }
                            }
                        }
                    `,
                    variables: {
                        data: {
                            title: title,
                            description: description,
                            link: link,
                            type: type,
                            tags: tags
                        }
                    }
                })
                if(response.data.data.createContent.success === false){
                    set({
                        title: '',
                        description: '',
                        link: '',
                        type: ContentType.DOCUMENT, // Default value
                        tag: '',
                        tags: [],
                        tagError: '',
                    })
                    return {
                        message: response.data.data.createContent.message,
                        success: response.data.data.createContent.success
                    }
                }
                set({
                        title: '',
                        description: '',
                        link: '',
                        type: ContentType.DOCUMENT, // Default value
                        tag: '',
                        tags: [],
                        tagError: '',
                    })
                return {
                    message: response.data.data.createContent.message,
                    success: response.data.data.createContent.success
                }
            },
            updateContent: ()=>{},
            deleteContent: async(id: string)=>{
                try{
                    const response = await axiosClient.post('/graphql',{
                    query: `
                    mutation deleteContent($id: ID!) {
                        deleteContent(id: $id) {
                            success
                            message
                        }
                        }
                    `,
                    variables: {
                        id: id
                    }
                })

                return {
                    success: response.data.data.deleteContent.success,
                    message: response.data.data.deleteContent.message
                }
                }catch(e){
                    console.error(e)
                }
            }

        }),
        {name: 'content-store'}
    )
)

