import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import axios from "axios";



function CustomTable() {
  const navigate = useNavigate();
  const baseURL = "http://localhost:4000/users";


  const [userInfo, setUserInfo] = useState(null)
  const [indexId, setIndexId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userDetails")) || []
  //   if (userInfo) {
  //     setUserInfo(userInfo)
  //   }
  // }, [])

  const fetchData = () => {
    axios.get(baseURL).then((response) => {
      setUserInfo(response.data);
    });
  }

  useEffect(() => {
    fetchData()
  }, []);

  const showDeleteDilogBox = (index) => {
    setIndexId(index)
    setShow(true);
  }

  // const handleDelete = (indexId) => {
  //   const newUserList = userInfo?.filter((obj) => obj.id !== indexId);
  //   setUserInfo(newUserList)
  //   setShow(false);
  //   localStorage.setItem('userDetails', JSON.stringify(newUserList));
  // }

  const handleDelete = (indexId) => {
    axios
    .delete(`${baseURL}/${indexId}`)
    .then(() => {
      alert("Post deleted!");
      fetchData()
    });
    setShow(false);
  }


  const handleUpdate = (index) => {
    navigate(`/${index}`)
  }

  return (
    <div className='container'>
      <div className='mt-3 mb-3'>
        <h1>Table Content View</h1>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Index</th>
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
              <td>{index + 1}</td>
              <td>{userObject.id}</td>
              <td>{userObject.name}</td>
              <td>{userObject.age}</td>
              <td>{userObject.email}</td>
              <td>{userObject.role}</td>
              <td>
                <button onClick={() => showDeleteDilogBox(userObject.id)} >Delete</button>
                <button onClick={() => handleUpdate(userObject.id)} >Update</button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Title className='p-4'>Want to delete field {indexId}</Modal.Title>
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