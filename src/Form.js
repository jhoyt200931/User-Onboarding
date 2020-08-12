import React, { useState, useEffect } from "react";
import * as yup from "yup";

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: true
    })

    const [errors, setErrors] = useState({

    })

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const schema = yup.object().shape({
        name: yup.string().required("Name is required.") ,
        email: yup.string().email("Please submit a valid email.").required("Email is required."),
        password: yup.string().min(8, "Password must be at least 8 characters!").max(16, "Password must be less than 16 characters!").required("Please create a password."),
        terms: yup.boolean().oneOf([true], "Please agree to the Terms and Conditions.")
    })

    const handleChange = (e) => {

    }

    const submit = (e) => {

    }



    return (
        <div>
            <h3>Fantasy Basketball Account Creation</h3>
            <form onSubmit={submit} >
                <label htmlFor="name">
                    Name: 
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label htmlFor="email">
                    Email: 
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <label htmlFor="terms">
                    Terms and Conditions: 
                    <input type="checkbox" id="terms" name="terms" checked={true} onChange={handleChange} />
                </label>
                <button type="submit" disabled={buttonDisabled} >Create Account</button>
            </form>
        </div>
    )
}

export default Form;