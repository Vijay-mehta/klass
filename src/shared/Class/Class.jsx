import React, { useState, useMemo, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import UpdateClass from "./UpdateClass"
import Select from "react-select";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import "../Students/Students.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Class.css";
import "./Add_Update_Class.css"
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { AiFillEye } from "react-icons/ai";
import { useHistory } from "react-router-dom";

const SrNoRenderer = (props) => {
  return (
    <>
      <span>{props.node.rowIndex + 1}</span>
    </>
  );
};


function Class() {
  const [rowData, setRowData] = useState([]);
  const [UpdateBusinessData, setUpdateBusinessData] = useState({});
  const [Businessview, setBusinessview] = useState([]);
  const [DeleteBusinessId, setDeleteBusinessId] = useState("");
  const [businessName, setBusinessName] = useState();
  const [businessId, setbusinessId] = useState("");
  const [image, setimage] = useState("");
  const [Classview, setClassview] = useState([]);
  const [aboutBusiness, setAboutBusiness] = useState("");
  const [getCategoryId, setgetCategoryId] = useState("");
  const [getSubCategoryId, setgetSubCategoryId] = useState("");
  const [webAddress, setWebAddress] = useState("");
  const [rowData1, setRowData1] = useState([]);
  const [getbusiness, setgetbusiness] = useState([]);
  const [rowDatasubcategory, setRowDatasubcategory] = useState([]);
  const [options, setoptions] = useState([]);
  const [optionsSubcategory, setoptionsSubcategory] = useState([]);
  const [selectedOptionSub, setselectedOptionSub] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);
  let history = useHistory();


  const pagination = true;
  const paginationPageSize = 100;
  const rowHeight = 55;

  // ---- Class Delete API ---//

  function deleteclass(id) {
    var data = JSON.stringify({
      classId: id,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteclass`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getclass();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---- Class Add API ---//

  // function AddClasses() {
  //   console.log(selectedOptionone,optionsSubcategory,"help")
  //   var data = new FormData();
  //   data.append("userId", businessId);
  //   data.append("image", image);
  //   data.append("businessName", businessName);
  //   data.append("aboutBusiness", aboutBusiness);
  // //data.append("businessCategory", getCategoryId);
  //   data.append("businesssubCategory", optionsSubcategory);
  //   data.append("webAddress", webAddress);
  //   data.append("tags", selectedOptionone);

  //   console.log(data, businessId, image, businessName, aboutBusiness, getCategoryId, optionsSubcategory, selectedOptionone, "AddClasses")
  //   var config = {
  //     method: "post",
  //     url: `${process.env.REACT_APP_BASEURL}/addclasses`,
  //     headers: {
  //       Authorization: localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };
  //   axios(config)
  //     .then(function (response) {
  //       console.log(response.data, "addclasses");
  //       getclass();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  useEffect(() => {
    getclass();
    getbusinessnew();
    getnew();
    getnewtag();
    getSubcategory();
  }, []);

  // ---- Class get API ---//

  function getclass() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getclass`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data, "getclass");
        setRowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---- business get API ---//

  function getbusinessnew() {
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
        setgetbusiness(response.data.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---- category get API ---//

  function getnew() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setRowData1(response.data.CategoryData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---- subcategory get API ---//

  



  // ---- react-select library methods  ---- //

  const handlechange = (e) => {
    console.log(e, "handlechange");

    setgetCategoryId(e._id);
    getSubcategory(e._id);
  };
  const handleBusinessName = (e) => {
    setbusinessId(e._id);
  };

  const handleSubCategory = (event) => {
    let array = [];
    event.forEach(item=>{
      array.push(item.value)
    });
    setoptionsSubcategory(array);
    console.log("sc",array)
    
  };

  const handlechangetag = (event) => {
    let array = [];
    event.forEach((value) => {
      array.push(value.value);
    });
    setselectedOptionone(array);

    console.log(array, "array");
  };

  // ---- Get tag API ---//

  function getnewtag() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/gettag`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        response.data.tagData.forEach((tag, index) => {
          options.push({ value: tag._id, label: tag.tags });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  // -----GET SUBCATEGORY---//

  const getSubcategory = (subcategoryID) => {
    console.log(subcategoryID, "getSubcategory")
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getSubcategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "123")
        let subcategory = [];
        const categorydata = response.data.SubcategoryData;
        categorydata.map((subCat, index) => {
          rowDatasubcategory.push({ value: subCat._id, label: subCat.subCategory })
        })
        console.log(rowDatasubcategory,"ctdata")
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  const ChildMessageRenderer = (props) => {
    console.log(props.data, "ChildMessageRenderer");
    return (
      <div className="iconActionList">
        <div className="editIcon">
          <MdModeEditOutline
            className="ActionIcon"
            onClick={() => {
              history.push({
                pathname:`UpdateClass/${props.data._id}`,
                state: {details : props.data}
              });
              //setUpdateBusinessData(props.data);
            }}
            
          />
        </div>
        <div className="ViewIcon">
          <AiFillEye
            className="ActionIcon"
            onClick={() => {
              console.log(props, "9090-9")
              setClassview(props.data);
            }}
            data-bs-toggle="modal"
            data-bs-target="#ClassViewId"
          />
        </div>
        <div className="DeleteIcon">
          <AiFillDelete
            className="ActionIcon"
            onClick={() => {
              setDeleteBusinessId(props.data._id);
            }}
            data-bs-toggle="modal"
            data-bs-target="#BusinessDeleteId"
          />
        </div>
      </div>
    );
  };

  const ImageRenderer = (props) => {
    console.log(props.data, "ImageRenderer")
    return (
      <span className="profle_img_box">
        <img className="profile_img_table" src={props.data.image[0]} alt="icon" />
      </span>
    );
  };

  const BusinessCategoryRenderer = (props) => {
    return (
      <span className="profle_img_box">
        <stong>{props.data.businessCategory?.category}</stong>
      </span>
    );
  };

  const BusinessSubCategoryRenderer = (props) => {
    return (
      <span className="profle_img_box">
        <stong>{props.data.businesssubCategory?.subCategory}</stong>
      </span>
    );
  };

  const StatusRenderer = (props) => {
    console.log(props, "fghijokp")
    return <>
      {props.data.status === true ? <button className="btn btn-success btn-sm" onClick={() => { changeClassstatus(props.data._id) }} >Verified</button> : <button className="btn btn-danger btn-sm" onClick={() => { changeClassstatus(props.data._id) }}>Not Verified</button>}
    </>;
  }
  const TrendingRender = (props) => {
    console.log(props, "fghijokp")
    return <>
      {props.data.trending === true ? <button className="btn btn-success btn-sm" onClick={() => { changeClasstrendingstatus(props.data._id) }} >Trending</button> : <button className="btn btn-danger btn-sm" onClick={() => { changeClasstrendingstatus(props.data._id) }}>Not Trending</button>}
    </>;
  }
  function changeClassstatus(classId) {
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
        getclass();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function changeClasstrendingstatus(classId) {
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
        getclass();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const editdataReloadFunc = () => {
    getclass();
  }

  let viewTags = Classview?.tags?.map((tag) => {
    return tag?.tags.trim()
  })

  let viewCategory = Classview?.businesssubCategory?.map((category) => {
    return category?.subCategory?.trim()
  })


  const customLowerCaseComparator = (valueA, valueB) => {
    if (typeof valueA === 'string') {
      return valueA?.toLowerCase().localeCompare(valueB?.toLowerCase());
    }
  
    return (valueA > valueB? 1 : (valueA < valueB ? -1 : 0));
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Class
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    onClick={()=>{history.push("./AddClass")}}
                    // data-bs-toggle="modal"
                    // data-bs-target="#createGroup"
                  >
                    Add New Class
                  </button>
                  <button
                    className="btn btn-theme btn-sm"
                    // data-bs-toggle="modal"
                    // data-bs-target="#UploadCSV"
                  >
                    Upload CSV
                  </button>
                </div>
              </h4>
              {/* <div>
                <div
                  className="modal fade"
                  id="createGroup"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Class
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
                          <div className="col-md-12 mb-4">
                            <div className="col-md-12 mb-4">
                              <label className="form-label">
                                Select Business
                              </label>
                              <div className="position-relative">
                                <Select
                                  onChange={handleBusinessName}
                                  options={getbusiness}
                                  getOptionLabel={(e) => (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span style={{ marginLeft: 5 }}>
                                        {e.name}
                                      </span>
                                    </div>
                                  )}
                                />
                                <div
                                  className="hint_box"
                                  style={{ display: "block" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <label className="form-label"> Class Name</label>
                            <div className="position-relative">
                              <input
                                value={businessName}
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                  setBusinessName(e.target.value);
                                }}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <label className="form-label">
                              {" "}
                              About Class
                            </label>
                            <div className="position-relative">
                              <input
                                value={aboutBusiness}
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                  setAboutBusiness(e.target.value);
                                }}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <label className="form-label">
                              Select Category Group
                            </label> 
                            <div className="position-relative">
                              <Select
                                onChange={handlechange}
                                options={rowData1}
                                getOptionLabel={(e) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span style={{ marginLeft: 5 }}>
                                      {e.category}
                                    </span>
                                  </div>
                                )}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <label className="form-label">
                              Business Category
                            </label>
                            <div className="position-relative">
                              <Select
                                isMulti
                                options={rowDatasubcategory}
                                onChange={handleSubCategory}
                                
                              />

                              <Select
                              isMulti
                              options={optionsSubcategory}
                              onChange={(e) => handlechangeSubcategory(e)}
                              />


                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">Select Tags</label>

                            <Select
                              isMulti
                              options={options}
                              onChange={(e) => handlechangetag(e)}
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">
                              Images
                            </label>
                            <div className="position-relative">
                              <div>
                                <input
                                multiple
                                  type="file"
                                  onChange={(e) => setimage(e.target.files)}
                                  className="form-control"
                                />
                              </div>
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>

                          <div className="col-md-12 mb-4">
                            <label className="form-label">WebAddress</label>
                            <div className="position-relative">
                              <input
                                value={webAddress}
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                  setWebAddress(e.target.value);
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
                        <button
                          type="button"
                          className="btn btn-danger CancelBtn"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={AddClasses}
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
                <div
                  className="modal fade"
                  id="UpdateBusiness"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                
                  </div>
                </div>
              </div> */}
              <div
                className="modal fade DeletePopup"
                id="BusinessDeleteId"
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
                            {" "}
                            <p>Are you sure you want to delete this business</p>
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
                                deleteclass(DeleteBusinessId);
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
                id="ClassViewId"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Class Detail                      </h5>
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
                                <img
                                  src={Classview.image}
                                  className="profile_img"
                                />
                                <div className="profile_box_body">

                                  {/* <div> <h4> Category Group : {Classview.businessCategory?.category}</h4></div><br /> */}

                                  {/* <div>   <h4>Category : {Classview.businesssubCategory?.subCategory}</h4> </div> */}


                                  {/* <a>
                                    <i className="mdi mdi-phone"></i>{" "}
                                    {Classview.name}
                                  </a> */}
                                  {/* <a>
                                    <i className="mdi mdi-map-marker"></i>{" "}
                                    {Classview.endTime}
                                  </a> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-body border">
                              <div>
                                <ul className="nav nav-pills" role="tablist">
                                  <li className="nav-item">
                                    <a
                                      className="nav-link active"
                                      data-bs-toggle="tab"
                                      href="#home"
                                      role="tab"
                                    >
                                      <span>Class Details</span>
                                    </a>
                                  </li>
                                </ul>
                                <div className="tab-content pt-3">
                                  <div
                                    className="tab-pane active"
                                    id="home"
                                    role="tabpanel"
                                  >
                                    <table className="table table-bordered table_fix_width">
                                      <tbody>
                                        <tr>
                                          <th>Class Name</th>
                                          <td>{Classview.admin_id?.name}</td>
                                        </tr>

                                        <tr>
                                          <th>Class About</th>
                                          <td><div dangerouslySetInnerHTML={{__html:Classview.aboutBusiness}} /></td>  
                                          {/* <div>{Classview.aboutBusiness}</div> */}
                                        </tr>
                                        <tr>
                                          <th>Tag</th>
                                          <td>{viewTags?.join(", ")}</td>
                                        </tr>

                                        <tr>
                                          <th>Category</th>
                                          <td>{viewCategory?.join(", ")}</td>
                                        </tr>

                                        <tr>
                                          <th>WebAddress</th>
                                          <td>{Classview.webAddress}</td>
                                        </tr>
                                      </tbody>
                                    </table>
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
                style={{ height: 440, width: "100%" }}
                className="ag-theme-alpine"
              >
                {/* {console.log(rowData,"rowData")} */}
                <AgGridReact
                  style={{ width: "100%", height: "100%;" }}
                  rowHeight={rowHeight}
                  // pagination={pagination}
                  // paginationPageSize={paginationPageSize}
                  rowData={rowData}
                  // domLayout="autoHeight"
                  defaultColDef={defaultColDef}
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    srNoRenderer: SrNoRenderer,
                    businessCategoryRenderer: BusinessCategoryRenderer,
                    businessSubCategoryRenderer: BusinessSubCategoryRenderer,
                    statusRenderer: StatusRenderer,
                    imageRenderer: ImageRenderer,
                    TrendingRender: TrendingRender
                  }}
                >
                  <AgGridColumn
                    width={90}
                    field="SrNo"
                    cellRenderer="srNoRenderer"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                   <AgGridColumn
                    width={310}
                    field="Actions"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    cellRenderer="imageRenderer"
                    field="Images"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={200}
                    field="businessName"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    // floatingFilter={true}                  
                  ></AgGridColumn>
             
                  {/* <AgGridColumn
                    cellRenderer="businessSubCategoryRenderer"
                    field="business Category"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    floatingFilter={true}                  
                  ></AgGridColumn> */}
            
                  <AgGridColumn
                    cellRenderer="statusRenderer"
                    field="status"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                  ></AgGridColumn>
                  <AgGridColumn
                    cellRenderer="TrendingRender"
                    field="trending"
                    sortable={true}
                    comparator={customLowerCaseComparator}
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

export default Class;