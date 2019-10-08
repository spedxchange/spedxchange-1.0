import React from 'react';
import { Button } from 'semantic-ui-react';

import NavBar from '../../app/layout/nav/navBar/NavBar';
import SearchBar from '../../feature/search/searchBar/SearchBar';

// import { Segment, Container, Header, Icon, Button } from 'semantic-ui-react';

// import HomeMasthead from './HomeMasthead';

const HomePage = ({ history }) => {
  return (
    <>
      <NavBar />
      <SearchBar />
      <section id='hero' className='hero-section'>
        <h1>
          We empower SPEDucation
          <br />
          and connect people to solutions
          <br />
          that enable growth and discovery.
        </h1>
        <div className='actions'>
          <Button>For Educators</Button>
          <Button color='purple'>For Students</Button>
          <Button color='green'>For Schools</Button>
        </div>
      </section>
      <section id='HomeNews' class='home-news'>
        <h2>
          Latest News
          <br />
          and Updates
        </h2>
        <p class='text-white'>
          We have extensive informations related to special education. Get valuable insights from our social media, blogs, and unique content from our partners and our community.
        </p>
        <p class='text-white'>
          <span class='text-warning'>Sign up</span> today and you will also have access to exclusive content.
        </p>
        <Button color='green'>Read Our Latest news...</Button>
      </section>
    </>
  );
};

export default HomePage;
