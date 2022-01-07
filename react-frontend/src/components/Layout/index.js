import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import SideNav from "../SideNav";
import Dashboard from "../package-dashboard/Dashboard";
import AddForm from "../package-addForm/AddForm";
import History from "../package-history/HistoryPanel";
import Database from "../package-database/Database";
import Validation from "../common/Validation";
import DatabaseQuestion from "../package-database/Database/DatabaseQuestion";
import QuestionPanel from "../package-database/QuestionPanel";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import * as entryActions from "store/actions/entriesActions/entriesActionCreators";
import * as questionActions from "store/actions/questionsActions/questionsActionCreators";
import "./layout.scss";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entryActions.loadEntries());
    dispatch(questionActions.loadQuestions());
  }, []);

  const validation = useSelector((state) => state.validation);
  const isModalOpen = useSelector((state) => state.modal.show);
  return (
    <div>
      {isModalOpen && <div className="Layout-modal"></div>}
      {validation.show && (
        <Validation message={validation.message} isError={validation.isError} />
      )}
      <div className="Layout-content">
        <BrowserRouter>
          <Header />
          <SideNav />
          <Routes>
            <Route path="/new" element={<AddForm />} />
            <Route path="/history" element={<History />} />
            <Route path="/database" element={<Database />} />
            <Route
              path="/database/:questionType"
              element={<DatabaseQuestion />}
            />
            <Route
              path="/database/:questionType/:questionId"
              element={<QuestionPanel />}
            />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Layout;
