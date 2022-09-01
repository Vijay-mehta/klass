import React, { useMemo, useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import UpdateStudents from "./UpdateStudents";
import "./Students.css";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import Footer from "../Footer/footer";
import { AiFillEye } from "react-icons/ai";
import ToggleButton from "../../components/Toggle_Button/ToggleButton";
import Modal_Popup from "../../components/modal_renderer/Modal_Popup";

function Students() {
  const [UpdateStudentData, setUpdateCategoriesData] = useState({});
  const [DeleteDeleteId, setDeleteDeleteId] = useState("");
  const [Viewuser, setViewuser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [rowData, setRowData] = useState([]);
  const pagination = true;
  const paginationPageSize = 100;
  const rowHeight = 55;

  const MoodRenderer = (props) => {
    return (
      <span className="profle_img_box">
        <stong>{props.data}</stong>
      </span>
    );
  };

  const SrNoRenderer = (props) => {
    return (
      <>
        <span>{props.node.rowIndex + 1}</span>
      </>
    );
  };

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div
          className="editIcon"
          onClick={() => {
            setUpdateCategoriesData(props.data);
          }}
          data-bs-toggle="modal"
          data-bs-target="#UpdateStudentsData"
        >
          <MdModeEditOutline className="ActionIcon viewicon" />
        </div>

        <div
          className="ViewIcon"
          onClick={() => {
            setViewuser(props.data);
          }}
          data-bs-toggle="modal"
          data-bs-target="#UserViewId"
        >
          <AiFillEye alt="" src="../../images/view.jpg" />
        </div>
        <div
          className="DeleteIcon"
          onClick={() => {
            setDeleteDeleteId(props.data._id);
          }}
          data-bs-toggle="modal"
          data-bs-target="#DeleteStudentData"
        >
          <AiFillDelete className="ActionIcon" />
        </div>
      </div>
    );
  };

  // ------Post API-------//

  function addstudentnew() {
    var data = JSON.stringify({
      name: name,
      email: email,
      mobileNo: mobileNo,
      type: "student",
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/register`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        resetForm();
        getStudents();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobileNo("");
  };

  useEffect(() => {
    getStudents();
  }, []);

  function getStudents() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getstudent`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ------ Delete API -------//

  function studentdeleteData(index) {
    var data = JSON.stringify({
      studentId: index,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deletestudent`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getStudents();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortingoder: "desc",
      sortable: true,
      resizable: true,
    };
  }, []);
  const editdataReloadFunc = () => {
    getStudents();
  };

  const StatusRenderer = (props) => {
    let status = props?.data?.status ? "deactivate" : "activate";
		let message = "Are you sure you want to " + status + " this user?";
    return (
      <>
       <Modal_Popup status={props?.data?.status}
          onClick={() => { changeStudentStatus(props?.data?._id); }}
          message={message}
        />
        {/* <ToggleButton handleToggle={()=>{changeStudentStatus(props?.data?._id);}} status={props?.data?.status}/> */}
      </>
      // <>
      //   {props?.data.status === true ? (
      //     <button
      //       className="btn btn-success btn-sm"
      //       onClick={() => {
      //         changeStudentStatus(props?.data._id);
      //       }}
      //     >
      //       Verified
      //     </button>
      //   ) : (
      //     <button
      //       className="btn btn-danger btn-sm"
      //       onClick={() => {
      //         changeStudentStatus(props?.data._id);
      //       }}
      //     >
      //       Not Verified
      //     </button>
      //   )}
      // </>
    );
  };

  function changeStudentStatus(userId) {
    var data = JSON.stringify({
      userId: userId,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changeprofilestatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getStudents();
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  
const customLowerCaseComparator = (valueA, valueB) => {
  if (typeof valueA === 'string') {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  }

  return (valueA > valueB? 1 : (valueA < valueB ? -1 : 0));
};
  return (
    <>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="container-fluid ">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Users
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New User
                  </button>
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#uploadCSV"
                  >
                    Upload CSV
                  </button>
                </div>
              </h4>
              <div>
                <div
                  className="modal fade"
                  id="createGroup"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Users
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
                            <label className="form-label">User Name</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">User Email</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">User Mobile No</label>

                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={mobileNo}
                                onChange={(e) => {
                                  setMobileNo(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger CancelBtn"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={addstudentnew}
                          type="button"
                          className="btn submitBtn"
                          data-bs-dismiss="modal"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="UpdateStudentsData"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <UpdateStudents
                      updatedData={UpdateStudentData}
                      onEditDataFunction={editdataReloadFunc}
                    />
                  </div>
                </div>
              </div>
              <div
                className="modal fade DeletePopup"
                id="DeleteStudentData"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="">
                            <p>Are you sure you want to delete this User?</p>
                            <button
                              type="button"
                              className="btn btn-danger CancelBtn"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              onClick={() => {
                                studentdeleteData(DeleteDeleteId);
                              }}
                              className="btn submitBtn"
                              data-bs-dismiss="modal"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="UserViewId"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Users Detail{" "}
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
                        <div className="col-12">
                          <div className="card">
                            <div className="card-body border">
                              <div className="profile_box">
                                <div className="profile_box_body">
                                  <div>
                                    {" "}
                                    <h6> User Name : {Viewuser.name}</h6>
                                  </div>
                                  <div>
                                    {" "}
                                    <h6> User Email : {Viewuser.email}</h6>
                                  </div>

                                  <div>
                                    {" "}
                                    <h6> User Mobile : {Viewuser.mobileNo}</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger CancelBtn"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{  width: "100%" }}
                className="ag-theme-alpine tableFix"
              >
                <AgGridReact
                  rowHeight={rowHeight}
                  // style={{ width: "100%", height: "100%;" }}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    moodRenderer: MoodRenderer,
                    srNoRenderer: SrNoRenderer,
                    statusRenderer: StatusRenderer,
                  }}
                >
                  <AgGridColumn
                    width={90}
                    field="SrNo"
                    Srno={true}
                    sortable={false}
                    filter={false}
                    cellRenderer="srNoRenderer"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={100}
                    field="Action"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                     sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={200}
                    field="name"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                     filter={true}
                    cellRenderer="MoodRendererfour"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={250}
                    field="email"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                     filter={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={200}
                    field="mobileNo"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                     filter={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    cellRenderer="statusRenderer"
                    field="status"
                    sortable={true}
                  ></AgGridColumn>
                  
                </AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Students;
