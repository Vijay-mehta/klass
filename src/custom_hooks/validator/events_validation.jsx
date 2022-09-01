function validator(values){

    let errors={}

    if(!values.title){
        errors.title = "The title cannot be empty!"
    }
    

    if(!values.image){
        errors.image = "Please select an image!"
    }
    else if(!/\S+(.jpe?g|.png|.svg|.ico)/g.test(values.image)){
        errors.image = "Please select the correct format! (.jpeg, .jpg, .ico, .svg, .png)"
    }

    if(!values.start_time){
        errors.start_time = "Please select the start time."
    }

    if(!values.end_time){
        errors.end_time = "Please select the end time."
    }
    else if(values.start_time > values.end_time){
        errors.end_time = "Start time cannot be later than the end time"
    }

    if(!values.date){
        errors.date = "Please select a date."
    }

    if(!values.price){
        errors.price = "Please select a price."
    }
    

    return errors
}

export default validator;