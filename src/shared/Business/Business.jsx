import React, { useState, useMemo, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import UpdateBusiness from "./updateBusiness";
import { MdModeEditOutline } from 'react-icons/md';
import { AiFillEye, AiFillDelete, AiFillSetting } from 'react-icons/ai';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Business.css";
import "../Students/Students.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import ToggleButton from "../../components/Toggle_Button/ToggleButton";
import Modal_Popup from "../../components/modal_renderer/Modal_Popup";
// import './bootstrap/dist/css/bootstrap.min.css';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const SrNoRenderer = (props) => {
  return <><span>{props.node.rowIndex + 1}</span></>;
}

const NameRenderer = (props) => {
  return <><span>{props.data?.name}</span></>;
}

const UniqueIdRenderer = (props) => {
  return <><span>{props?.data?.uniqueId}</span></>;
}

const BusinessEmailRenderer = (props) => {
  return <><span>{props.data?.email}</span></>;
}

const MobileNoRenderer = (props) => {
  if (props.data?.mobileNo === 0) {
    return <><span></span></>;
  }
  else {
    return <><span>{props.data?.mobileNo}</span></>;
  }
}

const BusinessNameRenderer = (props) => {
  return <><span>{props.data?.classData[0]?.businessName}</span></>;
}

const srNoValueGetter = (params) => {
  return (params.node.rowIndex + 1);
}

const nameValueGetter = (params) => {
  return (params?.data?.name);
}

const emailValueGetter = (params) => {
  return (params?.data?.email);
}

const mobileNoValueGetter = (params) => {
  return (params?.data?.mobileNo);
}

const TagsRenderer = (props) => {
  return (<span>{props?.data?.classData[0]?.tags?.join(", ")}</span>);
};

const CategoryRenderer = (props) => {
  if (typeof props?.data?.classData[0]?.businesssubCategory === "string") {
    return (<span>{props?.data?.classData[0]?.businesssubCategory}</span>);
  }
  else {
    return (<span>{props?.data?.classData[0]?.businesssubCategory?.join(", ")}</span>);
  }
};

const CreationRenderer = (props) => {
  let display = props.data?.createdAt.split("T")[0];
  return (<span>{display}</span>);
};

const UpdationRenderer = (props) => {
  let display = props.data?.updatedAt.split("T")[0];
  return (<span>{display}</span>);
};

const CreatedByRenderer = (props) => {
  return (<span>{props?.data?.createdBy}</span>);

};

