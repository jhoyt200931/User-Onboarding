import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: true
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })

    const [account, setAccount] = useState([]);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const schema = yup.object().shape({
        name: yup.string().required("Name is required.") ,
        email: yup.string().email("Please submit a valid email.").required("Email is required."),
        password: yup.string().min(8, "Password must be at least 8 characters!").max(16, "Password must be less than 16 characters!").required("Please create a password."),
        terms: yup.boolean().oneOf([true], "Please agree to the Terms and Conditions.")
    })

    const validateChange = (e) => {
        yup
        .reach(schema, e.target.name)
        .validate(e.target.value)
        .then((valid) => {
            setErrors({
            ...errors,
            [e.target.errors]: "",
            });
        })
        .catch((err) => {
            console.log(err);
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0] 
            })
        });
    }

    const handleChange = (e) => {
        e.persist();
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.type==="checkbox" ? e.target.checked : e.target.value
        }
        validateChange(e);
        setFormData(newFormData);
    }

    const submit = (e) => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users", formData)
        .then((response) => {
            setAccount(response.data);
            setFormData({
                name: "",
                email: "",
                password: "",
                terms: true
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        schema.isValid(formData).then((isValid) => {
            setButtonDisabled(!isValid);
        })
    }, [formData])

    return (
        <div>
            <h3>Fantasy Basketball Account Creation</h3>
            <form onSubmit={submit} >
                <label htmlFor="name">
                    Name: 
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name.length > 0 ? <p className="errors">{errors.name}</p> : null}
                </label>
                <label htmlFor="email">
                    Email: 
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email.length > 0 ? <p className="errors">{errors.email}</p> : null}
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password.length > 0 ? <p className="errors">{errors.password}</p> : null}
                </label>
                <label htmlFor="terms">
                    Terms and Conditions: 
                    <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} />
                    {errors.terms.length > 0 ? <p className="errors">{errors.terms}</p> : null}
                </label>
                <button type="submit" disabled={buttonDisabled} >Create Account</button>
                <pre>{JSON.stringify(account, null, 2)}</pre>
            </form>
        </div>
    )
}

export default Form;