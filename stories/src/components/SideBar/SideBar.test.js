import React, {Component} from 'react';
import { shallow } from 'enzyme';

import SideBar from './SideBar';


describe('SideBar', ()=> {
  test('Rendering the simple component', ()=>{

    const wrapper = shallow(
      <SideBar />
    );

    expect(wrapper).toMatchSnapshot();
  })
})
