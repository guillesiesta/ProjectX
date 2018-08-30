import React, {Component} from 'react';
import { shallow } from 'enzyme';

import PuntuarSolucion from './PuntuarSolucion';

import "isomorphic-fetch"

describe('PuntuarSolucion', ()=> {
  test('Rendering the simple component', ()=>{

    const wrapper = shallow(
      <PuntuarSolucion />
    );

    expect(wrapper).toMatchSnapshot();
  })
})
