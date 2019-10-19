import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class SideBar extends Component {
  state = { activeItem: null };

  handleItemClick = (e, { name, path }) => {
    this.setState({ activeItem: name });
    this.props.history.push(path);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu text vertical className='app-sidebar'>
        <Menu.Item link name='Eye On SPED' path='/news' active={activeItem === 'Eye On SPED'} onClick={this.handleItemClick} />
        <Menu.Item link name='Resources' path='/news' active={activeItem === 'Resources'} onClick={this.handleItemClick} />
        <Menu.Item link name='Scholarships' path='/questions' active={activeItem === 'Scholarships'} onClick={this.handleItemClick} />
        <Menu.Item link name='About Us' path='/news' active={activeItem === 'About Us'} onClick={this.handleItemClick} />
        <Menu.Item link name='Contact Us' path='/news' active={activeItem === 'Contact Us'} onClick={this.handleItemClick} />
        <hr />
        <Menu.Item link name='Questions' path='/questions' active={activeItem === 'Questions'} onClick={this.handleItemClick} />
        <Menu.Item link name='Categories' path='/categories' active={activeItem === 'Categories'} onClick={this.handleItemClick} className='indent' />
        <Menu.Item link name='Tags' path='/news' active={activeItem === 'Tags'} onClick={this.handleItemClick} className='indent' />
        <Menu.Item link name='People' path='/news' active={activeItem === 'People'} onClick={this.handleItemClick} className='indent' />
        <hr />
        <Menu.Item link name='Jobs' active={activeItem === 'Jobs'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}

export default withRouter(SideBar);
