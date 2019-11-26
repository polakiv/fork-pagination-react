import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm";
import { YMaps, Map, Placemark } from 'react-yandex-maps';   

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  textField: {
    margin: 'auto',
    width: '100%',
    float: 'left',
    maxWidth: 500,
  },
}));

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }
  
  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false);
      }
    );
  }

  return (
    <Grid className='descriptionBlocks'>
      <Grid className={s.descriptionBlock}>
        <img src={profile.photos || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

        {editMode
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </Grid>
    </Grid>
  )
}
const ProfileData = ({ profile, isOwner, goToEditMode }) => {
 let profilempn = profile.mpn;
 let profilempna = profile.mpn.split(',')[0];
 let profilempnb = profile.mpn.split(',')[1];
 //if (isNaN(profilempna)) {
  //if input is not a number then here
  //alert('It is not a Number');
//} else {
  //if input is number then here
 // alert('It is a Number');
//}
var placemark = new Placemark([profilempna, profilempnb], {
  balloonContent: '<img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" />',
  iconContent: "Азербайджан"
}, {
  preset: "islands#yellowStretchyIcon",
  // Отключаем кнопку закрытия балуна.
  balloonCloseButton: false,
  // Балун будем открывать и закрывать кликом по иконке метки.
  hideIconOnBalloonOpen: false
});  
  return <Grid className='mainDetail'>
    {isOwner && <Grid><button onClick={goToEditMode}>edit</button></Grid>}
    <Grid className='mainDetailname'>
      {profile.fullName}
    </Grid>
    <Grid className='mainDetailgps'>
      Местоположение GPS может быть приблизительным до 10 метров:
     {/* {profile.mpn}
      <br></br>
      {profilempna}  {profilempnb}
      <br></br>*/}
      <YMaps> 
        <Grid className='defaultState'> 
          <Map defaultState={{ 
            center: [profilempna, profilempnb], 
            zoom: 16,
            placemark
         //   bounds: 1
         
            }} /> 
            
        </Grid>
      </YMaps>
    </Grid>
  </Grid>
}


const Contact = ({ contactTitle, contactValue }) => {
  //   return <Grid className={s.contact}><b>{contactTitle}</b>: {contactValue}</Grid>
}


export default ProfileInfo;