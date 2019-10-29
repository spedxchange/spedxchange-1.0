import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class SideBar extends Component {
  state = { activeItem: '/' + this.props.match.url.split('/')[1] };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    const pathRoot = '/' + this.props.match.url.split('/')[1];
    this.setState({ activeItem: pathRoot });
  }

  handleItemClick = (e, { path }) => {
    this.setState({ activeItem: path });
    this.props.history.push(path);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu text vertical className='app-sidebar'>
        <Menu.Item link name='Eye On SPED' path='/news' active={activeItem === '/news'} onClick={this.handleItemClick} />
        <Menu.Item link name='Resources' path='/resources' active={activeItem === '/resources'} onClick={this.handleItemClick} />
        <Menu.Item link name='Scholarships' path='/scholarships' active={activeItem === '/scholarships'} onClick={this.handleItemClick} />
        <Menu.Item link name='About Us' path='/about' active={activeItem === '/about'} onClick={this.handleItemClick} />
        <Menu.Item link name='Contact Us' path='/contact' active={activeItem === '/contact'} onClick={this.handleItemClick} />
        <hr />
        <Menu.Item link name='Questions' path='/questions' active={activeItem === '/questions'} onClick={this.handleItemClick} />
        <Menu.Item link name='Categories' path='/categories' active={activeItem === '/categories'} onClick={this.handleItemClick} className='indent' />
        <Menu.Item link name='Tags' path='/tags' active={activeItem === '/tags'} onClick={this.handleItemClick} className='indent' />
        <hr />
        <Menu.Item link name='Jobs' path='/jobs' active={activeItem === '/jobs'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}

export default withRouter(SideBar);
