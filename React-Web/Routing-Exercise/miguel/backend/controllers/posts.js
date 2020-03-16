const Post = require('../models/post');


exports.savePost = (req,res,next) =>{
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    post
        .save()
        .then(createdPost =>{
            res.status(201).json({
                message: 'Post added successfully',
                _id:createdPost._id
            });
        }).catch(error=>{
            console.log('error in saving post',error);
            res.status(500).json({
                message: 'Creating Post Failed'
            });
        });
}
exports.getPosts = (req,res,next) =>{
    Post.find({})
        .then(data=>{
            console.log('data found',data);
            res.status(200).json({message:'data found successfully',data:data});
        })
        .catch(error=>{
            console.log('error in finding data');
            res.status(500).json({message:'error in findin data'});
        });
}

exports.removePost = (req,res,next) =>{
    console.log(req.params.id);
    Post.findByIdAndRemove({_id: req.params.id})
        .then(result=>{
            console.log(result);
            res.status(200).json({message:'post removed successfully'});
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({message:'error in removing post'});
        });
}

exports.updatePost = (req,res,next) =>{
    console.log(req.params.id);
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description
    });
    Post.updateOne({_id:req.params.id},post)
        .then(result=>{
            console.log('result of update: ',result);
            res.status(200).json({message:'post updated'});
        })
        .catch(error=>{
            console.log('error in update: ',error);
            res.status(500).json({meesage:'error in update'});
        });
    
}