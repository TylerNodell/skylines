import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Drawer from '@material-ui/core/Drawer';
import ListingForm from "components/Forms/ListingForm.jsx";
// import TemporaryDrawer from 'components/Drawer/Drawer.jsx';

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import priceImage1 from "assets/img/111w57.jpg";
import priceImage2 from "assets/img/76-11.jpg";
import priceImage3 from "assets/img/128CP.jpg";

class Dashboard extends React.Component {
  state = {
    value: 0,
    targetUnitID: 0,
    units: [],
    isOpen: false
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  toggleDrawer = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleEdit = (id) => {
    this.toggleDrawer(true);
    this.setState({targetUnitId: id})
  };

  generateNewListing = () => {
    console.log('Listing');
    fetch(`http://localhost:4000/units`, {
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => this.setState({targetUnitID: data.id}))
  };

  generateCards = () => {
    const { classes } = this.props;
    return this.state.units.map((idx, data) => {
      return (
        <GridItem key={idx} xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a onClick={e => e.preventDefault()}>
                <img src={data.imgs[0]} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <Tooltip
                id="tooltip-top"
                title="Edit"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button color="success" onClick={() => this.handleEdit(data.id)} simple justIcon>
                  <Edit className={classes.underChartIcons} />
                </Button>
              </Tooltip>
              <Tooltip
                id="tooltip-top"
                title="Remove"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button color="danger" simple justIcon>
                  <Refresh className={classes.underChartIcons} />
                </Button>
              </Tooltip>
              <h4 className={classes.cardProductTitle}>
                <a href="#janice" onClick={e => e.preventDefault()}>
                  {data.name}
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                {/* eslint-disable-next-line */}
                {data.description}
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>${data.price}</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> {data.neighborhood}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      );
    });
  };

  componentDidMount() {
    fetch(`http://localhost:4000/brokers/1`,  {
      method: 'GET',
      mode: "no-cors"
    })
      .then(resp => resp.json())
      .then(data => this.setState({units: data.units}))
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Drawer
          anchor="bottom"
          open={this.state.isOpen}
          onClose={() => this.toggleDrawer()}
          elevation={16}
        >
          <div
            tabIndex={0}
            role="button"
            // onClick={() => this.toggleDrawer()}
            // onKeyDown={() => this.toggleDrawer()}
          >
            <ListingForm />
          </div>
        </Drawer>
        <h3>Manage Listings</h3>
        <Button color="success" onClick={this.generateNewListing}>Create New Listing</Button>
        <br />
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={priceImage1} alt="..." />
                </a>
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" onClick={() => this.handleEdit()} simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="danger" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#janice" onClick={e => e.preventDefault()}>
                    111 West 57th Street, 64 - Central Park South
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                {/* eslint-disable-next-line */}
                  This singular residence is the only simplex apartment at 111 West 57th Street to offer private outdoor space, with a 309 sq ft terrace boasting panoramic southern city skyline views. 3,873 sq ft of beautifully proportioned interior space are designed for contemporary living on a grand scale, with three bedrooms and three and a half bathrooms.
                </p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>$30,000,000</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  <Place /> Midtown
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={priceImage2} alt="..." />
                </a>
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="danger" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    The XI, Eleventh Avenue, PH32A
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                Penthouse 32A is a magnificent half floor five bedroom at No. I, one of the two Bjarke Ingels architectural masterpieces rising in vibrant West Chelsea, spanning a full city block above the Hudson River and the High Line.
                </p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>$28,000,000</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  <Place /> Chelsea
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={priceImage3} alt="..." />
                </a>
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="danger" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    128 Central Park South, PH
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                Rare opportunity to own a spectacularly renovated 3,000 square feet penthouse on Central Park South with 100 feet of park frontage and three terraces total 3,000 square feet overlooking Central Park.
                </p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>$18,000,000</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  <Place /> Midtown
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
