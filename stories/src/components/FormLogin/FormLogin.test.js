import React, {Component} from 'react';
import { shallow } from 'enzyme';

import FormLogin from './FormLogin';

describe('FormLogin', ()=> {
  test('Rendering the simple component', ()=>{

    const wrapper = shallow(
      <FormLogin getUsername="usuario"/>
    );

    expect(wrapper).toMatchSnapshot();
  })
})
