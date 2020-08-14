import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import Teams from "./Teams";
import styled from "styled-components";

const Main = styled.div`
display: flex;
flex-direction: column;
`;

const FormStyle = styled.form`
display: flex;
flex-direction: column;
margin-left: 18%;
`;

const Title = styled.h3`
font-size: 2.5em;
margin-left: 18%;
`;

const Label = styled.label`
font-size: 1.5em;
font-weight: bold;
text-decoration: underline;
margin-bottom: 12px;
margin-top: 12px;
`;

const Input = styled.input`
margin-left: 2%;
`;

const Select = styled.select`
margin-left: 2%;
`;

const Button = styled.button`
width: 30%;
height: 50px;
border-radius: 40%;
`;

const Error = styled.p`
font-size: 1.5em;
font-weight: bold;
color: red;
`;

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        teams: "",
        terms: true
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        teams: "",
        terms: ""
    })

    const [account, setAccount] = useState([]);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const schema = yup.object().shape({
        name: yup.string().required("Name is required.") ,
        email: yup.string().email("Please submit a valid email.").required("Email is required."),
        password: yup.string().min(8, "Password must be at least 8 characters!").max(16, "Password must be less than 16 characters!").required("Please create a password."),
        teams: yup.string().oneOf(Teams, "Please select your favorite team."),
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
                teams: "",
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
        <Main>
            <Title>Fantasy Basketball Account Creation</Title>
            <FormStyle onSubmit={submit} >
                <Label htmlFor="name">
                    Name: 
                    <Input data-cy="name" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name.length > 0 ? <Error className="errors">{errors.name}</Error> : null}
                </Label>
                <Label htmlFor="email">
                    Email: 
                    <Input data-cy="email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email.length > 0 ? <Error className="errors">{errors.email}</Error> : null}
                </Label>
                <Label htmlFor="password">
                    Password: 
                    <Input data-cy="password" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password.length > 0 ? <Error className="errors">{errors.password}</Error> : null}
                </Label>
                <Label htmlFor="teams">
                    Favorite Team: 
                    <Select data-cy="teams" id="teams" name="teams" onChange={handleChange} >
                        <option>--Please select your favorite team--</option>
                        {Teams.map((team) => {
                            return <option value={team} >{team}</option>
                        })}
                    </Select>
                    {errors.teams.length > 0 ? <Error className="errors">{errors.teams}</Error> : null}
                </Label>
                <Label htmlFor="terms">
                    Terms and Conditions: 
                    <Input data-cy="terms" type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} />
                    {errors.terms.length > 0 ? <Error className="errors">{errors.terms}</Error> : null}
                </Label>
                <Button data-cy="submit" type="submit" disabled={buttonDisabled} >Create Account</Button>
                <pre>{JSON.stringify(account, null, 2)}</pre>
            </FormStyle>
        </Main>
    )
}

export default Form;