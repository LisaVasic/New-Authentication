// In this component there is a lot of code commented out. 
// We didn't make it work but if we had more time we wanted to giv it a try

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "reducers/user";
import { useNavigate } from "react-router-dom";
import { Buttons } from '../GlobalStyles'
import { InnerWrapper } from '../GlobalStyles';
import { OuterWrapper } from '../GlobalStyles';
import { Image } from '../GlobalStyles';
import { Headline, TextInput } from '../GlobalStyles';
// import { movies } from "reducers/movies";
// import { API_URL } from "utils/utils";

export const Main = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();

// Since main-page is an authenticated endpoint you only access it if you have a valid accesstoken
// If user don't provide valid accesstoken they are redirected to login-page
        useEffect( () => {
            if (!accessToken) {
                navigate("/login");
            }
        }, []);

  return (
    <OuterWrapper>
        <InnerWrapper>
            <Image />
            <Headline><span>XXXX</span></Headline>
            <h2>xxxx </h2>
            <Buttons
                type="button"
                onClick={() => {
                dispatch(user.actions.setAccessToken(null));
                navigate("/login");
                }}> 
                Log Out
            </Buttons>
        </InnerWrapper>
    </OuterWrapper>
  );
}