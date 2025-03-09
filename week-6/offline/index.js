const jwt = require("jsonwebtoken")
const JWT_SECRET = "asdasd"

const zod = require("zod")

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username ,password){
    const usernameResponse = emailSchema.safeParse(username)
    const passwordResponse = passwordSchema.safeParse(password)
    if (!usernameResponse.success) {
        console.log("Invalid email:", usernameResponse.error);
        return null;
    }
    if (!passwordResponse.success) {
        console.log("Invalid password:", passwordResponse.error);
        return null;
    }

    // if(!usernameResponse.success || !passwordResponse.success){
    //     return null
    // }

    const signature = jwt.sign({
        username
    },JWT_SECRET);

    return signature
}

const ans = signJwt("remiss@gmail.com","pwpwd")
console.log(ans);
