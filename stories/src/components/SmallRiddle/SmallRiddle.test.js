import React, {Component} from 'react';
import { shallow } from 'enzyme';

import SmallRiddle from './SmallRiddle';

import "isomorphic-fetch"

describe('SmallRiddle', ()=> {
  test('Rendering the simple component', ()=>{

    const wrapper = shallow(
      <SmallRiddle />
    );

    expect(wrapper).toMatchSnapshot();
  })
})
