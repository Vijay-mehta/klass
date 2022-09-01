import { useState, useEffect } from "react";
// import validator from "./validation";

function useForm(validator, callback){

    const [values,setValues]=useState({});
    const [errors,setErrors]=useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(()=>{

        if(Object.keys(errors).length===0 && isSubmitting){
            callback();                     // This callback function is the submit function(signin() in case of login.jsx) 
        }                               // that should run if the validation is successful 
    },[errors]
)

    function handleSubmit(event){
        if(event){event.preventDefault();}
        console.log(event,"event")
        setErrors(validator(values));
        setIsSubmitting(true);
    }

    function handleChange(event){
        event.persist();
        setValues(values=>({...values, [event.target.name] : event.target.value,})); 
                            //The square brackets used around event.target.name is due to the fact that this property name 
    }                       //is computed property name i.e. this property name will exist when the event occurs. This property is customly entered by user in a sense.
                            // for more info refer to https://javascript.info/object#computed-properties
    return{ values,
            errors,
            handleSubmit,
            handleChange,
    }

}

export default useForm;