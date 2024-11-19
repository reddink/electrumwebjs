import React from 'react';
import PropTypes from 'prop-types';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import './styles.css';

const COIN = 100000000;

const BalanceComponent = ({ data }) => {
  return (
      <Card className="card">
        <CardContent>
          <Typography variant="h5" component="div" className="typography-margin">
            <MonetizationOnOutlinedIcon/> Balance
          </Typography>
          <Grid container spacing={1}>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                <strong>Total:</strong>
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                {data.totalBalance / COIN} RDD
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                <strong>Confirmed:</strong>
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                {data.confirmed / COIN} RDD
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                <strong>Unconfirmed:</strong>
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                {data.unconfirmed / COIN} RDD
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  );
};

BalanceComponent.propTypes = {
  data: PropTypes.shape({
    totalBalance: PropTypes.number.isRequired,
    confirmed: PropTypes.number.isRequired,
    unconfirmed: PropTypes.number.isRequired,
  }).isRequired,
};

export default BalanceComponent;
