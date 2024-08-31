import usermodel from '../../../db/models/user.model.js'
import bcrypt, { hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../email/sendemail.js'
import { handleerror } from '../../middeleware/handlerror.js'
import { apperror } from '../../../utils/apperror.js'
const signup=handleerror( async(req,res,next)=>{
    let{name,email,password}=req.body
    const signed=await usermodel.findOne({email})
    if(signed){ return next(new apperror(`Already Registered!`,409))}
    else{
    const bcrypted=bcrypt.hashSync(password,Number(process.env.rounds))
   const user= await usermodel.insertMany({name,email,password:bcrypted})
   console.log(user);
   let verifyemail=jwt.sign({id:user[0]._id},process.env.verifyemaill)
   sendEmail({email,api:`http://localhost:3000/users/verify/${verifyemail}`})
  return res.json({message:"Hello",user})
   }})
   const signin =handleerror( async (req, res, next) => {
    let { email, password } = req.body;
    console.log("Email received:", email); // Log the received email
    const signed = await usermodel.findOne({ email });
    console.log("User found:", signed); // Log the result of the query

    if (signed) {
        if (signed.verifiedid) {
            let matched = bcrypt.compareSync(password, signed.password);
            if (matched) {
                let token = jwt.sign({ id: signed._id, name: signed.name }, process.env.secret_key);
                res.json({ message: "Welcome", token });
            } else {
                return next(new apperror(`Wrong password!`, 400));
            }
        } else {
            return next(new apperror(`Please Verify First!`, 401));
        }
    } else {
        return next(new apperror(`You Should Registered First!`, 400));
    }
})


const verifyemail = handleerror(async (req, res, next) => {
    let { token } = req.params;

    jwt.verify(token, process.env.verifyemaill, async (err, decoded) => {
        if (err) {
            return next(new apperror("Invalid token", 400)); // Pass the error to next
        }

        console.log(decoded);
        
        let updated = await usermodel.findByIdAndUpdate(decoded.id, { verifiedid: true }, { new: true });
        if (!updated) {
            return next(new apperror("User not found", 404)); // Handle user not found case
        }

        return res.json({ message: "Verified", updated });
    });
});
export{
    signup,signin,verifyemail
}