import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { auth } from './firebase';
import './Nav.css';

function Nav({setOpenSignUp, setOpenSignIn, user}) {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        handleShow(true);
      } else handleShow(false);
    })
    return () => {
      window.removeEventListener('scroll');
    }
  }, [])

  return (
    <div className={`app__header ${show ? "app__header--white" : ''}`}>
      <img
        className="app__headerImage"
        alt=""
        src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-249b5.appspot.com/o/images%2Flogo.png?alt=media&token=fd6e4b1d-63d2-42ea-a1fb-0eac49a25fd8"
      />
      <div className="app__authContainer">
      {user ? (
        <Button onClick={() => auth.signOut()}>LogOut</Button>
      ) : (
        <>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
        </>
      )}
      </div>

    </div>
  )
}

export default Nav
