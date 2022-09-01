import React, { useState } from "react";
import axios from "axios";
import "./Students.css";
import Footer from "../Footer/footer";

const UpdateStudents = (props) => {
  const [name, setName] = useState(props.updatedData?.name);
  const [email, setEmail] = useState("");
  const [mobileNo, setmobileNo] = useState("");

  function updateStudentData() {
    var data = JSON.stringify({
      'userId': props.updatedData?._id,
      'name': name,
      'email': email == '' ? props.updatedData?.email : email,
      'mobileNo': mobileNo == '' ? props.updatedData?.mobileNo : mobileNo
    });
    console.log(data);

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASEURL}/editstudent`,
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        props.onEditDataFunction();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (<>
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Edit User
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div className="modal-body">
      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Edit Name </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.name}
              className="form-control"
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Edit Email Address </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.email}
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Edit Mobile no </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.mobileNo}
              className="form-control"
              onChange={(e) => {
                setmobileNo(e.target.value)
              }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-danger CancelBtn" data-bs-dismiss="modal"
      >Cancel</button>
      <button
        type="submit"
        onClick={updateStudentData}
        className="btn submitBtn" data-bs-dismiss="modal">
        Submit
      </button>
    </div>

  </>)
}

export default UpdateStudents;