import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../Header";
import SideNav from "../SideNav";
import Dashboard from "../package-dashboard/Dashboard";
import AddForm from "../package-addForm/AddForm";
import History from "../package-history/HistoryPanel";
import Database from "../package-database/Database";
import DatabaseQuestion from "../package-database/Database/DatabaseQuestion";
import QuestionPanel from "../package-database/QuestionPanel";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import * as entryActions from "store/actions/entriesActions/entriesActionCreators";
import * as questionActions from "store/actions/questionsActions/questionsActionCreators";
import "./layout.scss";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entryActions.loadEntries());
    dispatch(questionActions.loadQuestions());
  }, []);

  return (
    <div className="Layout">
      <BrowserRouter>
        <Header />
        <SideNav />
        <Switch>
          <Route path="/new" component={AddForm} />
          <Route path="/history" component={History} />
          <Route path="/database" exact component={Database} />
          <Route
            path="/database/:questionType"
            exact
            component={DatabaseQuestion}
          />
          <Route
            path="/database/:questionType/:questionId"
            component={QuestionPanel}
          />
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
