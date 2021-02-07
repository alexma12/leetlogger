import React from "react";
import Header from "../Header";
import SideNav from "../SideNav";
import Dashboard from "../package-dashboard/Dashboard";
import AddForm from "../package-addForm/AddForm";
import History from "../package-history/HistoryPanel";
import Database from "../package-database/Database";
import DatabaseQuestion from "../package-database/Database/DatabaseQuestion";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./layout.scss";

const Layout = () => {
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
          <Route path="/database/:questionType/:entryId" />
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
