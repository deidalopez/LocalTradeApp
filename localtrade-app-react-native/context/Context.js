import React, { createContext, useState } from 'react';

export const UserContext = createContext()

export const Provider = (props) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emal: '',
    password: '',
    // location: null
  });

  const [isAuth, setIsAuth] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [idOfUser, setIdOfUser] = useState(0);
  return (
    <UserContext.Provider value={{
      user: user,
      setUser: setUser,
      isAuth: isAuth,
      setIsAuth: setIsAuth,
      allPosts: allPosts,
      setAllPosts: setAllPosts,
      idOfUser: idOfUser,
      setIdOfUser: setIdOfUser
    }}>
      {props.children}
    </UserContext.Provider>
  )
}
