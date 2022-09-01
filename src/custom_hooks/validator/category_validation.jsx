function validation (values){

    let errors = {};

    if(!values.category){
        errors.category="The category field cannot be empty!";
    }

    if(!values.image){
        errors.image = "Please select an icon image.";
    }
    else if(!/\S+.+(jpe?g|.png|.ico|svg)/g.test(values.image)){
        console.log("imgerror")
        errors.image = "You have not selected the correct format"
    }

    return errors;
}

export default validation;
