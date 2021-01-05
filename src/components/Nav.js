import React from "react";
import { FaMusic } from "react-icons/fa";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h1>wave</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library <FaMusic size="1rem" />
      </button>
    </nav>
  );
};
export default Nav;
