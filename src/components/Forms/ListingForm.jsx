import React, { Component } from 'react'

import withStyles from "@material-ui/core/styles/withStyles";
// import FormLabel from "@material-ui/core/FormLabel";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Radio from "@material-ui/core/Radio";
// import Checkbox from "@material-ui/core/Checkbox";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardText from "components/Card/CardText.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ImageUpload from "components/ImageUpload/ImageUpload.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class ListingForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <ImageUpload
              addButtonProps={{ round: true }}
              changeButtonProps={{ round: true }}
              removeButtonProps={{ round: true, color: "danger" }}
            />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <h4 className={classes.cardIconTitle}>Listing Information</h4>
            </CardHeader>
            <CardBody>
              <form>
                <CustomInput
                  labelText="Listing Name"
                  id="listing_name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "listing_name"
                  }}
                />
                <CustomInput
                  labelText="Listing Address"
                  id="listing_address"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "listing_address"
                  }}
                />
                <CustomInput
                  labelText="Neighborhood"
                  id="neighborhood"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "neighborhood"
                  }}
                />
                <CustomInput
                  labelText="Price"
                  id="price"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "price"
                  }}
                />
                <CustomInput
                  labelText="Common Charges"
                  id="common_charges"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "common_charges"
                  }}
                />
                <CustomInput
                  labelText="Description"
                  id="description"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "description",
                    multiline: true
                  }}
                />
                <Button color="rose">Submit</Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(regularFormsStyle)(ListingForm);