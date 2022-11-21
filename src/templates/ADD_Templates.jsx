import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const ADD_Templates = ({logout}) => {
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState("");
  const [userName, setUserName] = useState("");
  const [html, setHtml] = useState("");

  
  function handleSubmit() {
    if (templateName === "" || userName === "" || html === "" ) {
      toast.error("please full fill form");
    } else if (templateName === ""){
      toast.error("templateName Is Required");
    } else if (userName === "") {
      toast.error("userName Is Required");
    } else if (html === "") {
      toast.error("html is Required");
    }else {
      var templates = JSON.parse(localStorage.getItem("template") || "[]");
      var id = Math.floor(1000 + Math.random() * 9000)
      var currentdate = new Date().toISOString().split("T")[0]
      var template = {
        id:id,
        currentdate:currentdate,
        templateName: templateName,
        userName: userName,
        html: html,
      };
      templates.push(template);
      
      localStorage.setItem("template", JSON.stringify(templates));
      setTemplateName("");
      setUserName("");
      setHtml("");
      navigate("/showtemplate");
      toast.success("Template Saved!");
    }
  }

  return (
    <>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">
            {" "}
            <FaHouseUser /> User Management System{" "}
          </span>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " to="/" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
      <form className="container content mt-4" autoComplete="off">
        <h5> 📝 Apply for Registration...</h5>
        <div className="row border p-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Template Name Name
              </label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                required="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                User Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputhtml1" className="form-label">
                html
              </label>
              <textarea 
                type="html"
                rows="3"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                required="true"
              />
            </div>
            <button
              type="submit"
              className="form__submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ADD_Templates;
