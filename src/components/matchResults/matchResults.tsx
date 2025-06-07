import { Button, Box } from "@mui/material";
import { Dog } from "../../constants/types";
import styles from '../../style/global.module.scss';

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
    >
      <div style={{justifyContent: 'space-around', paddingTop: '64px'}}>Your new best friend is...</div>
      <h1 className={styles.pipersPlayroom}>{props.dog.name}!</h1>
      <img src={props.dog.img} className={styles.matchImage} width={'400px'}  alt={props.dog.name}/>
      <Button onClick={props.onStartOver} className={styles.secondaryButton} style={{width: '200px', margin: '16px' }}>
        Start Over
      </Button>
    </Box>
  )
}