import React from 'react';
import { Route, Link } from 'react-router-dom';
import Form from './Form'


const App = () => {
  return (
    <>
      <Route exact path="/">
        <img className="backgroundimg"/>
        <nav>
          <h1>Lambda Eats</h1>
          <Link to="/" className={"link"}>Home</Link>
        </nav>
        <div className={"pizzaButton"}>
        <Link to="/Pizza" className="button" >Pizza?</Link>
        </div>
      </Route>
      <Route exact path="/Pizza">
          <Form className="button"/>
      </Route>
    </>
  );
};
export default App;
