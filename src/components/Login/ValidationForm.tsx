export interface DefaultsFields {
    username: string;
    password: string;
}
type ValueAndMessage = {
    value: number,
    message: string
}
type UsernameRule = {
   username: {
        required:boolean,
        minLength: ValueAndMessage,
        maxLength: ValueAndMessage
   }
}
type PasswordRule = {
   password: {
        required:boolean,
        minLength: ValueAndMessage,
        maxLength: ValueAndMessage
   }
}
export type Rules = PasswordRule | UsernameRule