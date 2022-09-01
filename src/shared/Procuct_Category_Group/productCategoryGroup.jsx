import React, { useState, useMemo, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./productCategoryGroup.css";
import Updatecategories from "./updateProductCategoryGroup";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";

const CategoryNameRenderer = (props) => {
  return (
    <span className="profle_img_box">
      <span>{props.data.category}</span>
    </span>
  );
};

const IconImageRenderer = (props, ref) => {
  return (
    <span className="profle_img_box">
      <img className="profile_img_table" src={props.data.image} alt="icon" />
    </span>
  );
};

const SrNoRenderer = (props, ref) => {
  return <span className="profle_img_box">{props.rowIndex + 1}</span>;
};

const StatusRenderer = (props) => {
  return (
    <span className="status">
      <label className="switch">
        <input className="switch-input" type="checkbox" />
        <span
          className="switch-label"
          data-on="Active"
          data-off="Deactive"
        ></span>
        <span className="switch-handle"></span>
      </label>
    </span>
  );
};

function Product_Category_Group() {
  const [UpdateCategoriesData, setUpdateCategoriesData] = useState();
  const [DeleteCategoriesId, setDeleteCategoriesId] = useState("");
  const [rowData, setRowData] = useState([]);

  // const [DetailCategoriesId, setDetailCategoriesId] = useState([]);
  // const [imageCategoriesId, setImageCategoriesId] = useState([]);

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div className="editIcon"
         onClick={() => {
          setUpdateCategoriesData(props.data);
        }}
        data-bs-toggle="modal"
        data-bs-target="#UpdateCategoriesData"
        >
          <MdModeEditOutline
            className="ActionIcon"
           
          />
        </div>
        {/* <div className="ViewIcon"> 
           <AiFillEye
              className="ActionIcon"
          onClick={() => {
            console.log(props.data.category, "propspropsprops")
            setDetailCategoriesId(props.data.category);
            setImageCategoriesId(props.data.image);
          }}
          data-bs-toggle="modal"
          data-bs-target="#DetailCategoriesData"/>     
        </div> */}
        <div className="DeleteIcon"
         onClick={() => {
          setDeleteCategoriesId(props.data._id);
        }}
        data-bs-toggle="modal"
        data-bs-target="#DeleteCategoriesData"
        >
          <AiFillDelete
            className="ActionIcon"
           
            alt="delete"
            src="../../images/delete.jpg"
          />
        </div>
      </div>
    );
  };

  const pagination = true;
  const paginationPageSize = 10;
  const rowHeight = 55;
  const [category, setCategory] = useState("");

  // --Add category API--//

  function addnew(e) {
    e.preventDefault();
    var data = new FormData();
    data.append("category", category);
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/createCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        getCategory();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // --get category API--//

  useEffect(() => {
    getCategory();
  }, []);

  function getCategory() {
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
        setRowData(response.data.CategoryData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // --delete category API--//

  function deleteData(index, e) {
    e.preventDefault();
    var data = JSON.stringify({
      categoryId: index,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  const editdataReloadFunc = () => {
    getCategory();
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Product Category Group
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add Product Category Group
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
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Category Group
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form onSubmit={addnew}>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <label className="form-label">
                                Add Category Group{" "}
                              </label>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  value={category}
                                  className="form-control"
                                  onChange={(e) => {
                                    setCategory(
                                      e.target.value.replace(/[^A-Za-z ]/ig, "")
                                    );
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
                          <button type="submit" className="btn submitBtn" data-bs-dismiss="modal">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="UpdateCategoriesData"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <Updatecategories updatedData={UpdateCategoriesData} onEditDataFunction={editdataReloadFunc} />
              </div>
              <div
                className="modal fade DeletePopup"
                id="DeleteCategoriesData"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog  modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <form
                        onSubmit={(e) => {
                          deleteData(DeleteCategoriesId, e);
                        }}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="">
                              <p>
                                Are you sure you want to delete this category
                                and all subcategory associted with this category
                                will also deleted if delete this category
                              </p>
                              <button
                                type="button"
                                className="btn btn-danger CancelBtn"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button type="submit" className="btn submitBtn">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="ag-theme-alpine cts_datatable"
                style={{ height: 667 }}
              >
                <AgGridReact
                  style={{ width: "100%", height: "100%;" }}
                  rowHeight={rowHeight}
                  domLayout="autoHeight"
                  defaultColDef={defaultColDef}
                  pagination={pagination}
                  paginationPageSize={paginationPageSize}
                  rowData={rowData}
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    categoryNameRenderer: CategoryNameRenderer,
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
                    width={200}
                    cellRenderer="categoryNameRenderer"
                    field="Product Category Group"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={160}
                    field="Status"
                    cellRenderer="statusRenderer"
                    colId="params"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={300}
                    field="Action"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                    sortable={true}
                    filter={true}
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

export default Product_Category_Group;
