import { Bar, Label, StyledBarState } from "./style";

export const BarState = ({data}) => {
    return (
        <StyledBarState>
            <Label>{data.name}</Label>
            <Bar state={data.value} color={data.color}></Bar>
        </StyledBarState>
    );
};