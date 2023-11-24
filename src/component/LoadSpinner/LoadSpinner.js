import React from 'react';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadSpinner = () => {
  return (
    <div className="loading-icon mt-10">
      <BeatLoader css={override} size={15} color={'#3642d7'} loading={true} />
    </div>
  );
};

export default LoadSpinner;
