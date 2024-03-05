import React, {useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./customForm.css";
import { validateValues } from '../../validations/validations';

function CustomForm() {
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false)
  const navigate=useNavigate()
  const [details,setUserDetails]=useState({
    name:'',
    email:'',
    age:'',
    role:'',
  })
  const [errors, setErrors] = useState({});

  const handleChange=(e)=>{
    const {name,value}=e.target
    setUserDetails((pre)=>({...pre,[name]:value}))
  }

  const handleSubmit=(e)=>{
    e.preventDefault()

    setErrors(validateValues(details))

    var oldItems = JSON.parse(localStorage.getItem('userDetails')) || [];
    if(Object.keys(validateValues(details)).length === 0){
    if(!isUpdate){
      oldItems.push(details);
      oldItems.forEach((data, index)=>{data['id']=index})
    }
    else{
      oldItems = oldItems.map((obj)=> (obj.id == id ? details : obj))
    }

    localStorage.setItem('userDetails', JSON.stringify(oldItems));
    navigate('/list')
    setIsUpdate(false)
  }
}

  useEffect(()=>{
    const isLocalStorageId =JSON.parse(localStorage.getItem('userDetails'))?.find((obj) => obj.id == id)
    if(id && isLocalStorageId){
      setUserDetails(isLocalStorageId)
      setIsUpdate(true)
    }
  },[])


  return (  
    <div className='container'>
      <div> <h1>Home View</h1> </div>
      <form className="container m-4 p-2" onSubmit={handleSubmit}>
        <div className="mb-1">
          <label >Name:
            <input
              className='form-control'
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange} />
          </label>
          {errors.name ? <p className="error"> {errors.name}</p> : null}
        </div>
        <div className="mb-1">
          <label >Age:
            <input
              className='form-control'
              type="text"
              name="age"
              value={details.age}
              onChange={handleChange} />
          </label>
              {errors.age ? <p className="error"> {errors.age} </p> : null}
        </div>
        <div className="mb-1">
          <label >Email:
            <input
              className='form-control'
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange} />
          </label >
              {errors.email ? <p className="error"> {errors.email} </p> : null}
        </div>

        <div className="mb-1">
          <label >Role:
            <input
              className='form-control'
              type="text"
              name="role"
              value={details.role}
              onChange={handleChange} />
          </label>
              {errors.role ? <p className="error"> {errors.role} </p> : null}
        </div>
        <button className="btn btn-primary mt-3"   onClick={handleSubmit}>{isUpdate ? "Update" : "Submit"}</button>
        <div className="mt-2">
          <Link to="/list">Go to table</Link>
        </div>
      </form>
    </div>
  )
}


export { CustomForm };