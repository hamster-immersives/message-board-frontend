import Axios from './Axios/Axios';
import jwt_decode from 'jwt-decode';
import { createBrowserHistory } from 'history';
import setAuthToken from '../lib/Axios/setAuthToken';

export const checkTokenAuth = () => {
    
    let jwtToken = localStorage.getItem('jwtToken-reddit');

    if (jwtToken) {
        
        let decoded = jwt_decode(jwtToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            localStorage.removeItem('jwtToken-reddit');
            //window.location.href = '/sign-in'; 
            //forcing browser to do a hard reload
            createBrowserHistory().push('/sign-in') 
            //equals the same as this.props.history
            setAuthToken(null)
        } else {
            setAuthToken(jwtToken)
            return decoded;
        }
    }
}


export const signup = async userInfo => {
    try {
        let success = await Axios.post('/api/users/sign-up', userInfo)
        //return success; 
        return success.data; 
        //return Promise.resolve(success.data);
       } catch (e) {
        //return e.response;
        return e.response.data.message
        //return Promise.reject(e.response.data.message);
       }
}

export const signin = async userInfo => {

    try {

        let success = await Axios.post('/api/users/sign-in', userInfo)

        const { token } = success.data; 
        localStorage.setItem('jwtToken-reddit', token);
        let decodedJWT = jwt_decode(token);
        return decodedJWT;
    } catch (e) {
        return e.response.data.message;
    }

}

export const createPost = async postInfo => {
    try {
        let success = await Axios.post('/api/post/create-post', postInfo);
        return success.data;
    } catch (e) {
        return e.response.message;
    }
}

export const getAllPosts = async () => {
    let jwtToken = localStorage.getItem('jwtToken-reddit');
    checkTokenAuth(jwtToken);
    try {

        let success = await Axios.get('/api/post/get-all-posts');

        return success.data;

    } catch (e) {
        return e;
    }
}

export const deletePostByID = async (postID) => {

    try {
        let success = await Axios.delete(`/api/post/delete-post-by-id/${postID}`)
        return success.data;
    } catch (e) {
        return e.response.message;
    }

}

export const addCommentToPostByID = async (commentData) => {

    try {
        let success = await Axios.post(`/api/post/add-comment-by-post-id`, commentData);
   
        return success.data;
    } catch (e) {
        console.log(e.response.message)
        return e.response.message;
    }

}

export const deleteCommentByID = async (postID, commentID) => {
    try {
        let success = await Axios.delete(`/api/post/delete-comment-by-id/${postID}/${commentID}`);
        return success.data.comments;
    } catch (e) {
        return e.response.message;
    }

}

export const likeButton = async (postID) => {
    try {
        let success = await Axios.put('/api/post/like-post-by-id', {postID});
        return success.data;
    } catch (e) {
        return e.response.message;
    }
}

export const unlikeButton = async (postID) => {
    try {
        let success = await Axios.put('/api/post/unlike-post-by-id', {postID});
        return success.data;
    } catch (e) {
        return e.response.message;
    }
}

export const getAllUsers = async () => {
    try {

        let success = await Axios.get(`/api/users/get-all-users`);
        return success.data;
    } catch (e) {
        return e.response.message;
    }
}

export const followUser = async (user) => {

    try {
        let success = await Axios.put(`/api/users/follow-user`, {user});
        return success.data;
    } catch (e) {
        return e.response.message;
    }

}

export const getUserFollowerAndFollowing = async () => {
    try {
        let success = await Axios.get('/api/users/get-user-follower-and-following');
        return success.data;
    } catch (e) {   
        return e.response.message;
    }
}