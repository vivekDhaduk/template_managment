import React from "react";
// import Header from "../Components/Header";
import { useState, useEffect } from "react";
import { FaHouseUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const UersList = ({logout}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      setUsers(users);
      console.log(users);
    }
  }, []);
  
  return (
    <div>
      {/* <Header /> */}
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">
            {" "}
            <FaHouseUser /> User Management System{" "}
          </span>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
            <li className="nav-item">
              <Link className="nav-link " to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/" onClick={logout}>
                Logout{" "}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
      <div className="container content">
        <div className="border mt-4 p-4">
          <h3 className="text-center bg-info p-2 mb-3">
            Welcome To User Management System
          </h3>
          {users.map ((users)=>(
          <div className="row">
            
            <div className="col-md-6 d-flex align-items-center">
              <div className="ms-4">
                <h5 key={users.id}>
                  Name   : {users.name}
                </h5>
                <h5>
                  Email  : {users.email}                  
                </h5>
                <h5>
                  Gender : {users.gender}                  
                </h5>
                <h5>
                  Accepted Terms And Conditions : {users.checked}                 
                </h5>
                <hr/>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UersList;














// import React from "react";
// import Header from "../Components/Header";

// const UersList = () => {
//   const profilePIcDefault =
//     "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";
//   return (
//     <div>
//       <Header />
//       <div className="container content">
//         <div className="border mt-4 p-4">
//           <h3 className="text-center bg-info p-2 mb-3">
//             Welcome To User Management System
//           </h3>
//           <div className="row">
//             <div className="col-md-4">
//               <div className="d-flex flex-column align-items-center ">
//                 <img
//                   src={
//                     localStorage.getItem("img")
//                       ? localStorage.getItem("img")
//                       : profilePIcDefault
//                   }
//                   alt="profile_pic"
//                   className="img-thumbnail"
//                   height={200}
//                   width={200}
//                 />
//               </div>
//             </div>
//             <div className="col-md-6 d-flex align-items-center">
//               <div className="ms-4">
//                 <h4>
//                   Name :{" "}
//                   {localStorage.getItem("name")
//                     ? localStorage.getItem("name")
//                     : "NA"}
//                 </h4>
//                 <h4>
//                   Email :{" "}
//                   {localStorage.getItem("email")
//                     ? localStorage.getItem("email")
//                     : "NA"}
//                 </h4>
//                 <h4>
//                   Gender :{" "}
//                   {localStorage.getItem("gender")
//                     ? localStorage.getItem("gender")
//                     : "NA"}
//                 </h4>
//                 <p>
//                   Accepted Terms And Conditions :{" "}
//                   {localStorage.getItem("terms") ? "YES" : "No"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UersList;
