import React from 'react';
import FooterPage from './FooterPage';

import Routes from './Routes';
import TopBar from './TopBar';

const App: React.FC = () => {
  
  return (
    <>
      <TopBar/>
      <Routes/>
      <FooterPage/>
    </>)
}
export default App;
