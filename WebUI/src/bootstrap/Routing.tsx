import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { ExamPage } from '../pages/Exam';

export function Routing() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />

      <Route path="/home" component={HomePage} />
      <Route path="/exam" component={ExamPage} />
      {/** TODO: add 404 Page */}
      <Route component={HomePage} />
    </Switch>
  );
}