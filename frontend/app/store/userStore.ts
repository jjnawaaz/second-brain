import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosClient } from "../lib/axios-client";

// Forms and Forms Validation Store

type State = {
  name: string;
  email: string;
  password: string;
  error: boolean;
  passwordVisible: boolean;
};

type Action = {
  updateName: (name: State["name"]) => void;
  updateEmail: (email: State["email"]) => void;
  updatePassword: (password: State["password"]) => void;
  updateError: (error: State["error"]) => void;
  updatePasswordVisible: (passwordVisible: State["passwordVisible"]) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  name: "",
  email: "",
  password: "",
  error: false,
  passwordVisible: false,

  updateEmail: (email) => set(() => ({ email })),
  updateName: (name) => set(() => ({ name })),
  updatePassword: (password) => set(() => ({ password })),
  updateError: (error) => set(() => ({ error })),
  updatePasswordVisible: (passwordVisible) => set(() => ({ passwordVisible })),
}));

// SideBar Open Close Store

type ButtonState = {
  sidebarOpen: boolean;
  sidebarMobileOpen: boolean;
};

type ButtonAction = {
  updateSideBarOpen: (sidebarOpen: ButtonState["sidebarOpen"]) => void;
  updateSideBarMobileOpen: (
    sidebarMobileOpoen: ButtonState["sidebarMobileOpen"]
  ) => void;
};

export const useMenuStore = create<ButtonState & ButtonAction>((set) => ({
  sidebarOpen: false,
  sidebarMobileOpen: false,
  updateSideBarOpen: (sidebarOpen) => set(() => ({ sidebarOpen })),
  updateSideBarMobileOpen: (sidebarMobileOpen) =>
    set(() => ({ sidebarMobileOpen })),
}));

// Login Logout SignUp Store

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string;
  username?: string;

  setAuthError: (authError: string) => void;
  login: (data: {
    email: string;
    password: string;
  }) => Promise<{ success?: boolean; message?: string } | undefined>;
  logout: () => Promise<{ success?: boolean; message?: string } | undefined>;
  signup: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<{ success?: boolean; message?: string } | undefined>;
  getUser: () => Promise<
    { success: boolean; message: string; name?: string } | undefined
  >;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isLoading: false,
      authError: "",
      username: undefined,

      setAuthError: (authError) => set(() => ({ authError })),

      login: async (data) => {
        set({ isLoading: true });
        try {
          const response = await axiosClient.post("/graphql", {
            query: `mutation SignInUser($data: SignInInput!){
              signinUser(data: $data) {
                success
                message
              }
            }`,
            variables: { data },
          });
          console.log(response);
          const result = response?.data?.data?.signinUser;

          if (!result) {
            set({
              isAuthenticated: false,
              authError: "Login failed",
              isLoading: false,
            });
            return { success: false, message: "Login failed" };
          }

          if (result.success === false) {
            set({
              isAuthenticated: false,
              authError: result.message,
              isLoading: false,
            });
            return { success: result.success, message: result.message };
          }

          set({ isAuthenticated: true, isLoading: false });
          return { success: result.success, message: result.message };
        } catch (e) {
          console.error(e);
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        const response = await axiosClient.post("/graphql", {
          query: `
            mutation logoutUser{
              logoutUser {
                message
                success
              }
            }`,
        });

        const result = response?.data?.data?.logoutUser;
        set({ isAuthenticated: false, isLoading: false });
        return { success: result?.success, message: result?.message };
      },

      signup: async (data) => {
        set({ isLoading: true, isAuthenticated: false });
        try {
          const response = await axiosClient.post("/graphql", {
            query: `
              mutation userSignUp($data: SignUpInput!){
                signupUser(data: $data) {
                  message
                  success
                }
              }`,
            variables: { data },
          });

          const result = response?.data?.data?.signupUser;

          if (!result) {
            set({ isLoading: false, authError: "Signup failed" });
            return { success: false, message: "Signup failed" };
          }

          if (result.success === false) {
            set({ isLoading: false, authError: result.message });
            return { success: result.success, message: result.message };
          }

          set({ isAuthenticated: true, isLoading: false });
          return { success: result.success, message: result.message };
        } catch (e) {
          console.error(e);
          set({ isLoading: false });
        }
      },

      getUser: async () => {
        const response = await axiosClient.post("/graphql", {
          query: `
            query getUser{
              getUser {
                success
                message
                user {
                  name
                }
              }
            }`,
        });

        const result = response?.data?.data?.getUser;

        if (result?.success) {
          set({ username: result.user.name });
        }

        return {
          success: result?.success,
          message: result?.message,
          name: result?.user?.name,
        };
      },
    }),
    { name: "auth-store" }
  )
);

