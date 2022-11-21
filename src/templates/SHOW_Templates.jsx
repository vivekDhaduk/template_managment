import { useEffect, useState } from "react";
import { FaHouseUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const SHOW_Templates = ({ logout }) => {
  const navigate = useNavigate();
  const [template, setTemplate] = useState([]);

  useEffect(() => {
    const template = JSON.parse(localStorage.getItem("template"));
    if (template) {
      setTemplate(template);
    }
  }, []);

  const deletetemplate = (id) =>  {
    const filterdTemplates=template.filter((item) => {
      return item.id !== id;
    });
    setTemplate(filterdTemplates)
  }

  useEffect (() => {
    localStorage.setItem("template", JSON.stringify(template));
  },[template])
  return (
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
      <div className="searchbar-container">
        <input type="text" className="tem-input" />
        <button
          type="button"
          class="btn btn-success tem-btn"
          onClick={() => {
            navigate("/addtemplate");
          }}
        >
          {" "}
          ADD Templates
        </button>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Template Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {template &&
            template?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.templateName}</td>
                <td>{item.userName}</td>
                <td>{item.currentdate}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      navigate(`/Viewtemplate/${item.id}`);
                    }}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deletetemplate(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SHOW_Templates;
