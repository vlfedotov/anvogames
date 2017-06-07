import React from 'react';
import { asyncComponent } from 'react-async-loading';

export default asyncComponent(() => System.import('./love.js'),
    { placeholder: <div>Loading</div> });
