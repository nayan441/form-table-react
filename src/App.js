
import { CustomForm } from './components/CustomFormComponent/CustomForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About/About';
import { useState } from "react";
import CustomTable from './components/CustomTableComponent/CustomTable';
import NoMatch from './components/About/NoMatch';



function App() {
  // const [userInfo, setUserInfo] = useState([]); // array to store user information  List of objects

  // const [isUpdate, setIsUpdate] = useState(false);
  // const [indexId, setIndexId] = useState(0);  

  // const handleUpdate = (indexProp) => {
  //   console.log("handleUpdate  =  ");
  //   console.log("indexProp  ", indexProp);
  //   setIsUpdate(true)
  //   setIndexId(indexProp)
  //   const targetUserList = userInfo?.find((obj, index) => index == indexProp);

  //   console.log("targetUserList");
  //   console.log(targetUserList);

  //   setUserData(targetUserList)
  // }



  // const handleDelete = (indexId) => {
  //   const newUserList = userInfo?.filter((obj, index) => index !== indexId);
  //   setUserInfo(newUserList)
  //   // localStorage.setItem('userInfo', JSON.stringify(newUserList ));
  // }
  return (

    <div className="App">
      <Router>
        <Routes>
            <Route path='/:id?' element={<CustomForm />}/>
            <Route path='/list' element={<CustomTable />}/>
          {/* <Route path="/" element={
          <CustomForm
            isUpdate={isUpdate}
            handleSubmit={handleSubmit}
            userInfo={userInfo}
            handleChange={handleChange}
            userData={userData} />
          } />

          <Route path="/view" element={<CustomTable
            handleSubmit={handleSubmit}
            isUpdate={isUpdate}
            userInfo={userInfo}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
