import '../pages/style.css';
import '../App.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import {Grid} from "@material-ui/core";


function HowItWorksIcons(props) {
  const matches = useMediaQuery('(max-width: 750px)')

  return (
    <div className="how-it-works__icon-container">
      <Grid
          container
          direction={!matches ? "row" : "column"}
          justifyContent="center"
          alignItems="center"
          spacing={5}
      >
        <Grid item>
          <div className={"how-it-works-images"}>
            <img style={{width: '230px', height: '230px'}} src={props.icon1}/>
            <h3>1</h3>
            {props.description1}
          </div>
        </Grid>

        <Grid item>
          <div className={"how-it-works-images"}>
            <img style={{width: '230px', height: '230px'}} src={props.icon2}/>
            <h3>2</h3>
            {props.description2}
          </div>
        </Grid>

        <Grid item>
          <div className={"how-it-works-images"}>
            <img style={{width: '230px', height: '230px'}}  src={props.icon3}/>
            <h3>3</h3>
            {props.description3}
          </div>
        </Grid>
      </Grid>

    </div>
  );
}

export default HowItWorksIcons;
