import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass:process.env.password
      
    }
  });
  
   let forgetpassword = async ()=>{
    let char  = "abcdefghijklmnopqrstuvwxyz"
    let number1 = (Math.floor(Math.random()*10+1))
    let number2 = (Math.floor(Math.random()*16+11))
    let substring = char.substring(number1,number2)
    console.log(substring)
    var mailOptions = {
        from: 'ganesh.gmv004@gmail.com',
        to: 'ganesh.gmv004@gmail.com',
        subject: 'PassWord Recovery email',
        text: `Dear user ,

        Please find your system generated password: ${substring}. Kindly change it once you login with this.
        
    Thanks,
    Admin`
      };
      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);

        }
      });
      return substring
   }
  
 
  

  export default {
    forgetpassword
  }