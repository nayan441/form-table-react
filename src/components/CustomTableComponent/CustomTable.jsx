import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';



function CustomTable() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null)
  const [indexId, setIndexId] = useState(null);
  const [show, setShow] = useState(false);
  const [noMatch, setNoMatch] = useState({})

  const handleClose = () => setShow(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userDetails")) || []
    if (userInfo) {
      setUserInfo(userInfo)
    }
  }, [])

  const showDeleteDilogBox = (index) => {
    setIndexId(index)
    setShow(true);
  }

  const handleDelete = (indexId) => {
    const newUserList = userInfo?.filter((obj) => obj.id !== indexId);
    setUserInfo(newUserList)
    setShow(false);
    localStorage.setItem('userDetails', JSON.stringify(newUserList));
  }
  const handleUpdate1 = (index) => {
    handleUpdate(index);
    navigate(`/${index}`)
  }

  const handleUpdate = (indexProp) => {
    // setIsUpdate(true)
    // setIndexId(indexProp)
    const targetUserList = userInfo?.find((obj, index) => index == indexProp);
    // setUserData(targetUserList)
  }
 const requestSearch = (e) =>{
  const userInfo = JSON.parse(localStorage.getItem("userDetails")) || []
  if (userInfo) {
      setUserInfo(userInfo)
    }

  let tempSearch = userInfo.filter(obj=> {
    console.log("tempSearch");
    console.log( obj.name.toLowerCase());
    console.log(e.toLowerCase());
    return obj.name.toLowerCase().trim().includes(e.trim().toLowerCase())
  })
  console.log(tempSearch);
  if (tempSearch.length < 1) {
    setNoMatch({error:"No match found"})
    setUserInfo(userInfo)
  }
  else {
    setNoMatch({})
    setUserInfo(tempSearch)
  }
 }
 const handelPagination = (e,index01)=>{
  console.log("index01");
  console.log(index01);
  let x = JSON.parse(localStorage.getItem("userDetails")).filter((obj,index02)=>{
    console.log("index02");
    console.log(index02);
    if ( (index01*4) <= index02 && index02 < ((index01+1)*4)){
      console.log("obj")
      console.log(obj)
      return obj
    }
  })
  console.log("    x");
  console.log(x);
  setUserInfo(x)

  return 
 }
 
  return (
    <div className='container'>
      <div className='d-inline p-2'>
        <h1>Table Content View</h1>
        <textarea 
        type="text" 
        placeholder="Search by name"
        onChange={(e) => requestSearch(e.target.value) } />
      </div>
      <p className='error'>{ noMatch.error? noMatch.error:""}</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userInfo?.map((userObject, index) => (
            <tr key={index}>
              <td>{userObject.id   +1}</td>
              <td>{userObject.name}</td>
              <td>{userObject.age}</td>
              <td>{userObject.email}</td>
              <td>{userObject.role}</td>
              <td>
                <button onClick={() => showDeleteDilogBox(userObject.id)} >Delete</button>
                <button onClick={() => handleUpdate1(userObject.id)} >Update</button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
      <nav aria-label="...">
  <ul className="pagination ">
    {/* <li className="page-item disabled">
      <span className="page-link">Previous</span>
    </li> */}
    {
  // Using conditional operator to avoid error when userInfo is undefined or null
  userInfo &&
    Array.from({ length: Math.ceil(JSON.parse(localStorage.getItem("userDetails")).length / 4) }, (_, i) => (
      <li className="page-item" key={i}>
        <a className="page-link" onClick={(e)=>handelPagination(e,i)}>
          {i + 1}
        </a>
      </li>
    ))
}

    {/* <li className="page-item">
      <a className="page-link" href="#">Next</a>
    </li> */}
  </ul>
</nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Title className='p-4'>Want to delete field {indexId + 1}</Modal.Title>
        <Modal.Footer>


          <Button className='float-start' variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='float-end' variant="danger" onClick={() => handleDelete(indexId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Link to="/">Go to form</Link>
    </div>
  )
}

export default CustomTable