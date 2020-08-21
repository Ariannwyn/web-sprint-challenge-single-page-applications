import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as yup from 'yup';
import Confirmation from './Confirmation'

const formSchema = yup.object().shape({ 
    name: yup
        .string()
        .min(2, "Name must be at least 2 characters long")
        .required("Name is a required field"),
    size: yup.string(),
    toppings: yup
        .boolean()
        .oneOf([false], "Please add toppings"),
    instructions: yup.string()
})

const Form = () => {
    const originalPizzaState = {
        id: "",
        name: "",
        size: "",
        toppings: "",
        instructions: ""
    }
const [buttonDisabled, setButtonDisabled] = useState(true)
const [pizzaState, setPizzaState] = useState(originalPizzaState)
const [errorState, setErrorState] = useState(originalPizzaState)
const [pizzaList, setPizzaList] = useState([])

const validate = (event) => {
    yup.reach(formSchema, event.target.name)
       .validate(event.target.value)
       .then(valid=>{
           setErrorState({
               ...errorState,
               [event.target.name]: ""
           })
       })
       .catch(error =>{
           console.log(error.errors)
           setErrorState({
               ...errorState, 
               [event.target.name]: error.errors[0]
           })
       })
}

const handleChanges = (event) => {
    event.persist()
    validate(event)
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    setPizzaState({ ...pizzaState, [event.target.name]: value, id: Date.now()})
    console.log("input changed!", value)
};

const submitForm = (event) => {
    event.preventDefault(); 
    console.log("form submitted!")
    axios.post("https://reqres.in/api/users", pizzaState)
        .then(response => {
            const usersFromApi = response.data
            setPizzaList([...pizzaList, usersFromApi])
            console.log(response.data)
            setPizzaState(originalPizzaState) 
        })
        .catch(error => console.log(error))
  };

  useEffect(() => {
    formSchema.isValid(pizzaState)
    .then(valid => {
        setButtonDisabled(!valid);
    });
}, [pizzaState])



  return (
    <div>
        <h1>Build Your Own Pizza</h1>
        <form onSubmit={submitForm}>
            <label htmlFor="name">Name*
                <input
                id="name"
                type="text"
                name="name"
                data-cy="name"
                placeholder="Enter name"
                value={pizzaState.name}
                onChange={handleChanges}
                />
                {errorState.name.length > 0 ? <p className="error">{errorState.name}</p> : null}
            </label>
            <label > Pizza Size?
            <select 
            value={pizzaState.size}
            name="size"
            data-cy="size"
            id="size"
            onChange={handleChanges}>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
            </select>
            </label>
            <label> 
            <p>What are your toppings?</p>
                Bacon
                <input 
                value={pizzaState.toppings}
                type="checkbox"
                name="toppings"
                data-cy="toppings"
                id="toppings"
                onChange={handleChanges}>
                </input>
                Ham
                <input 
                value={pizzaState.toppings}
                type="checkbox"
                name="toppings"
                data-cy="toppings"
                id="toppings"
                onChange={handleChanges}>
                </input>
                Chicken
                <input 
                value={pizzaState.toppings}
                type="checkbox"
                name="toppings"
                data-cy="toppings"
                id="toppings"
                onChange={handleChanges}>
                </input>
                No pineapple
                <input 
                value={pizzaState.toppings}
                type="checkbox"
                name="toppings"
                data-cy="toppings"
                id="toppings"
                onChange={handleChanges}>
                </input>
                {errorState.toppings ? <p className="error">{errorState.toppings}</p> : null} 
            </label>
            <label>Special Instructions
                <textarea
                value={pizzaState.instructions}
                name="instructions"
                data-cy="instructions"
                id="instructions"
                onChange={handleChanges}>
                </textarea>
            </label>
            <label>
                <button 
                    id="button"
                    name="button"
                    data-cy="submit"
                    disabled={buttonDisabled} 
                    type="submit">
                    Submit Pizza
                </button>
                
            </label>
        </form>
        <Route exact path="/confirm">
            <Confirmation />
        </Route>
    </div>
  )};
export default Form;