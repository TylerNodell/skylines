import React from "react";
import PropTypes from "prop-types";
import update from 'react-addons-update';
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
import { updateLocale } from "moment";

class Dashboard extends React.Component {
  state = {
    value: 0,
    targetUnitID: null,
    units: [],
    isOpen: false
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  toggleDrawer = (id) => {
    this.setState({
      isOpen: !this.state.isOpen,
      targetUnitID: id
    });
  };

  handleEdit = (id) => {
    console.log(id);
    
    this.setState({targetUnitId: id})
    this.toggleDrawer(id);
  };

  generateNewListing = () => {
    // debugger
    console.log('Listing');
    fetch(`http://localhost:4000/units`, {
      method: 'POST',
      body: JSON.stringify({user_id:1, status:'sale', active:true}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({targetUnitID: data.id, isOpen:true})
      });
  };

  handleSubmit = (data) => {
    console.log(data)
    console.log(this.state.units[this.state.targetUnitID - 1]);
    
    fetch(`http://localhost:4000/units/${this.state.targetUnitID}`, {
      method: 'PATCH',
      body: JSON.stringify({name: data.listing_name, address: data.listing_address, coordinates: data.neighborhood, price: data.price, description: data.description, status: data.image}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      const target = this.state.targetUnitID - 1;
      this.setState({ 
        isOpen: false,
        // units: update(this.state.units, {[target]: {name: {$set: data.listing_name}}})
      })
    });
  };

  componentDidMount() {
    console.log('mount')
    fetch(`http://localhost:4000/units`)
      .then(resp => resp.json())
      .then(data => {
        const listed_units = data.filter(unit => unit.user_id === 1);
        this.setState({ units: listed_units });
      });

  }

  render() {
    console.log(this.state.targetUnitID);
    
    const { classes } = this.props;
    return (
      <div>
        <Drawer
          anchor="bottom"
          open={this.state.isOpen}
          onClose={() => this.toggleDrawer()}
          elevation={16}
        >
          <div tabIndex={0} role="button">
            <ListingForm handleSubmit={this.handleSubmit} />
          </div>
        </Drawer>
        <h3>Manage Listings</h3>
        <Button color="success" onClick={this.generateNewListing}>Create New Listing</Button>
        <br />
        <GridContainer>
          {this.state.units.map(data => {
            console.log(data);
            return <GridItem key={data.key} xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>
                <CardHeader image className={classes.cardHeaderHover}>
                  <a onClick={e => e.preventDefault()}>
                    <img src={data.status} alt="..." />
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
                    <Place /> {data.coordinates}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            })
          }
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
