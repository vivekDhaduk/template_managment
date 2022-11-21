import React, { useEffect, useState } from "react";
import { FaHouseUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Editor from "../Components/Editor";
import "../App.css";

const VIEW_Template = ({ logout }) => {
  const { id } = useParams();
  const [template, setTemplate] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [htmlText, setHtmlText] = useState("");
  const [srcDoc, setSrcDoc] = useState(htmlText);
  const [show, setShow] = useState(false);
  const [updatedshow, setUpdatedShow] = useState(false);
  const [updatedtempletID, setUpdatedtemplateID] = useState()
  console.log(updatedtempletID);

  useEffect(() => {
    const template = JSON.parse(localStorage.getItem("template"));
    if (template) {
      setTemplate(template);
    }
    setCurrentUser(template.find((data) => data.id == id));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${htmlText}</body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [htmlText]);

  const onEdit = () => {
    setShow(!show);
    setHtmlText(currentUser?.html);
    setSrcDoc(htmlText);
  };

  const onUpdatedEdit = (updatedhtml,id) => {
    setUpdatedShow(!updatedshow);
    setHtmlText(updatedhtml);
    setSrcDoc(htmlText);
    setUpdatedtemplateID(id)
  };

  const onSave = () => {
    onEdit()
    let updetedTemplate = {
      id: Math.floor(1000 + Math.random() * 9000),
      updatedAT: new Date().toLocaleString(),
      updatedhtml: htmlText,
    };
    const filterdtemplate = template.filter((item) => {
      if (item.id == id) {
        if (item?.updatedtemplate) {
          item.updatedtemplate.push(updetedTemplate);
        } else {
          item.updatedtemplate = [updetedTemplate];
        }
      }
    });
    localStorage.setItem("template", JSON.stringify(template));
  };

  const saveupadetedtemplates = () => {
    currentUser?.updatedtemplate.filter((item) => {
      if(item.id == updatedtempletID){
        item.updatedAT = new Date().toLocaleString()
        item.updatedhtml = htmlText
      }
    })
    localStorage.setItem("template", JSON.stringify(template));
    setUpdatedShow(false)
  }
  return (
    <div className="view-templates-section">
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
            <li className="nav-item">
              <Link className="nav-link " to="/showtemplate">
                View Template
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="card">
        <div className="card-header">Template Detailes</div>
        <div className="card-body">
          <h4 className="card-title">
            Template Name : {currentUser?.templateName}
          </h4>
          <h5 className="card-text">User : {currentUser?.userName}</h5>
          <p className="card-text">Created AT : {currentUser?.currentdate}</p>
          {!show ? (
            <div
              style={{
                border: "solid 1px black",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "20px",
              }}
            >
              <p>{currentUser?.html}</p>
              <button
                className="btn btn-outline-primary editor-footer-btn"
                onClick={() => onEdit()}
              >
                Edit
              </button>
            </div>
          ) : (
            <>
              <div className="editor-code-panel">
                <div className="pane top-pane">
                  <Editor
                    language="xml"
                    displayName="HTML"
                    value={htmlText}
                    onChange={setHtmlText}
                  />
                </div>
                <div className="pane">
                  <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
              <button
                className="btn btn-outline-primary editor-footer-btn"
                onClick={() => onEdit()}
              >
                Close
              </button>
              <button
                className="btn btn-outline-warning editor-footer-save-btn"
                onClick={() => onSave()}
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
      <h3 style={{ textAlign: "center", margin: "20px 20px" }}>
        Upadeted Template Detailes
      </h3>
      {!updatedshow &&
        currentUser?.updatedtemplate?.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-text">Last Update ON : {item?.updatedAT}</h5>
              <div
                style={{
                  border: "solid 1px black",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "20px",
                }}
              >
                <p>{item?.updatedhtml}</p>
                <button
                  className="btn btn-outline-success editor-footer-btn"
                  onClick={() => onUpdatedEdit(item.updatedhtml,item.id)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      {updatedshow && (
        <>
          <div className="editor-code-panel">
            <div className="pane top-pane">
              <Editor
                language="xml"
                displayName="HTML"
                value={htmlText}
                onChange={setHtmlText}
              />
            </div>
            <div className="pane">
              <iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <button
            className="btn btn-outline-primary editor-footer-btn"
            onClick={() => setUpdatedShow(false)}
          >
            Close
          </button>
          <button
            className="btn btn-outline-warning editor-footer-btn"
            onClick={() => saveupadetedtemplates()}
            style={{marginLeft:"20px"}}
          >
            Save upadeted
          </button>
        </>
      )}
    </div>
  );
};

export default VIEW_Template;
