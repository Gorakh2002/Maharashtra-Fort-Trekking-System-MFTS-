const eventvalidation=(values)=>{
    let errors={}
    let date= new Date();
        console.log("Before "+date)
        date.setDate(date.getDate()+10)
        console.log("after "+date)
        var todayDate = date.toISOString().slice(0, 10);
        console.log("formated :"+todayDate);
        
    
    if(!values.eventname){
        errors.eventname="Event Name is required"
    }
    if(!(values.date > todayDate) ){
        errors.date="event date atleast 10 days after creating event date! "
    }
    if(!(parseInt(values.price) > 0)){
        errors.price = "Invalid Price !"
    }
    if(!(parseInt(values.noofdays) > 0)){
        errors.noofdays="Invalid No. of days! "
    }

    if(!values.eventcat){
        errors.eventcat="Category is required"
    }   
    return errors;
}

export default eventvalidation;