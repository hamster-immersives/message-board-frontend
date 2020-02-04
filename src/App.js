import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { indigo, pink } from '@material-ui/core/colors';
import MainRouter from './MainRouter';
import Context from './components/Context/Context';
import { checkTokenAuth, getAllPosts } from './components/lib/api'

import Spinner from './components/Spinner/Spinner';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757de8',
      main: '#3f51b5',
      dark: '#002984',
      contrast: '#fff'
    }, 
    secondary: {
      light: '#ff79b0', 
      main: '#ff4081', 
      dark: '#c60055', 
      contrastText: '#000'
    }
  },
  openTitle: indigo['400'],
  protectedTitle: pink['400'],
  type: 'light'
})

export default class App extends Component {

  state = {
    isAuth: false,
    user: null,
    posts: []
  }

  async componentDidMount() {
    let user = checkTokenAuth()

    if (user) {
      this.handleSignin(user)
   
    } 
  }


  getAllPosts = (posts) => {
    this.setState({
      posts
    })
  }

  createPost = (post) => {
    let newPostArray = [post, ...this.state.posts];
    this.setState({
      posts: newPostArray
    })
  }

  handleSignin = (userInfo) => {
    this.setState({
      isAuth: true, 
      user: {
        username: userInfo.username,
        id: userInfo.id,
        userCreated: userInfo.userCreated
      }
    })
  }

  logout = () => {
    this.setState({
      isAuth: false, 
      user: null
    })
    localStorage.removeItem('jwtToken-reddit')
  }

  deletePostByID = (deletedPost) => {
    let filteredArray = this.state.posts.filter(post => deletedPost._id !== post._id);
    this.setState({
      posts: filteredArray
    })
  }

  updatePostArray = (post) => {

    let copiedArray = Object.assign(this.state.posts, []);

    

    copiedArray.forEach(postItem => postItem._id === post._id ? postItem.likes = post.likes : '');
    this.setState({
      posts: copiedArray
    })

  }

  render() {
    return (
      <Context.Provider
        value={{
          isAuth: this.state.isAuth,
          user: this.state.user,
          handleSignin: this.handleSignin,
          logout: this.logout,
          posts: this.state.posts,
          getAllPosts: this.getAllPosts,
          createPost: this.createPost,
          deletePostByID: this.deletePostByID,
          updatePostArray: this.updatePostArray
        }}
      >
        <Router>

          <React.Suspense fallback={<Spinner />}>
            <MuiThemeProvider theme={theme}>
              <MainRouter theme={theme} />
            </MuiThemeProvider>
          </React.Suspense>
        </Router> 
        
      </Context.Provider>     
    )
  }
}
