import axios from 'axios';
import post from '../../interfaces/Post.interface';

export default class PostHTTP{
    public submitPost = (newPost: post) => new Promise((resolve,reject)=>{
        axios.post('/api/posts',newPost)
            .then(response=>{
                console.log('response ',response);
                resolve(response);
            })
            .catch(error=>{
                console.log('error of submitPost()',error);
                reject(error);
            });
    });
    public getPosts = new Promise<post[]>((resolve,reject)=>{
        axios.get('/api/posts')
            .then(response=>{
                console.log('response of getPosts()',response);
                resolve(response.data.data as post[]);
            })
            .catch(error=>{
                console.log('error of getPosts()',error);
                reject(error);
            });
    });
    public deletePost = (_id: string) => new Promise((resolve,reject)=>{
        axios.delete(`/api/posts/${_id}`)
            .then(response=>{
                console.log('response of deletePost()',response);
                resolve(response);
            })
            .catch(error=>{
                console.log('error of deletePost()',error);
                reject(error);
            });
    });
    public updatePost = (post: post) => new Promise((resolve,reject)=>{
        axios.put(`/api/posts/${post._id}`,{title:post.title,description:post.description})
            .then(response=>{
                console.log('response of editPost()',response);
                resolve(response);
            })
            .catch(error=>{
                console.log('error of updatePost()',error);
                reject(error);
            });
    });
    /*public getPosts = new Promise((resolve)=>{
        axios.get('/api/posts/')
            .then(response=>{
                console.log('response of getPosts()',response);
                return new Promise(response.data as post[]);
            })
            .catch(error=>{
                console.log('error of getPosts()',error);
                return null;
            });
    }*/
}