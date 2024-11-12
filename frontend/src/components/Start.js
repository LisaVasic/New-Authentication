import React from "react";
import styled from 'styled-components/macro'
import { Buttons } from '../GlobalStyles'
import { InnerWrapper } from '../GlobalStyles';
import { OuterWrapper } from '../GlobalStyles';
import { Headline } from '../GlobalStyles';
import { Image } from '../GlobalStyles';
import { Link } from 'react-router-dom'

export const Start = () => {
    return (
        <OuterWrapper>
        <InnerWrapper>
            <Image />
            <Headline><span>XXX</span></Headline>
            <Text>xxx</Text>
            <ButtonLink to="/register">
                <Buttons type="button">Sign up</Buttons>
            </ButtonLink>
            <Text>Already a member? Log in to your account.</Text>
            <ButtonLink to="/login">
                <Buttons type="button">Log in</Buttons>
            </ButtonLink>
        </InnerWrapper>
        </OuterWrapper>
      );
    }
    
    
    const ButtonLink = styled(Link)`
     width: 100%;
    `;
    
    const Text = styled.p`
     color: white;
    `;
    