import React from "react";
import Header from "../Header";
import SideNav from "../SideNav";
import Dashboard from "../package-dashboard/Dashboard";
import AddForm from "../package-addForm/AddForm";
import History from "../package-history/HistoryPanel";
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
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
