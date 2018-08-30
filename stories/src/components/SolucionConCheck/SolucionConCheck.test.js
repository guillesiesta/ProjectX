import React, {Component} from 'react';
import { shallow } from 'enzyme';

import SolucionConCheck from './SolucionConCheck';

import "isomorphic-fetch"

describe('SolucionConCheck', ()=> {
  test('Rendering the simple component', ()=>{

    const wrapper = shallow(
      <SolucionConCheck />
    );

    expect(wrapper).toMatchSnapshot();
  })
})
