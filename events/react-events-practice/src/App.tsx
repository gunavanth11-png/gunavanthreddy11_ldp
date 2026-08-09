import "./App.css";

import ClickEvent from "./events/ClickEvent";
import InputEvent from "./events/InputEvent";
import FormSubmit from "./events/FormSubmit";
import EventObject from "./events/EventObject";

import UseContextDemo from "./hooks/UseContextDemo";
import UseMemo from "./hooks/UseMemo";
import UseCallbackDemo from "./hooks/UseCallbackDemo";

function App() {
  return (
    <div className="container">

      {/* EVENTS */}

      {/* <ClickEvent /> */}

      {/* <InputEvent /> */}

      {/* <FormSubmit /> */}

      {/* <EventObject /> */}


      {/* HOOKS */}

      <UseContextDemo />

      {/* <UseMemo /> */}

      {/* <UseCallbackDemo /> */}

    </div>
  );
}

export default App;