import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const GridExample = () => {
  return (
    <div style={{ flexGrow: 1, padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Material-UI Grid Example
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography>xs=12 (Full width)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography>xs=6 (Half width)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography>xs=6 (Half width)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography>xs=12 sm=6 md=4</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography>xs=12 sm=6 md=4</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography>xs=12 sm=6 md=4</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default GridExample;