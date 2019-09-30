import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from '../layout/nav/navBar/NavBar';
import SideBar from '../layout/nav/sideBar/SideBar';
import QuestionDashboard from '../../feature/question/questionDashboard/QuestionDashboard';
import HomePage from '../../feature/home/HomePage';
import QuestionDetail from '../../feature/question/questionDetail/QuestionDetail';
import UserDashboard from '../../feature/user/userDashboard/UserDashboard';
import UserDetail from '../../feature/user/userDetail/UserDetail';
import SettingsDashboard from '../../feature/user/settings/SettingsDashboard';
import QuestionForm from '../../feature/question/questionForm/QuestionForm';
import TestComponent from '../../feature/testarea/TestComponent';
import ModalManager from './modal/ModalManager';

const mapState = state => ({
  auth: state.auth
});

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route exact path='/' component={HomePage} />
        <Route
          path='/(.+)'
          render={() => (
            <Fragment>
              <NavBar />
              <SideBar />
              <Container className='main'>
                <div className='content'>
                  <Switch key={this.props.location.key}>
                    <Route exact path='/questions' component={QuestionDashboard} />
                    <Route path='/questions/:id' component={QuestionDetail} />
                    <Route exact path='/people' component={UserDashboard} />
                    <Route path='/profile/:id' component={UserDetail} />
                    <Route exact path='/settings' component={SettingsDashboard} />
                    <Route path={['/createQuestion', '/manage/:id']} component={QuestionForm} />
                    <Route exact path='/test' component={TestComponent} />
                  </Switch>
                </div>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(connect(mapState)(App));
