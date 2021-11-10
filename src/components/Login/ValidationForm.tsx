
export interface DefaultsFields {
    username: string;
    password: string;
}
export interface DefaultsFieldsRegister {
    username: string;
    password: string;
    email: string;
}
type ValueAndMessage = {
    value: number,
    message: string
}
type Pattern = {
    value: RegExp,
    message: string
}
export type Rule = {
    required: boolean,
    minLength: ValueAndMessage,
    maxLength: ValueAndMessage
}

export type RuleEmail = {
    required: boolean,
    pattern: Pattern
}
