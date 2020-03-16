import React, { Component , ChangeEvent } from 'react';

import SearchBar from '../../components/UI/SearchBar/SearchBar';
import classes from './PostsWindow.module.css';
import post , { emptyArray } from '../../interfaces/Post.interface';
import PostModal from '../../components/PostModal/PostModal';
import AddEditModalContent from '../../components/PostModal/AddEditModalContent/AddEditModalContent';
import DeleteModalContent from '../../components/PostModal/DeleteModalContent/DeleteModalContent';
import PostHTTP from './PostsWindow.http';
import { withRouter , RouteComponentProps } from 'react-router-dom';
import Posts from '../../components/Posts/Posts';
import queryString from 'query-string';

interface IProps extends RouteComponentProps{
}

enum modalAction{
    none,
    submit,
    edit,
    delete
}

interface IState{
    posts: post[];
    isPostModalOpen: boolean;
    modalActionName: string;
    modalActionDescription: string;
    modalAction: modalAction;
    title: string;
    description: string;
    postIndex: number;
    waitingHttpRequest: boolean;
    searchString: string;
}

class PostsWindow extends Component<IProps,IState>{
    state={
        posts: [...emptyArray],
        isPostModalOpen: false,
        modalActionName: '',
        modalActionDescription: '',
        modalAction: modalAction.none,
        title: '',
        description: '',
        postIndex: -1,
        waitingHttpRequest: false,
        searchString:queryString.parseUrl(this.props.location.search).query.filter as string
    }
    httpInstance: PostHTTP = new PostHTTP(); 
    componentDidMount(){
        // getting data for the first time
        this.httpInstance.getPosts
            .then((fetchedPosts:post[])=>{
                this.setState({
                    posts:fetchedPosts
                });
            })
            .catch(error=>{
                console.log(error);
            });
    }
    openModal = () =>{
        this.setState({
            isPostModalOpen:true
        });
    }
    closeModal = () =>{
        this.setState({
            isPostModalOpen:false,
            modalAction: modalAction.none
        });
    }
    titleHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({title:event.target.value});
    }
    descriptionHandler = (event: ChangeEvent<HTMLInputElement>)=>{
        this.setState({description:event.target.value});
    }
    addHandler = ()=>{
        this.openModal();
        this.setState({
            modalActionName: 'Add Post',
            modalActionDescription: '',
            modalAction: modalAction.submit,
            postIndex:-1,
            title:'',
            description:''
        });
    }
    editHandler = (index: number) =>{
        this.openModal();
        this.setState({
            modalActionName: 'Edit Post',
            modalActionDescription: '',
            modalAction: modalAction.edit,
            postIndex: index,
            title: this.state.posts[index].title,
            description: this.state.posts[index].description
        });
    }
    deleteHandler = (index: number) =>{
        this.openModal();
        this.setState({
            modalActionName: 'Delete Post',
            modalActionDescription: '',
            modalAction: modalAction.delete,
            postIndex: index
        });
    }
    getPostsCopy = () =>{
        return [...this.state.posts];
    }
    updatePostsAndDismissModal = (postsCopy: post[]) =>{
        this.noWaitingHttpRequest();
        this.setState({
            posts: postsCopy,
        });
        this.closeModal();
    }
    waitingHttpRequest = () =>{
        this.setState({
            waitingHttpRequest:true
        });
    }
    noWaitingHttpRequest = ()=>{
        this.setState({
            waitingHttpRequest:false
        });
    }
    continueHandler = () =>{
        this.waitingHttpRequest();
        if(this.state.modalAction=== modalAction.submit || this.state.modalAction === modalAction.edit){
            let postsCopy = this.getPostsCopy();
            let post: post={title:this.state.title,description:this.state.description,_id:''};
            if(this.state.modalAction === modalAction.submit){
                this.httpInstance.submitPost(post)
                    .then(response=>{
                        //console.log('push response:',(response as any).data._id);
                        post._id=(response as any).data._id;
                        postsCopy.push(post);
                        console.log('insertion successfully made',response);
                        this.updatePostsAndDismissModal(postsCopy);
                    })
                    .catch(error=>{
                        console.log('insertion error',error);
                        this.noWaitingHttpRequest();
                    });
            }else if(this.state.postIndex>-1){
                //edit mode
                post._id=postsCopy[this.state.postIndex]._id;
                this.httpInstance.updatePost(post)
                    .then(response=>{
                        console.log('edition successfully made',response);
                        postsCopy[this.state.postIndex].title=this.state.title;
                        postsCopy[this.state.postIndex].description=this.state.description;
                        this.updatePostsAndDismissModal(postsCopy);
                    })
                    .catch(error=>{
                        console.log('edition error',error);
                        this.noWaitingHttpRequest();
                    });
            }
        }else if(this.state.modalAction === modalAction.delete){
            this.httpInstance.deletePost(this.state.posts[this.state.postIndex]._id)
                .then(response=>{
                    console.log('successfully deleted');
                    let postsCopy = this.getPostsCopy();
                    postsCopy.splice(this.state.postIndex,1);
                    this.updatePostsAndDismissModal(postsCopy);
                })
                .catch(error=>{
                    console.log('error while deleting',error);
                    this.noWaitingHttpRequest();
                });
        }
    }
    searchStringHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({
            searchString: event.target.value
        });
    }
    searchHandler = () =>{
        this.props.history.push({
            pathname: '/',
            search: `?filter=${this.state.searchString}` 
        });
    }
    getFilterString = (): string =>{
        let filterString = queryString.parseUrl(this.props.location.search).query.filter as string;
        if(!filterString){
            filterString='';
        }
        return filterString;
    }
    render(){
        let PostModalContent = null;
        
        if(this.state.modalAction===modalAction.delete){
            PostModalContent=<DeleteModalContent/>
        }else if(this.state.modalAction===modalAction.submit || this.state.modalAction === modalAction.edit){
            PostModalContent=
            <AddEditModalContent 
                title={this.state.title} 
                description={this.state.description} 
                titleHandler={(event: ChangeEvent<HTMLInputElement>)=>this.titleHandler(event)}
                descriptionHandler={(event: ChangeEvent<HTMLInputElement>)=>this.descriptionHandler(event)}
            />
        }
        return( 
            <div className={classes.PostsWindow}>
                <SearchBar 
                    style={{float: 'right'}} 
                    value={this.state.searchString} 
                    onChange={(event: ChangeEvent<HTMLInputElement>)=>this.searchStringHandler(event)} 
                    onSearch={this.searchHandler}
                />
                <h1>The posts</h1>
                <Posts 
                    filterString={this.getFilterString()}
                    posts={[...this.state.posts]} 
                    editHandler={this.editHandler} 
                    deleteHandler={this.deleteHandler}
                />
                <div className={classes.Plus} onClick={this.addHandler}></div>
                <PostModal 
                    showModal={this.state.isPostModalOpen} 
                    modalClosed={this.closeModal}
                    cancelAction={this.closeModal}
                    continueAction={this.continueHandler}
                    actionName={this.state.modalActionName}
                    actionDescription={this.state.modalActionDescription}
                    disableActions={this.state.waitingHttpRequest}
                >{PostModalContent}</PostModal>
            </div>
        );
    }
}

export default withRouter(PostsWindow); 