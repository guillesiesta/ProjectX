import React, {Component} from 'react';
import { shallow } from 'enzyme';

import FormLogout from './FormLogout';

describe('FormLogout', ()=> {
  test('Rendering the simple component', ()=>{

    const wrapper = shallow(
      <FormLogout />
    );

    expect(wrapper).toMatchSnapshot();
  })
})
