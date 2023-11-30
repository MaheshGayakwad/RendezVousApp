import "./App.css";
import { Box } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Home from "./pages/home";
import ChatPage from "./pages/chatPage";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <Route path="/" component={Home} exact />
        <Route path="/chatPage" component={ChatPage} />
      </div>
    </>
  );
}

export default App;
