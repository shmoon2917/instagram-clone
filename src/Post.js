import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import firebase from 'firebase';

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        console.log('onSnapshot in post');
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }
    return () => {
      unsubscribe();
    }
  }, [postId]);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text: commentInput,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setCommentInput('');
  }

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Sangho"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img alt="postimg" className="post__image" src={imageUrl} />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment, index) => (
          <p key={index}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
        <input 
          className="post__commentInput"
          type="text"
          placeholder="Add a comment.."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          className="post__commentButton"
          // disabled={!commentInput}
          type="submit"
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
      )}

    </div>
  );
}

export default Post;
