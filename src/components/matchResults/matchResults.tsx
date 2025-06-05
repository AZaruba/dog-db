import { Button, Box, Stack } from "@mui/material";
import { Dog } from "../../constants/types";

export interface IMatchResultProps {
  dog: Dog;
  onStartOver: () => void;
}
export function MatchResult(props: IMatchResultProps) {
  return (
    <Box
      padding='16px'
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      alignItems="center"
      height={'75vh'}
    >
      <div style={{justifyContent: 'space-around', paddingTop: '64px'}}>Your new best friend is...</div>
      <h1>{props.dog.name}!</h1>
      <img src={props.dog.img} width={'400px'}  alt={props.dog.name}/>
      <Button onClick={props.onStartOver} style={{width: '200px', margin: '16px' }}>
        Start Over
      </Button>
    </Box>
  )
}