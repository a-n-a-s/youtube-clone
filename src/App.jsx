import React, { useState } from "react";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header/Header";
import SideBar from "./Components/SideBar/Sidebar";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import "./app.css";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import WatchScreen from "./Screens/WatchScreen/WatchScreen";
import SearchScreen from "./Screens/SearchScreen/SearchScreen";
import SubscriptionScreen from "./Screens/SubscriptionScreen/SubscriptionScreen";
import ChannelScreen from './Screens/ChannelScreen/ChannelScreen'
const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => {
    toggleSidebar((value) => !value);
  };
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app_container ">
        <SideBar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container  className="app_main">
          {children}
        </Container>
      </div>
    </>
  );
};
const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if(!loading && !accessToken){
      history.push('/auth')
    }
  }, [accessToken, loading , history]);
  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route path="/auth">
        <LoginScreen />
      </Route>
      <Route path="/search/:query">
        <Layout>
          <SearchScreen/>
        </Layout>
      </Route>
      <Route path="/watch/:id">
        <Layout>
          <WatchScreen/>
        </Layout>
      </Route>
      <Route path="/feed/subs">
        <Layout>
          <SubscriptionScreen/>
        </Layout>
      </Route>
      <Route path="/channel/:channelId">
        <Layout>
          <ChannelScreen/>
        </Layout>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
