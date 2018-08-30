import React, {Component} from 'react';
import { shallow } from 'enzyme';

import Solucion from './Solucion';

import "isomorphic-fetch"

describe('Solucion', ()=> {
  test('Rendering the simple component', ()=>{

    const wrapper = shallow(
      <Solucion />
    );

    expect(wrapper).toMatchSnapshot();
  })
})
