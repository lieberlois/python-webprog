import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { ExamPage } from '../pages/ExamPage';

export function Routing() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />

      <Route path="/home" component={HomePage} />
      <Route path="/exam" component={ExamPage} />
      <Redirect to="/home" />
    </Switch>
  );
}