function Business() {
  const [uniqueId, setuniqueId] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [country, setcountry] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [rowData, setRowData] = useState([]);
  const [UpdateBusinessData, setUpdateBusinessData] = useState({});
  const [Businessview, setBusinessview] = useState([]);
  const [DeleteBusinessId, setDeleteBusinessId] = useState('');
  const [DeleteClassId, setDeleteClassId] = useState('');
  const [reset, setReset] = useState(true);
  const pagination = true;
  const paginationPageSize = 100;
  const rowHeight = 55;

  // console.log(businessEmail, "StartingEmail");

  // ----Delete API ---//

  function businessdeleteData(businessId, classId) {
    var data = JSON.stringify({
      businessId: businessId,
      classId: classId
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deletebusiness`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getbusinessnew();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ----Create business API ---//

  function Addbusiness() {
    console.log(businessName, "BusinessName")
    var data = JSON.stringify({
      'uniqueId': uniqueId,
      'name': name,
      'email': businessEmail,
      "businessName": businessName,
      'password': businessPassword,
      'mobileNo': mobileNo ? mobileNo : 0,
      'type': "business",
      'address1': address1,
      'address2': address2,
      'country': country,
      'postalCode': postalCode,
      'createdBy' : "Admin"
    });
    // console.log(data, "data inisde add business")
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
        setReset(!reset);
        resetForm();
        // console.log(response.data, "addBusiness")
        getbusinessnew();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const resetForm = () => {
    setuniqueId('');
    setName('');
    setBusinessEmail('');
    setBusinessName('');
    setMobileNo('');
    setaddress1('');
    setaddress2('');
    setcountry('');
    setpostalCode('');
    setBusinessPassword('');
  }
  useEffect(() => {
    getbusinessnew();
  }, []);

  // ---- Get business API ---//
  function getbusinessnew() {
    console.log("denialRan");
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getbusiness`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.data, "response.data")
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---- Get Postal code API ---//
  function getAddressPostcode() {
    var data = JSON.stringify({
      'postalCode': postalCode,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/getAddressPostcode`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        setaddress1(response.data.addressfrompostcode.address[0].ADDRESS);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const token = `${localStorage.getItem('token')}`
  let encoded = encodeURIComponent(token);

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div className="editIcon" onClick={(e) => {
          e.preventDefault();
          window.open(`http://angularklassbook.s3-website.us-east-2.amazonaws.com/#/admin/business-details/${props?.data?._id}/${encoded}`, '_blank', 'noopener,noreferrer')
        }} >
          {/* //http://angularklassbook.s3-website.us-east-2.amazonaws.com */}
          <AiFillSetting className="ActionIcon" />
        </div>

        <div className="editIcon" onClick={() => { setUpdateBusinessData(props.data); }} data-bs-toggle="modal"
          data-bs-target="#UpdateBusiness">
          <MdModeEditOutline className="ActionIcon" />
        </div>

        <div className="ViewIcon" onClick={() => {
          setBusinessview(props.data);
        }} data-bs-toggle="modal"
          data-bs-target="#BusinessViewId">
          <AiFillEye
            className="ActionIcon"
          />
        </div>

        <div className="DeleteIcon" onClick={() => {
          setDeleteBusinessId(props.data?.admin_id?._id);
          setDeleteClassId(props.data?._id);
        }} data-bs-toggle="modal"
          data-bs-target="#BusinessDeleteId">
          <AiFillDelete className="ActionIcon"
          />
        </div>
      </div>
    );
  };
  // console.log(Businessview, "Businessview")

  const StatusRenderer = (props) => {
    // console.log(props.data.admin_id?._id,"statusRenderer");
    let status = props?.data?.status ? "deactivate" : "activate";
    let message = "Are you sure you want to "+status+" this business?";
    return (
      <>
        <Modal_Popup status={props?.data?.status}
          onClick={() => {changeBusinessStatus(props?.data?._id);}}
          message={message}
          />
        {/* <ToggleButton handleToggle={() => { changeBusinessStatus(props?.data?._id); }} status={props?.data?.status} 
        data-bs-toggle="modal"
        data-bs-target="#BusinessDeleteId" /> */}
      </>
    );
  }

  const ClassStatusRenderer = (props) => {
    // console.log(props.data.admin_id?._id,"statusRenderer");
    let status = props?.data?.classData[0]?.status ? "deactivate" : "activate";
    let message = "Are you sure you want to "+status+" this class?"
    return (
      <>
      <Modal_Popup status={props?.data?.classData[0]?.status}
          onClick={() => {changeClassStatus(props?.data?.classData[0]?._id);}}
          message={message}
          />
        {/* <ToggleButton handleToggle={() => { changeClassStatus(props?.data?.classData[0]?._id); }} status={props?.data?.classData[0]?.status} /> */}
      </>
    );
  }

  const ClassTrendingRender = (props) => {
    let status = props?.data?.classData[0]?.trending ? "non-trending" : "trending";
    let message = "Are you sure you want to set this class to "+status+"?"
    return (
      <>
      <Modal_Popup status={props?.data?.classData[0]?.trending}
          onClick={() => {changeClassTrendingStatus(props?.data?.classData[0]?._id);}}
          message={message}
          />
        {/* <ToggleButton handleToggle={() => { changeClassTrendingStatus(props?.data?.classData[0]?._id); }} status={props?.data?.classData[0]?.trending} /> */}
      </>
    );
  }


  const defaultColDef = useMemo(() => {
    return {
      // flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  function changeBusinessStatus(userId) {
    console.log("changeBusiness");
    var data = JSON.stringify({
      "userId": userId,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changeprofilestatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        getbusinessnew();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function changeClassTrendingStatus(classId) {
    var data = JSON.stringify({
      "classId": classId,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changeClasstrendingstatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "changeClassstatus")
        getbusinessnew();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function changeClassStatus(classId) {
    var data = JSON.stringify({
      "classId": classId,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changeClassStatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "changeClassstatus")
        getbusinessnew();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // On Enter Calling Api //
  const handleKeypress = e => {
    if (e.keyCode === 13) {
      getAddressPostcode();
    }
  };

  const editdataReloadFunc = () => {
    getbusinessnew();
  }

  const customLowerCaseComparator = (valueA, valueB) => {
    if (typeof valueA === 'string') {
      return valueA?.toLowerCase().localeCompare(valueB?.toLowerCase());
    }

    return (valueA > valueB ? 1 : (valueA < valueB ? -1 : 0));
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
                Business
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New Business
                  </button>
                  <button className="btn btn-theme btn-sm" data-bs-toggle="modal" data-bs-target="#UploadCSV">Upload CSV</button>
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

                  <form autoComplete="off">
                    <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Add Business
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          // onClick={resetForm}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            {/* <div className="col-md-12 mb-4">
                            <label className="form-label"> Unique Id</label>
                            <div className="position-relative">
                              <input
                                value={uniqueId}
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                  setuniqueId(e.target.value);
                                }}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              >
                              </div>
                            </div>
                          </div> */}

                            <div className="col-md-12 mb-4">
                              <label className="form-label"> Class/ Business/ Institute Name</label>
                              <div className="position-relative">
                                <input
                                  key={reset}
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => {
                                    setBusinessName(e.target.value);
                                  }}
                                />
                                <div
                                  className="hint_box"
                                  style={{ display: "block" }}
                                >
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12 mb-4">
                              <label className="form-label"> Contact Person Name</label>
                              <div className="position-relative">
                                <input
                                  key={reset}
                                  defaultValue=""
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                />
                                <div
                                  className="hint_box"
                                  style={{ display: "block" }}
                                >
                                </div>
                              </div>
                            </div>





                            <div className="col-md-12 mb-4">
                              <label className="form-label"> Mobile No</label>
                              <div className="position-relative">

                                <input
                                  key={reset}
                                  value={mobileNo}
                                  type="number"
                                  className="form-control"
                                  onChange={(e) => {
                                    setMobileNo(e.target.value);
                                  }}
                                />
                                <div
                                  className="hint_box"
                                  style={{ display: "block" }}
                                >
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12 mb-4">
                              <label className="form-label"> Business Email</label>
                              <div className="position-relative">
                                <input
                                  autoComplete="new-password"
                                  defaultValue=""
                                  key={reset}
                                  value={businessEmail}
                                  type="email"
                                  className="form-control"
                                  onChange={(e) => {
                                    setBusinessEmail(e.target.value);
                                  }}
                                />
                                <div
                                  className="hint_box"
                                  style={{ display: "block" }}
                                >
                                </div>
                              </div>
                            </div>

                            <form autoComplete="new-password">


                              <div className="col-md-12 mb-4">
                                <label className="form-label">Password</label>
                                <div className="position-relative">
                                  <input
                                    key={reset}
                                    autoComplete="new-password"
                                    type="password"
                                    value={businessPassword}
                                    name="password"
                                    className="form-control"
                                    onChange={(e) => {
                                      setBusinessPassword(e.target.value);
                                    }}
                                  />
                                  <div
                                    // className="hint_box"
                                    style={{ display: "block" }}
                                  >
                                  </div>
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn CancelBtn" data-bs-dismiss="modal"
                          >Cancel</button>
                          <button
                            onClick={Addbusiness}
                            type="button"
                            className="btn submitBtn" data-bs-dismiss="modal"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal fade" id="UpdateBusiness"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <UpdateBusiness updatedData={UpdateBusinessData} onEditDataFunction={editdataReloadFunc} />
                  </div>
                </div>
              </div>
              <div className="modal fade DeletePopup" id="BusinessDeleteId" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="">
                            {" "}
                            <p>
                              Are you sure you want to delete this business
                            </p>
                            <button type="button" className="btn btn-danger CancelBtn" data-bs-dismiss="modal"
                            >Cancel</button>
                            <button type="submit" onClick={() => { businessdeleteData(DeleteBusinessId, DeleteClassId); }} data-bs-dismiss="modal" className="btn submitBtn">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="BusinessViewId"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label"> Business Detail </label>
                          <div className="position-relative">
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label"> Name </label>
                          <div className="position-relative">
                            <input
                              type="text"
                              defaultValue={Businessview.name}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label"> Email</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              defaultValue={Businessview.email}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Mobile No</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              defaultValue={Businessview.mobileNo}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Postal Code</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              defaultValue={Businessview.postalCode}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Address1</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              defaultValue={Businessview.address1}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Address2</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              defaultValue={Businessview.address2}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label"> Country </label>
                          <div className="position-relative">
                            <input
                              type="text"
                              defaultValue={Businessview.country}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="tableFix "> */}
              <div
                style={{ width: "100%" }}
                className="ag-theme-alpine tableFix"
              >
                <AgGridReact style={{ width: '100%', height: '100%;' }}
                  rowHeight={rowHeight}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  // domLayout="autoHeight"
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    srNoRenderer: SrNoRenderer,
                    uniqueIdRenderer: UniqueIdRenderer,
                    nameRenderer: NameRenderer,
                    businessEmailRenderer: BusinessEmailRenderer,
                    mobileNoRenderer: MobileNoRenderer,
                    businessNameRenderer: BusinessNameRenderer,
                    statusRenderer: StatusRenderer,
                    classStatusRenderer: ClassStatusRenderer,
                    classTrendingRenderer: ClassTrendingRender,
                    tagsRenderer: TagsRenderer,
                    categoryRenderer: CategoryRenderer,
                    creationRenderer: CreationRenderer,
                    updationRenderer: UpdationRenderer,
                    createdByRenderer: CreatedByRenderer,
                  }}
                >
                  <AgGridColumn
                    width={90}
                    field="SrNo"
                    pinned="left"
                    cellRenderer="srNoRenderer"
                    sortable={true}
                    filter={false}
                    valueGetter={srNoValueGetter}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={150}
                    field="Actions"
                    pinned="left"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={150}
                    field="UniqueId"
                    pinned="left"
                    cellRenderer="uniqueIdRenderer"
                    colId="params"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={100}
                    field="name"
                    pinned="left"
                    cellRenderer="nameRenderer"
                    valueGetter={nameValueGetter}
                    sortable={true}
                    comparator={customLowerCaseComparator}
                  ></AgGridColumn>

                  <AgGridColumn
                    field="businessName"
                    pinned="left"
                    width={150}
                    cellRenderer="businessNameRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={300}
                    field="email"
                    cellRenderer="businessEmailRenderer"
                    valueGetter={emailValueGetter}
                    sortable={true}
                    comparator={customLowerCaseComparator}
                  ></AgGridColumn>

                  <AgGridColumn
                    field="mobileNo"
                    cellRenderer="mobileNoRenderer"
                    valueGetter={mobileNoValueGetter}
                    sortable={true}
                    comparator={customLowerCaseComparator}
                  ></AgGridColumn>

                  <AgGridColumn
                    field="status"
                    headerName="Permanent Activation/ Deactivation"
                    cellRenderer="statusRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    headerName="Class Status"
                    field="status"
                    cellRenderer="classStatusRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    headerName="Class Trending"
                    field="trending"
                    cellRenderer="classTrendingRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    field="tags"
                    cellRenderer="tagsRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    headerName="Category"
                    field="businesssubCategory"
                    cellRenderer="categoryRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    field="createdAt"
                    headerName="Created On"
                    cellRenderer="creationRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    field="updatedAt"
                    headerName="Updated On"
                    cellRenderer="updationRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    field="CreatedBy"
                    cellRenderer="createdByRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    field="UpdatedBy"
                    // cellRenderer="createdByRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={false}
                  ></AgGridColumn>

                </AgGridReact>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  );
}

export default Business;
