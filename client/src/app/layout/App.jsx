import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { loadReCaptcha } from 'react-recaptcha-v3';
import NavBar from '../layout/nav/navBar/NavBar';
import SideBar from '../layout/nav/sideBar/SideBar';
import QuestionDashboard from '../../feature/question/dashboard/QuestionDashboard';
import HomePage from '../../feature/home/HomePage';
import QuestionDetail from '../../feature/question/questionDetail/QuestionDetail';
import UserDashboard from '../../feature/user/userDashboard/UserDashboard';
import UserDetail from '../../feature/user/userDetail/UserDetail';
import SettingsDashboard from '../../feature/user/settings/SettingsDashboard';
import TestComponent from '../../feature/testarea/TestComponent';
import TestForms from '../../feature/testarea/TestForms';
import ModalManager from './modal/ModalManager';
import SearchBar from '../../feature/search/searchBar/SearchBar';
import Appfooter from './footer/AppFooter';
import NavMobile from './nav/navMobile/NavMobile';
import NewsMain from '../../feature/news/main/NewsMain';
import NewsArticle from '../../feature/news/article/NewsArticle';
import QuestionForm from '../../feature/question/questionForm/QuestionForm';
import { UserIsAuthenticated } from '../../feature/auth/AuthWrapper';
import QuestionCategoryPage from '../../feature/question/categories/QuestionCategoryPage';
import Scholarships from '../../feature/scholarships/Scholarships';
import ScholarshipClinical from '../../feature/scholarships/ScholarshipClinical';
import Resources from '../../feature/resources/Resources';
import About from '../../feature/about/About';
import Contact from '../../feature/contact/Contact';
import Tags from '../../feature/tags/Tags';
import People from '../../feature/people/People';
import Jobs from '../../feature/jobs/Jobs';
import AccountForm from '../../feature/account/component/AccountForm';

const mapState = state => ({
  auth: state.auth
});

class App extends Component {
  componentDidMount() {
    loadReCaptcha('6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M');
  }

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
                    <Route path='/questions/:uid/:slug' component={QuestionDetail} />
                    <Route path='/categories' component={QuestionCategoryPage} />
                    <Route path={['/ask', '/ask/:id', '/ask/:uid/:slug']} component={UserIsAuthenticated(QuestionForm)} />
                    <Route exact path='/user' component={UserIsAuthenticated(UserDashboard)} />
                    <Route path='/profile/:id' component={UserIsAuthenticated(UserDetail)} />
                    <Route exact path='/settings' component={UserIsAuthenticated(SettingsDashboard)} />
                    <Route exact path='/news' component={NewsMain} />
                    <Route path='/news/:uid/:slug' component={NewsArticle} />
                    <Route exact path='/scholarships' component={Scholarships} />
                    <Route exact path='/scholarships/clinical' component={ScholarshipClinical} />
                    <Route path='/resources' component={Resources} />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Route path='/tags' component={Tags} />
                    <Route path='/people' component={People} />
                    <Route path='/jobs' component={Jobs} />
                    <Route path='/user/reset/:token' component={NewsMain} />
                    <Route exact path='/account' component={AccountForm} />
                    <Route exact path='/testarea' component={TestComponent} />
                    <Route exact path='/testform' component={TestForms} />
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
