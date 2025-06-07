import { Box, Card, CardActionArea, CardContent, CardMedia, Stack } from "@mui/material";
import { Dog } from "../../constants/types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from '../../style/global.module.scss';

export interface IDogCardProps {
  dog: Dog;
  selected: boolean;
  onSelected: (id: string, isSelected) => void;
}

export function DogCard(props: IDogCardProps) {
  const bgColor = props.selected ? `rgb(128,128,128)` : `rgb(64,64,64)`;
  return (
    <Card>
      <CardContent style={{padding: 0, width: '200px', }}>
        <CardActionArea
          onClick={() => {
            props.onSelected(props.dog.id, !props.selected);
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
            paddingLeft='8px'
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
              <h1 className={styles.pipersRegular}>{props.dog.name}</h1>
              <div style={{fontSize: '14px'}}>{props.dog.breed}</div>
              <div style={{fontSize: '14px'}}>Age: {props.dog.age}</div>
              <div style={{fontSize: '14px'}}>Location: {props.dog.zip_code}</div>
            </Stack>
            {
              props.selected && (
                <FavoriteIcon 
                 fontSize="large"
                 style={{width: '30%'}}
                />
              )
            }
          </Box>
        </CardActionArea>
      </CardContent>
    </Card>
  )
}