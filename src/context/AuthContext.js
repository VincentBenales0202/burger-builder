import React from "react";

const authContext = React.createContext({
  purchasing: false,
  clicked: () => {},
});

export default authContext;
