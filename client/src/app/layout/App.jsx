import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from '../layout/nav/navBar/NavBar';
import SideBar from '../layout/nav/sideBar/SideBar';
import QuestionDashboard from '../../feature/question/dashboard/QuestionDashboard';
import HomePage from '../../feature/home/HomePage';
import QuestionDetail from '../../feature/question/questionDetail/QuestionDetail';
import UserDashboard from '../../feature/user/userDashboard/UserDashboard';
import UserDetail from '../../feature/user/userDetail/UserDetail';
import SettingsDashboard from '../../feature/user/settings/SettingsDashboard';
import TestComponent from '../../feature/testarea/TestComponent';
import ModalManager from './modal/ModalManager';
import SearchBar from '../../feature/search/searchBar/SearchBar';
import Appfooter from './footer/AppFooter';
import NavMobile from './nav/navMobile/NavMobile';
import NewsMain from '../../feature/news/main/NewsMain';
import NewsArticle from '../../feature/news/article/NewsArticle';
import QuestionForm from '../../feature/question/questionForm/QuestionForm';
// import QuestionTabs from '../../feature/question/questionForm/QuestionTabs';

import { UserIsAuthenticated } from './auth/AuthWrapper';
import QuestionCategoryPage from '../../feature/question/categories/QuestionCategoryPage';

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
              <SearchBar />
              <Container className='main'>
                <div className='content'>
                  <Switch key={this.props.location.key}>
                    <Route exact path='/questions' component={QuestionDashboard} />
                    <Route path='/questions/:id' component={QuestionDetail} />
                    <Route path='/categories' component={QuestionCategoryPage} />
                    <Route path={['/ask', '/ask/:id', '/ask/:uid/:slug']} component={UserIsAuthenticated(QuestionForm)} />
                    <Route exact path='/people' component={UserDashboard} />
                    <Route path='/profile/:id' component={UserDetail} />
                    <Route exact path='/settings' component={SettingsDashboard} />
                    <Route exact path='/test' component={TestComponent} />
                    <Route exact path='/news' component={NewsMain} />
                    <Route path='/news/:uid/:slug' component={NewsArticle} />
                  </Switch>
                </div>
              </Container>
              <NavMobile />
              <Appfooter />
              <SideBar />
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(connect(mapState)(App));
