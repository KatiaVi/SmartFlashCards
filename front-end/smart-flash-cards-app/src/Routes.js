import React from 'react';
import HomePage from './pages/HomePage';
import CardDeckPage from './pages/CardDeckPage';
import LearningSpacePage from './pages/LearningSpacePage';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/learning-space/card-deck/" component={CardDeckPage} />
        <Route exact path="/learning-space/" component={LearningSpacePage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/">
          <Redirect component={HomePage} />
        </Route>
      </Switch>
    </div>
  );
};