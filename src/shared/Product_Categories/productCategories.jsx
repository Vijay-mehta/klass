import React, { useState, useMemo, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import Update_Product_Categories from "./updateProductCategories";
import { AiFillEye } from "react-icons/ai";


function Product_Categories(props) {
  const [updatecProductCategorydata, setUpdatecProductCategorydata] = useState([]);
  const [deleteProductCategory, setDeleteProductCategory] = useState();
  const [viewProductCategory, setViewProductCategory] = useState("");

  const[rowDate, setRowData] =useState([]);
  const[categoryName, setCategoryName] = useState("");

  const pagination = true;
  const paginationPageSize = 10;
  const rowHeight = 55;

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div className="editIcon"
         onClick={() => {
          console.log(props.data,"props.data.CategoryData")
                setUpdatecProductCategorydata(props.data);
              }}
              data-bs-toggle="modal"
              data-bs-target="#UpdateProductCategory"
        >
          <MdModeEditOutline
            className="ActionIcon"
           
          />
        </div>
        <div className="ViewIcon"
        	onClick={() => {
						console.log(props.data, "propspropsprops00000")
						setViewProductCategory(props.data);
					}}
					data-bs-toggle="modal"
					data-bs-target="#viewproductcategory"
        > 
                  <AiFillEye
                    className="ActionIcon"
				/>     
                </div>
        <div className="DeleteIcon"
          onClick={() => {
            setDeleteProductCategory(props.data._id);
          }}
          data-bs-toggle="modal"
          data-bs-target="#DeleteProductCategory"
        >
          <AiFillDelete
            className="ActionIcon"
          
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
	getProductCategory();
}, []);
  // --Add subcategory API--//

  function addProduct() {
	var data = JSON.stringify({
		"categoryName":categoryName
	});

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/createproductCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "sub");
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }

 
  // -- get product API--//
  function getProductCategory() {
	var config = {
		method: "get",
		url: `${process.env.REACT_APP_BASEURL}/getproductCategory`,
		headers: {
			Authorization: localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	};

	axios(config)
		.then(function (response) {
			console.log(response,"productCategory")
			 setRowData(response.data.CategoryData);
		})
		.catch(function (error) {
			console.log(error);
		});
}

  // --delete product category API--//

  function ProductCategoryDelete(id) {
    var data = JSON.stringify({
		productcategoryId: id,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteproductCategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getProductCategory();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const SrNoRenderer = (props) => {
    return <span className="profle_img_box">{props.rowIndex + 1}</span>;
  };



//   const StatusRenderer = (props) => {
//     return (
//       <span className="status">
//         <label className="switch">
//           <input className="switch-input" type="checkbox" />
//           <span
//             className="switch-label"
//             data-on="Active"
//             data-off="Deactive"
//           ></span>
//           <span className="switch-handle"></span>
//         </label>
//       </span>
//     );
//   };
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);


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
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Product Category
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add Product Category
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
                          Add Product Category 
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
							<p>Name</p>
                          <div className="position-relative">
                            <input
                              type="text"
                             value={categoryName}
                              className="form-control"
                              onChange={(e) => {
                                setCategoryName(e.target.value);
                              }}
                            />
                           
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
                          type="submit"
                          onClick={addProduct}
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
                id="UpdateProductCategory"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <Update_Product_Categories
											updatedData={updatecProductCategorydata}
											

										/>
                  </div>
                </div>
              </div>
              <div
                className="modal fade DeletePopup"
                id="DeleteProductCategory"
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
                            <p>
                              Are you sure you want to delete this Product Category
                            </p>
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
                                ProductCategoryDelete(deleteProductCategory);
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
                id="viewproductcategory"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-body" style={{ minHeight: "470px" }}>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">
                            {" "}
                            Product category Name{" "}
                          </label>
                          <div className="position-relative">
						 <h4>Name:</h4> {viewProductCategory.categoryName}
							
                            {/* <input
                              type="text"
                             
                              className="form-control"
                              disabled
                            /> */}
                          </div>
                        </div>
                      </div>
                      <div className="cancleButton">
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
              </div>
              <div
                className="ag-theme-alpine cts_datatable tableFix"
                style={{ height: 667 }}
              >
                <AgGridReact
                  // style={{ width: "100%", height: "100%;" }}
                  rowHeight={rowHeight}
                  pagination={pagination}
                  paginationPageSize={paginationPageSize}
                   rowData={rowDate}
                  domLayout="autoHeight"
                  defaultColDef={defaultColDef}
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    srNoRenderer: SrNoRenderer,
                    // statusRenderer: StatusRenderer,
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
                    width={180}
                    cellRenderer="categoryRenderer"
                    field="categoryName"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    // floatingFilter={true}
                     filter={true}
                  ></AgGridColumn>

                  {/* <AgGridColumn
                    width={160}
                    field="Status"
                    cellRenderer="statusRenderer"
                    colId="params"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn> */}
                  <AgGridColumn
                    width={250}
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

export default Product_Categories;
