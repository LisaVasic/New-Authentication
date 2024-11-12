import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Buttons } from '../GlobalStyles'
import { InnerWrapper } from '../GlobalStyles';
import { OuterWrapper } from '../GlobalStyles';
import { Image } from '../GlobalStyles';
import { Headline, TextInput, Form, Label } from '../GlobalStyles';
import { API_URL } from 'utils/utils';
import { user } from 'reducers/user';

export const LogIn = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  //If user is validated they will navigate to /main
  useEffect( () => {
    if (accessToken){
      navigate("/main")
    }
  }, [accessToken])
  
  // When login form is submitted the data is sent and compared to registered users in database
  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({username: username, password: password})
    }
    fetch(API_URL("login"), options)
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        batch(()=>{
          dispatch(user.actions.setUsername(data.response.username))
          dispatch(user.actions.setUserId(data.response.id))
          dispatch(user.actions.setAccessToken(data.response.accessToken))
          dispatch(user.actions.setError(null))
        })
      } else {
        batch(()=>{
          dispatch(user.actions.setUsername(null))
          dispatch(user.actions.setUserId(null))
          dispatch(user.actions.setAccessToken(null))
          dispatch(user.actions.setError(data.response))
        })
      }
    })
  }




  return (
    <OuterWrapper>
    <InnerWrapper>
        <Image />
        <Headline><span>Log in</span></Headline>
          <Form onSubmit={onFormSubmit}>
            <Label htmlFor="username">Username:</Label>
            <TextInput 
              type="text" 
              id="username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              name="username" 
              placeholder="username" />
            <Label htmlFor="password">Password:</Label>
            <TextInput 
              type="password" 
              id="password"               
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              name="password" 
              placeholder="password" />
            <Buttons type="submit">Log in</Buttons>
          </Form> 
      </InnerWrapper>
    </OuterWrapper>
  );
  }