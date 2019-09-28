import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAsync, decrementAsync, itemClick } from './TestActions';
import { Button, Menu, List } from 'semantic-ui-react';
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
        name: 'Questions',
        link: 'questions',
        auth: true
      },
      {
        name: 'About',
        link: 'about'
      },
      {
        name: 'List',
        items: [
          {
            name: 'one',
            link: 'about'
          },
          {
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
          <List celled>
            {menuItems &&
              menuItems.map(item => (
                <List.Item>
                  {item.name}
                  {item.items && (
                    <List.List celled>
                      {item.items.map(subItem => (
                        <List.Item>{subItem.name}</List.Item>
                      ))}
                    </List.List>
                  )}
                </List.Item>
              ))}
          </List>
        </div>
        <hr />
        <div>
          <ul className='nav-mobile'>
            {menuItems &&
              menuItems.map(item => (
                <li>
                  <span>{item.name}</span>
                  {item.items && (
                    <ul>
                      {item.items.map(subItem => (
                        <li>
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
/*
<List celled ordered>
    <List.Item>Cats</List.Item>
    <List.Item>Horses</List.Item>
    <List.Item>
      Dogs
      <List.List>
        <List.Item>Labradoodles</List.Item>
        <List.Item>Shiba Inu</List.Item>
        <List.Item>Mastiff</List.Item>
      </List.List>
    </List.Item>
  </List>
    */

export default connect(
  mapState,
  actions
)(TestComponent);
