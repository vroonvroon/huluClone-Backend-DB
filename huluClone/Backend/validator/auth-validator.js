const {z} = require("zod");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const signupSchema = z.object({
    // email: z.string({required_error: "Email is required"}).trim().min(3, {message: "Email must be atleast 3 characters"}).max(50, {message: "Email must be not be more than 50 characters"}),
    email: z.string().regex(emailRegex, 'Invalid email address'),
    
    password: z.string({required_error: "Passwords is required"}).trim().min(6, {message: "Passwords must be six or more characters"}).max(255, {message: "Password must be not be more than 255 characters"}),

    name: z.string({required_error: "Name is required"}).trim().min(3, {message: "Please enter a valid name"}).max(255, {message: "Name must be not be more than 255 characters"}),

    birthdate: z.object({
        month: z.string({required_error: "Required"}),
        day: z.coerce.number({required_error: "Required"}),
        year: z.coerce.number({required_error: "Required"}),
    }),

    zipcode: z.string({required_error: "Zip code is required"}).trim().min(6, {message: "Zip code must be atlleast 6 characters"}).max(10, {message: "Zip code must be not be more than 10 characters"}),

    gender: z.string({required_error: "Required"}),
});

module.exports = signupSchema;
