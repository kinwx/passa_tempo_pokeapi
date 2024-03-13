import { styled } from "styled-components";

export const StyledBarState = styled.div`
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-column-gap: 1rem;
    align-items: center;
`

export const Label = styled.span`
    padding: .5rem;
    text-transform: uppercase;
    border-right: 1px solid black;
    text-align: right;
    font-size: calc(10px + .4vmin);
`

export const Bar = styled.div`
    --width-bar: ${props => props.state && `${props.state}%`};
    --color-bar: ${props => props.color && props.color};

    height: .4rem;
    width: 95%;
    background-color: #00000016;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    
    &::before {
        position: absolute;
        left: 0;
        width: var(--width-bar);
        content: "";
        height: 100%;
        background-color: var(--color-bar);
        border-radius: 1rem;
    }
`