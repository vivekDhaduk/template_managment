import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App from "../App";
import VIEW_Template from "../templates/VIEW_Template";

describe("test case for view template", () => {
  it("App test case", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
  it("view template test case", () => {
    render(
      <BrowserRouter>
        <VIEW_Template />
      </BrowserRouter>
    );
  });
});
