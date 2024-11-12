import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Buttons } from '../GlobalStyles'
import { InnerWrapper } from '../GlobalStyles';
import { OuterWrapper } from '../GlobalStyles';
import { Image } from '../GlobalStyles';
import { Headline, TextInput, Form, Label } from '../GlobalStyles';
import { API_URL } from 'utils/utils';
import { user } from 'reducers/user';

export const Register = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  //when new user is validated and created they will navigate to /main
  useEffect( () => {
    if (accessToken){
      navigate("/main")
    }
  }, [accessToken])

  // When registration form is submitted the data in sent and stored at register-endpoint in database
  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted')
    const options = {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({username: username, password: password})
    }
    fetch(API_URL("register"), options)
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
        <Headline><span>Sign up</span></Headline>
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
            <Buttons type="submit">Create account</Buttons>
          </Form> 
      </InnerWrapper>
    </OuterWrapper>
  );
  }




// import React from 'react';
// import { Buttons } from '../GlobalStyles'
// import { InnerWrapper } from '../GlobalStyles';
// import { OuterWrapper } from '../GlobalStyles';
// import { Batman } from '../GlobalStyles';
// import { Headline, TextInput, Form, Label } from '../GlobalStyles';

// export const SignUp = () => {
//   return (
//     <OuterWrapper>
//     <InnerWrapper>
//         <Batman />
//         <Headline><span>Sign up</span></Headline>
//           <Form>
//             <Label htmlFor="username">Username:</Label>
//             <TextInput type="text" id="username" name="username" placeholder="username" />
//             <Label htmlFor="password">Password:</Label>
//             <TextInput type="password" id="password" name="password" placeholder="password" />
//             <Buttons type="submit" value="Create account">Create account</Buttons>
//           </Form> 
//       </InnerWrapper>
//     </OuterWrapper>
//   );
// }