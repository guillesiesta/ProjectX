import React, {Component} from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header', ()=> {
  test('Rendering the simple component', ()=>{
    const wrapper = shallow(
      <Header />
    );

    expect(wrapper).toMatchSnapshot();
  })
})
