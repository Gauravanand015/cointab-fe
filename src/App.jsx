import { Outlet } from "react-router-dom";
import Headers from "./components/Headers";

function App() {
  return (
    <>
      <Headers />
      <Outlet />
    </>
  );
}

export default App;
