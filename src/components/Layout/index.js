import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const locationSend = () => ({
  pathname: "/new-post",
  state: { fromDashboard: true }
});

export const Layout = ({ children, count }) => {
  console.log(count);
  return (
    <div style={{ position: "relative" }}>
      <header>
        {count && (
          <div>
            <Link to={locationSend("new-post")}> Add new post</Link>
            <span> {count.length} - post length</span>
          </div>
        )}
      </header>
      <main>
        <div className={"contentCard"}>{children}</div>
      </main>
      <footer>footer</footer>
    </div>
  );
};
