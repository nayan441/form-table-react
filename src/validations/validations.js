// const validateValues = (inputValues) => {
//     let errors = {};
//     //name
//     (function (){ 
//         const regex = /^[^0-9]*$/;
//         if (inputValues.name.length < 10){
//             errors.name = `Name is too short`;
//         }
//         if (!regex.test(inputValues.name)){
//             errors.name = `Name has digit`;
//         }
//         })();
        
//     //email
//     (function (){ 
//         if (!inputValues.email.includes('gmail')){
//             errors.email = `gmail domain is only allowed  `;
//         }   
//         })();

//     //age
//     (function (){ 
//         if (inputValues.age < 18){
//             errors.age = `Age should be greater than 18  `;
//         }   
//         })();

//     // role
//     (function (){ 
//         const roleList = ["Software","Developer", "Backend", "FrontEnd"]
//         if (!inputValues.role.includes(roleList) ){
//             errors.role = `Role Sholuld have (${roleList} ) keywords `;
//         }   
//         })();

//     return errors;

// }


function validateValues(inputValues) {
    let errors = {};
    const regex = /^[^0-9]*$/;
    const roleList = ["software","developer", "backend", "frontend"]
    {
        if (inputValues.name.length < 10){
            errors.name = `Name is too short`;
        }
        if (!regex.test(inputValues.name)){
            errors.name = `Name has digit`;
        }
    }
    if (!inputValues.email.includes('gmail')){
        errors.email = `gmail domain is only allowed  `;
    }   
    {
    if (isNaN(inputValues.age)){
            errors.age = `Age should be integer `;
        } 
    if (inputValues.age < 18){
            errors.age = `Age should be greater than 18  `;
        } 
    } 
    if (!roleList.some(word => inputValues.role.toLowerCase().includes(word))){
        errors.role = `Role Sholuld have (${roleList} ) keywords `;
    } 
    return errors;
};
export { validateValues };