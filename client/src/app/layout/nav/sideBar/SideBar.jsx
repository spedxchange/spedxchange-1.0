import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class SideBar extends Component {
  state = { activeItem: 'Questions' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu text vertical className='app-sidebar'>
        <Menu.Item link name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
        <Menu.Item link name='About Us' active={activeItem === 'About Us'} onClick={this.handleItemClick} />
        <Menu.Item link name='Resources' active={activeItem === 'Resources'} onClick={this.handleItemClick} />
        <Menu.Item link name='Scholarships' active={activeItem === 'Scholarships'} onClick={this.handleItemClick} />
        <Menu.Item link name='Eye On SPED' active={activeItem === 'Eye On SPED'} onClick={this.handleItemClick} />
        <Menu.Item link name='Contact Us' active={activeItem === 'Contact Us'} onClick={this.handleItemClick} />
        <hr />
        <Menu.Item link name='Questions' active={activeItem === 'Questions'} onClick={this.handleItemClick} />
        <Menu.Item link name='Categories' active={activeItem === 'Categories'} onClick={this.handleItemClick} className='indent' />
        <Menu.Item link name='Tags' active={activeItem === 'Tags'} onClick={this.handleItemClick} className='indent' />
        <Menu.Item link name='People' active={activeItem === 'People'} onClick={this.handleItemClick} className='indent' />
        <hr />
        <Menu.Item link name='Jobs' active={activeItem === 'Jobs'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}
