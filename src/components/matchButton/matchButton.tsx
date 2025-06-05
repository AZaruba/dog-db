import Button from "@mui/material/Button";
import { GetMatch } from "../../utilities/fetchRequest";

export interface IMatchButtonProps {
  dogIds: string[];
  onClick: (id: string) => void;
}
export function MatchButton(props: IMatchButtonProps) {
  return (<Button
   data-testid='match-button'
   disabled={props.dogIds.length === 0}
   style={{width: '200px'}}
   onClick={() => {
    console.log(props.dogIds);
    GetMatch(props.dogIds).then((matchId) => {
      props.onClick(matchId);
    });
   }}>
    Match!
  </Button>);
}