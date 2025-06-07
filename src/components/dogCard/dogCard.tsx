import { Box, Card, CardActionArea, CardContent, CardMedia, Stack } from "@mui/material";
import { Dog } from "../../constants/types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from '../../style/global.module.scss';

export interface IDogCardProps {
  dog: Dog;
  selected: boolean;
  onSelected: (dog: Dog, isSelected) => void;
}

export function DogCard(props: IDogCardProps) {
  const bgColor = props.selected ? `rgb(128,128,128)` : `rgb(64,64,64)`;
  const borderColor = props.selected ? `rgb(96,0,192)` : `rgb(48,0,96)`;
  return (
    <Card className={styles.dogCard} sx={{borderColor: borderColor}}>
      <CardContent style={{padding: 0, width: '200px'}}>
        <CardActionArea
          key={`card-click-${props.dog.id}`}
          data-testid={`card-click-${props.dog.id}`}
          onClick={() => {
            props.onSelected(props.dog, !props.selected);
          }}
          data-active={props.selected}
          sx={{
            backgroundColor: bgColor
          }}
        >
          <CardMedia
            sx={{}}
            style={{ height: '200px'}}
            image={props.dog.img}
            title={props.dog.name}
          />
          <Box
            paddingBottom='8px'
            paddingTop='0'
            margin='0'
            display="flex"
            justifyContent="start"
            flexDirection={'row'}
            alignItems="center"
            width={'90%'}
          >
            <Stack flexDirection='column' width='70%'>
              <div className={styles.dogCardName}>
                <h1 style={{paddingLeft: '8px'}}>{props.dog.name}</h1>
              </div>
              <div style={{fontSize: '14px', paddingLeft: '8px'}}>{props.dog.breed}</div>
              <div style={{fontSize: '14px', paddingLeft: '8px'}}>Age: {props.dog.age}</div>
              <div style={{fontSize: '14px', paddingLeft: '8px'}}>Location: {props.dog.zip_code}</div>
            </Stack>
            {
              props.selected && (
                <FavoriteIcon 
                 fontSize="large"
                 style={{width: '30%', marginTop: '12px', alignSelf: 'baseline'}}
                 
                />
              )
            }
          </Box>
        </CardActionArea>
      </CardContent>
    </Card>
  )
}