// Content Store

export enum ContentType {
  YOUTUBE = "YOUTUBE",
  LINKEDIN = "LINKEDIN",
  TWEET = "TWEET",
  DOCUMENT = "DOCUMENT",
  ALL = "ALL",
}

interface ContentState {
  title: string;
  description: string;
  link: string;
  type: ContentType;
  tag: string;
  tags: string[];
  tagError: string;
  error: string;

  setError: (error: string) => void;
  setTagError: (tagError: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setLink: (link: string) => void;
  setType: (type: ContentType) => void;
  setTag: (tag: string) => void;
  setTags: (tags: string) => void;
  setDeleteTag: (id: number) => void;
  resetStore: () => void;
  getContent: () => Promise<
    | {
        message?: string;
        success?: boolean;
        contents?: {
          id?: string;
          title?: string;
          description?: string;
          link?: string;
          type?: ContentType;
          tags?: string[];
        }[];
      }
    | undefined
  >;
  addContent: (data: {
    title: string;
    description: string;
    link: string;
    type: ContentType;
    tags: string[];
  }) => Promise<
    | {
        message?: string;
        success?: boolean;
        content?: {
          title: string;
          id: string;
          description: string;
          tags: string[];
          type: ContentType;
          userId: string;
        };
      }
    | undefined
  >;
  updateContent: (
    id: string,
    data: {
      title: string;
      description: string;
      link: string;
      type: ContentType;
      tags: string[];
    }
  ) => Promise<{ message?: string; success?: boolean } | undefined>;
  deleteContent: (
    id: string
  ) => Promise<{ success?: boolean; message?: string } | undefined>;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      title: "",
      description: "",
      link: "",
      type: ContentType.DOCUMENT,
      tag: "",
      tags: [],
      tagError: "",
      error: "",

      resetStore: () =>
        set({
          title: "",
          description: "",
          link: "",
          type: ContentType.DOCUMENT,
          tag: "",
          tags: [],
          tagError: "",
        }),

      setTitle: (title) => set(() => ({ title })),
      setDescription: (description) => set(() => ({ description })),
      setLink: (link) => set(() => ({ link })),
      setType: (type) => set(() => ({ type })),
      setTag: (tag) => set(() => ({ tag })),
      setTagError: (tagError) => set({ tagError }),
      setError: (error) => set({ error }),

      setTags: (tag) =>
        set((state) => {
          if (state.tags.length >= 4) {
            return { tagError: "Maximum 4 tags allowed" };
          }
          if (tag.trim() === "") {
            return { tagError: "Tag cannot be empty" };
          }
          if (state.tags.includes(tag.trim())) {
            return { tagError: "Tag already exists" };
          }
          return {
            tags: [...state.tags, tag.trim()],
            tag: "",
            tagError: "",
          };
        }),

      setDeleteTag: (id) =>
        set((state) => ({
          tags: state.tags.filter((_, idx) => idx !== id),
        })),

      getContent: async () => {
        const response = await axiosClient.post("/graphql", {
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
            }`,
        });

        return response.data.data.getContents;
      },

      addContent: async ({ title, description, link, type, tags }) => {
        const response = await axiosClient.post("/graphql", {
          query: `
            mutation createContent($data: CreateContentInput!) {
              createContent(data: $data) {
                message
                success
              }
            }`,
          variables: { data: { title, description, link, type, tags } },
        });

        set({
          title: "",
          description: "",
          link: "",
          type: ContentType.DOCUMENT,
          tag: "",
          tags: [],
          tagError: "",
        });

        return response.data.data.createContent;
      },

      updateContent: async (id, data) => {
        const response = await axiosClient.post("/graphql", {
          query: `
            mutation updateContent($id: ID!, $data: UpdateContentInput!) {
              updateContent(id: $id, data: $data) {
                success
                message
              }
            }`,
          variables: { id, data },
        });

        return response.data.data.updateContent;
      },

      deleteContent: async (id) => {
        const response = await axiosClient.post("/graphql", {
          query: `
            mutation deleteContent($id: ID!) {
              deleteContent(id: $id) {
                success
                message
              }
            }`,
          variables: { id },
        });

        return response.data.data.deleteContent;
      },
    }),
    { name: "content-store" }
  )
);
