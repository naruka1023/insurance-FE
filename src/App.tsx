import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import InsuranceForm from "./components/InsuranceForm";

const App = () => {
  return (
    <Provider store={store}>
      <InsuranceForm />
    </Provider>
  );
};

export default App;
