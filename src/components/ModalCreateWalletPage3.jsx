import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Page3 = ({ previousPage, onCreate }) => {

  return (
      <div>
        <h2>Ready to create wallet</h2>
        <div className="grid-item">
          <Button onClick={previousPage}
                  variant="contained"
                  color="primary"
                  className="button">
            Back
          </Button>
          <Button
                  onClick={onCreate}
                  variant="contained"
                  color="primary"
                  className="button">
            Create
          </Button>
        </div>
      </div>
  );
};

export default Page3;
