import './App.css';
import React, { Component } from 'react';
import Movies from './components/movies';
import NavBar from './components/navBar';
import { Route, Redirect, Switch } from 'react-router-dom';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import Customers from './components/customers';



class App extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
     );
  }
}

export default App;

