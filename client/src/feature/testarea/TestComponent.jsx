import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAsync, decrementAsync, itemClick } from './TestActions';
import { Button, Menu } from 'semantic-ui-react';
import { openModal } from '../../app/layout/modal/ModalActions';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import './test.scss';

const mapState = state => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName,
  activeItem: state.test.activeItem
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal,
  itemClick
};

class TestComponent extends Component {
  state = {
    latlng: {
      lat: 41.84,
      lng: -87.82
    }
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          latlng: latLng
        });
      })
      .catch(error => console.error('Error', error));
  };

  handleItemClick = item => {
    console.log('activeItem: ', item);
    this.props.itemClick(item);
  };

  render() {
    const { data, incrementAsync, decrementAsync, openModal, loading, buttonName, activeItem } = this.props;
    const menuItems = [
      {
        id: 'questions',
        name: 'Questions',
        link: 'questions',
        auth: true
      },
      {
        id: 'about',
        name: 'About',
        link: 'about'
      },
      {
        id: 'list',
        name: 'List',
        items: [
          {
            id: 'one',
            name: 'one',
            link: 'about'
          },
          {
            id: 'two',
            name: 'two',
            link: 'about'
          }
        ]
      }
    ];

    return (
      <div>
        <h1 className='brand'>Test Component</h1>
        <h3>answer {data}</h3>
        <Button name='increment' loading={buttonName === 'increment' && loading} onClick={e => incrementAsync(e.target.name)} positive content='add' />
        <Button name='decrement' loading={buttonName === 'decrement' && loading} onClick={e => decrementAsync(e.target.name)} negative content='sub' />
        <Button onClick={() => openModal('TestModal', { data: 42 })} color='teal' content='Open Modal' />
        <br />
        <br />
        <TestPlaceInput selectAddress={this.handleSelect} />
        <SimpleMap key={this.state.latlng.lng} latlng={this.state.latlng} />
        <hr />
        <div>
          <ul className='nav-mobile'>
            {menuItems &&
              menuItems.map(item => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  {item.items && (
                    <ul>
                      {item.items.map(subItem => (
                        <li key={subItem.id}>
                          <span className={subItem.name === 'one' ? 'active' : null}>{subItem.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>
        <hr />
        <div>
          <Menu text vertical>
            {menuItems && menuItems.map(item => <Menu.Item link key={item.name} name={item.name} active={activeItem === item.name} onClick={() => this.handleItemClick(item)} />)}
          </Menu>
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TestComponent);
