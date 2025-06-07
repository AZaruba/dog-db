import Button from "@mui/material/Button";
import { GetMatch } from "../../utilities/fetchRequest";

export interface IMatchButtonProps {
  dogIds: string[];
  onClick: (id: string) => void;
}
export function MatchButton(props: IMatchButtonProps) {
  const color = props.dogIds.length === 0 ? `rgb(128,128,128)` : `rgb(256,256,256)`;
  return (<Button
   data-testid='match-button'
   disabled={props.dogIds.length === 0}
   style={{
    width: '200px',
    alignSelf: 'center',
    marginRight: '20%',
    color: color,
    borderColor: color
   }}
   variant='outlined'
   onClick={() => {
    GetMatch(props.dogIds).then((matchId) => {
      props.onClick(matchId);
    });
   }}>
    Match!
  </Button>);
}