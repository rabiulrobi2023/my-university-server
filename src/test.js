// const student = {
//   name: {
//     firstName: 'Abdul',
//     lastName: 'High',
//   },
//   address: {
//     vill: 'Horipur',
//     district: 'Din',
//   },
// };

const err= {
        errors: {
            gender: {
                name: "ValidatorError",
                message: "Gender is required",
                properties: {
                    message: "Gender is required",
                    type: "required",
                    path: "gender"
                },
                kind: "required",
                path: "gender"
            }
        }}

const objToArray = Object.values(err.errors).map(val=>{
    return {
        name: val.name,
        path: val.path
    }
});
console.log(objToArray);
