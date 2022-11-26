import "./App.css";
import Mainpage from "./components/MainPage";
import ConsoleContextProvider from "./contexts/console.context";
import InitContextProvider from "./contexts/init.context";

function App() {
  return (
    <InitContextProvider>
      <ConsoleContextProvider>
        <div className={`overflow-hidden`}>
          <Mainpage />
        </div>
      </ConsoleContextProvider>
    </InitContextProvider>
  );
}

export default App;
