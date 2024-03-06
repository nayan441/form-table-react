function validateValues(inputValues) {
    let errors = {};
    // const regex = /^[^0-9]*$/;
    const regex =/^[^\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    const roleList = ["software","developer", "backend", "frontend"]

    { 
        console.log("trim");
        console.log(inputValues.email.length);
        console.log(inputValues.email.trim().length);
        if (inputValues.name == "" || inputValues.name.length == null || inputValues.name.length == undefined){
            errors.name = `Required`;
        }
        else if (inputValues.name.trim().length == 0){
            errors.name = `Name containing all spaces are not allowed`;
        }
        else if (!regex.test(inputValues.name)){
            errors.name = `No digit character allowed`;
        }
    }
    // console.log(inputValues.email.split('@').map(x=>x.length==0));
    // console.log(inputValues.email.split('@'));
    {    
        console.log(inputValues.email.length);   
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ((inputValues.email == "" || inputValues.email == null || inputValues.email == undefined))
        {
            errors.email = `Required`;
        }
        else if (inputValues.email.trim().length == 0)
        {
            errors.email = `Email containing spaces are not allowed`;
        }
        else if (!emailRegex.test(inputValues.email)) 
        {
            errors.email = `invalid email`;
        }

    } 

    {
        if ((inputValues.age == "" || inputValues.age == null || inputValues.age == undefined)){
                errors.age = `Required`;
            } 
        else if (isNaN(inputValues.age)){
                errors.age = `Age should be integer `;
            } 
        else if (inputValues.age < 18){
                errors.age = `Age should be greater than 18  `;
            } 
    }
    {
        if ((inputValues.role == "" || inputValues.role == null || inputValues.role == undefined)){
            errors.role = `Required`;
        } 
        // else if (!roleList.some(word => inputValues.role.toLowerCase().includes(word))){
        //     errors.role = `Role Sholuld have (${roleList} ) keywords `;
        // } 
    }
    
    return errors;
};
export { validateValues };