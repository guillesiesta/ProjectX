import React, {Component} from 'react';
import { shallow } from 'enzyme';

import Riddle from './Riddle';

import "isomorphic-fetch"

describe('Riddle', ()=> {
  test('Rendering the simple component', ()=>{

    const wrapper = shallow(
      <Riddle />
    );

    expect(wrapper).toMatchSnapshot();
  })
})
