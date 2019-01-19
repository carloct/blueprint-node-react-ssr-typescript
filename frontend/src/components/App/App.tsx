import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage';
import { PageTwo } from '../Pages/PageTwo';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/test" component={PageTwo} />
      </Switch>
    );
  }
}

export default connect()(App);
