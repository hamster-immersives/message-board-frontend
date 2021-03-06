import React from 'react';

export default React.createContext({
    isAuth: false,
    user: null,
    handleSignin: () => {},
    logout: () => {},
    posts: [],
    getAllPosts: () => {},
    createPost: () => {},
    deletePostByID: () => {}
});