import {fontSize1, greenBoxShadow, backgroundColor2, fontSize3} from './Style'
import styled, {css} from 'styled-components'

export const ConfirmButton = styled.div`
    margin:20px;    
    color:#1163c9;
    ${fontSize1}
    font-family: Exo 2, sans-serif;
    color:#42ff3a;
    padding:5px;
    &:hover{
        ${greenBoxShadow}
        cursor:pointer;
    }
`