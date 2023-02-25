//Starts with lower or uppercase letter, followed by l/u case letter, number, hyphon(-) or underscore(_) // {from 4 to 24 char}
export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

//Regex for validate Email
export const EMAIL_REGEX =
/^\S+@\S+\.\S+$/;

//Regex for validate password
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;