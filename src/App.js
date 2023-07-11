import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Pages/LoginPage";
import UsersList from "./Pages/UsersList";
import HomePage from "./Pages/HomePage";
import { Navigate } from "react-router-dom";
import SHOW_Templates from "./templates/SHOW_Templates";
import ADD_Templates from "./templates/ADD_Templates";
import VIEW_Template from "./templates/VIEW_Template";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("Auth");
    u && JSON.parse(u) ? setUser(true) : setUser(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("Auth", user);
  }, [user]);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {!user && ( <>
        <Route exact path="/" element={<LoginPage authenticate={() => setUser(true)} />} /> 
        <Route exact path="/register" element={<HomePage />} />
        <Route exact path="*" element={<Navigate to={"/"} />} />
        </> )}
        {user && ( <>
        <Route exact path="/users" element={<UsersList logout={() => setUser(false)} />} /> 
        <Route exact path="/showtemplate" element={<SHOW_Templates logout={() => setUser(false)} />} /> 
        <Route exact path="/addtemplate" element={<ADD_Templates logout={() => setUser(false)} />} /> 
        <Route exact path="/Viewtemplate/:id" element={<VIEW_Template />} /> 
        <Route exact path="*" element={<Navigate to={"/showtemplate"} />} />

        </> )}

      </Routes>
    </>
  );
}

export default App;

// a = ["a","b","c","d","e","a","c","a","b"]
// result = { };
// for(var i = 0; i < a.length; ++i) {
//     if(!result[a[i]])
//         result[a[i]] = 0;
//     ++result[a[i]];
// }



// import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LoginPage from "./Pages/LoginPage";
// import UsersList from "./Pages/UsersList";
// import HomePage from "./Pages/HomePage";
// function App() {
//   const [user, setUser] = useState(false);

//   useEffect(() => {
//     const u = localStorage.getItem("Auth");
//     u && JSON.parse(u) ? setUser(true) : setUser(false);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("Auth", user);
//   }, [user]);
//   return (
//     <>
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <Routes>
//         {!user && ( <Route exact path="/" element={<LoginPage authenticate={() => setUser(true)} />} /> )}
//         <Route exact path="/register" element={<HomePage />} />
//         {user && ( <Route exact path="/users" element={<UsersList logout={() => setUser(false)} />} /> )}
        
//         <Route exact path="*" element={<LoginPage />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

