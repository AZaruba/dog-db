import Button from "@mui/material/Button";
import { GetMatch } from "../../utilities/fetchRequest";
import { Dog } from "../../constants/types";

export interface IMatchButtonProps {
  dogIds: Record<string, Dog>;
  onClick: (id: string) => void;
}
export function MatchButton(props: IMatchButtonProps) {
  const color = Object.keys(props.dogIds).length === 0 ? `rgb(128,128,128)` : `rgb(256,256,256)`;
  return (<Button
   data-testid='match-button'
   disabled={Object.keys(props.dogIds).length === 0}
   style={{
    width: '200px',
    alignSelf: 'center',
    marginRight: '20%',
    color: color,
    borderColor: color
   }}
   variant='outlined'
   onClick={() => {
    GetMatch(Object.keys(props.dogIds)).then((matchId) => {
      props.onClick(matchId);
    });
   }}>
    Match!
  </Button>);
}