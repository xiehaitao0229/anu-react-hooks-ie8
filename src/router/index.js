import React from 'react';
import { Router } from '@reach/router';

import Counter from '../pages/counter'

const router = (props) => {
  return (
    <Router {...props}>
      <Counter path='/'></Counter>
    </Router>
  )
}

export default router;