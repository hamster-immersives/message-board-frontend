import React, { Component } from 'react'
import Post from '../PostList/Post';
import { getAllPosts } from '../lib/api';
import Context from '../Context/Context';

export default class PostList extends Component {

    static contextType = Context;

    
    render() {
        return (
            <div>
                {
                    this.context.posts.map((item, i) => {
                        return <Post post={item}  key={item._id}/>
                    })
                }
            </div>
        )
    }
}
