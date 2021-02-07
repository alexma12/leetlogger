import React, { useState } from "react";

import { ReactComponent as BackIcon } from "svg/back.svg";
import { ReactComponent as NextIcon } from "svg/next.svg";
import ReactPaginate from "react-paginate";
import "./historyPanel.scss";
import Question from "../../common/Question";

const HistoryPanel = () => {
  const date = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateString = date.toLocaleDateString("en-US", options);

  return (
    <div className="HistoryPanel-wrapper">
      <div className="HistoryPanel">
        <div className="HistoryPanel-header">
          <BackIcon className="HistoryPanel-header-prev HistoryPanel-header-arrow-icon" />
          {dateString}
          <NextIcon className="HistoryPanel-header-next HistoryPanel-header-arrow-icon HistoryPanel-header-arrow-icon-disabled" />
        </div>
        <div className="HistoryPanel-questions">
          <Question
            componentType="Question"
            title="Reverse a Linked List"
            date="January 15, 2021"
            solved={true}
            completionTimeHrs={0}
            completionTimeMins={30}
            questionType="stack"
            difficulty="easy"
            subtypes={["recursion", "bfs", "dfs"]}
          />
          <Question
            componentType="Question"
            title="In Order Traversal of A Binary Tree"
            date="January 29, 2021"
            solved={false}
            completionTimeHrs={0}
            completionTimeMins={30}
            questionType="tree"
            difficulty="medium"
            subtypes={["recursion", "bfs", "dfs"]}
          />
          <Question
            componentType="Question"
            title="Number of Connected Components in an Undirected Graph"
            date="February 22, 2021"
            solved={false}
            completionTimeHrs={0}
            completionTimeMins={30}
            questionType="graph"
            difficulty="hard"
            subtypes={["recursion", "bfs", "dfs"]}
          />
          <Question
            componentType="Question"
            title="Maximum Subarray"
            date="February 27, 2021"
            solved={false}
            completionTimeHrs={0}
            completionTimeMins={30}
            questionType="backtracking"
            difficulty="easy"
            subtypes={["recursion", "bfs", "dfs"]}
          />
          <Question
            componentType="Question"
            title="Median of Two Sorted Arrays"
            date="March 3, 2021"
            solved={false}
            completionTimeHrs={0}
            completionTimeMins={30}
            questionType="dc"
            difficulty="medium"
            subtypes={["recursion", "bfs", "dfs"]}
          />

          {/* <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;
