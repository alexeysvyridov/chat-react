import {DefaultsFields, Rule, RuleEmail} from '../components/Login/ValidationForm';

export let defaultField: DefaultsFields = {
    username: "",
    password: ""
}

export let rules: {
    username: Rule,
    password: Rule,
    email: RuleEmail
} = {
    username: {
        required: true,
        minLength: {
            value: 6,
            message: "username to shot"
        },
        maxLength: {
            value: 52,
            message: "username to long"
        }
    },
    password: {
        required: true,
        minLength: {
            value: 6,
            message: "password to shot"
        },
        maxLength: {
            value: 16,
            message: "password to long"
        }
    },
    email: {
        required: true,
        pattern : {
            message: "Email is invalid",
            value: /^[A-Z0-9._%+-]@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        }
    }
}