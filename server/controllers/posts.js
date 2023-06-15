import mongoose from "mongoose";
import postMessage from "../model/postMessage.js";

//! Get posts
export const getPosts = async (req, res, next) => {
    try{
        postMessage.countDocuments(function(err, count) {
            if (err) return handleError(err);
            console.log('there are %d kittens', count);
        });
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);
    }catch(error){
        res.status(error.code).json({message: error.message});
    }
}

export const getPostById = (req, res, next) => {
    res.send(Date());
}

export const createPost = (req, res, next) => {
    const post = req.body;
    const newPost = postMessage(post);

    try {
        newPost.save();
        res.status(201).json(newPost);
    } catch (error){
        res.status(error.code).json({message: error.message});
    }
}

export const editPost = async (req, res, next) => {
    const { id } = req.params;
    const post = req.body;
    console.log(post);
    post._id = id;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
    await postMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(post);
}

export const deletePost = async (req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
    const post = await postMessage.findByIdAndDelete(id);
    res.send(post);
}

export const likePost = async (req, res, next) => {
    const { id } = req.params;
    if (!req.userId) return res.json({message: 'unauthenticated'});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('No post with this id');
    const post = await postMessage.findById(id);

    const index = post.likeCount.findIndex((id) => id === String(req.userId));
    if(index === -1) {
        post.likes.push(userId)
    } else {
        post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });
    res.send(updatedPost);
}