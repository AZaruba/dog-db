import { AccordionDetails, AccordionSummary, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../../style/global.module.scss';
import { useState } from "react";

export function Tutorial() {
  const [expanded, setExpanded] = useState<string>();

  function onAccordionClick(panelName: string, isExpanded: boolean) {
    setExpanded(isExpanded ? panelName : undefined);
  }

  return (
  <>
    <Accordion 
     style={{width: '100%'}}
     expanded={expanded === 'tutorial-panel'} onChange={(_e, expanded) => {
      onAccordionClick('tutorial-panel', expanded);
     }}>
      <AccordionSummary
      expandIcon={<ExpandMoreIcon/>}
      id='tutorial-panel'
      className={styles.pipersRegular}
      style={{
        fontSize: '24px',
        width: '100%'
      }}
      >How does it work?
      </AccordionSummary>
      <AccordionDetails>
        <div>- Click on any dogs you might like to be matched with</div>
        <div>- Filter by breed, age, or location</div>
        <div>- Hit "Match" and be matched with your new best friend!</div>
      </AccordionDetails>
    </Accordion>
    <Accordion 
     style={{width: '100%'}}
     expanded={expanded === 'casey-panel'} onChange={(_e, expanded) => {
      onAccordionClick('casey-panel', expanded);
     }}>
      <AccordionSummary
      expandIcon={<ExpandMoreIcon/>}
      id='casey-panel'
      className={styles.pipersRegular}
      style={{
        justifyContent: 'center',
        fontSize: '24px',
        width: '100%'
      }}
      >Who's a good boy?
      </AccordionSummary>
      <AccordionDetails>
        <Box
         display={'flex'}
         flexDirection={'column'}
         alignItems={'center'}
         width={'100%'}
        >
          <div>Casey is!</div>
          <img src={'/images/Casey.JPG'} width={'400px'} alt={'Casey'}/>
        </Box>
      </AccordionDetails>
    </Accordion>
  </>
  );
}