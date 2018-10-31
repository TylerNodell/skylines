import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Heading from "components/Heading/Heading.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Map from "components/Accordion/Map.jsx";
import CButton from "components/CustomButtons/Button.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import Drawer from "@material-ui/core/Drawer";
import "react-big-calendar/lib/less/styles.less";

// import GoogleMapReact from "google-map-react";



import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class DisplayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      isOpen: false,
      targetUnitID: 0
    };
  }

  toggleDrawer = id => {
    this.setState({
      isOpen: !this.state.isOpen,
      targetUnitID: id
    });
  };

  handleSchedule = id => {
    console.log(id);

    this.setState({ targetUnitId: id });
    this.toggleDrawer(id);
  };

  componentDidMount() {
    console.log("mount");
    fetch(`http://localhost:4000/units`)
      .then(resp => resp.json())
      .then(data => {
        const listed_units = data.filter(unit => unit.user_id === 1);
        this.setState({ units: listed_units });
      });
  }

  render() {
    const { classes } = this.props;
    const divStyle = {
      width: "75% !important"
    };
    return (
      <div className={classes.container} style={divStyle}>
        <Drawer
          anchor="bottom"
          open={this.state.isOpen}
          onClose={() => this.toggleDrawer()}
          elevation={16}
        >
          <div tabIndex={0} role="button">
            <Calendar />
          </div>
        </Drawer>
        <Heading title="Janice Chang Team" textAlign="center" />
        <GridContainer>
          <GridItem width="100%">
            <Card plain>
              <Accordion
                // active={0}
                collapses={this.state.units.map((data, idx) => {
                  console.log(data);
                  return {
                    title: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <Card>
                            <img width="100%" src={data.status} alt="..." />
                          </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Card>
                            <Heading title={data.name} textAlign="center" />
                            <CardBody>
                              <h4>Address: {data.address}</h4>
                              <br />
                              <h4>Neighborhood: {data.coordinates}</h4>
                              <br />
                              <h4>Price: ${data.price}</h4>
                              <br />
                              <h4>Description: {data.description}</h4>
                            </CardBody>
                            <CardFooter>
                              <CButton
                                color="success"
                                onClick={() => this.handleSchedule(data.id)}
                              >
                                Schedule an appointment
                              </CButton>
                              <a
                                href={`mailto:jchang@elliman.com?subject=An inquiry for your listing of ${
                                  data.name
                                }.`}
                              >
                                <CButton>Inquire about this listing</CButton>
                              </a>
                            </CardFooter>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    ),
                    content: (
                      <GridContainer>
                        <Map address={data.address} />
                      </GridContainer>
                    )
                  };
                })}
              />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

DisplayPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(DisplayPage);
