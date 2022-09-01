function validator(values){
    
    let errors={};

    if(!values.email){
        errors.email = "Please Enter your email";
    }
    else if(!/\S+@+\S+.+\S/.test(values.email) ){
        errors.email = "Please Enter a Valid email";
    }

    if(!values.password){
        errors.password = "Please enter a password";
    }
    else if(values.password.length < 8) 
                                //.length is used to find the length of the password. Without .length the it will take the entire value of the password
                               //example without .length if password is 145 then it will compare 145<8 which is obviously false that is why it wont run   
                                //with .length if password is 145 then it will compare 145.length with 8 which is 3<8 which is obviously true 
    {
          errors.password = "Password must be minimum 8 characters";
    }

    return errors;
}

export default validator;