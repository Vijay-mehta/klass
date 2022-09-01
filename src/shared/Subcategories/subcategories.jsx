import React, { useState, useMemo, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import UpdatesubcategoriesDetails from "./UpdatesubcategoriesDetails";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";

function Subcategories(props) {
	const [UpdatecSubategoriesData, setUpdatecSubategoriesData] = useState({});
	const [DeleteSubategoriesId, setDeleteSubategoriesId] = useState();
	// const [SubDetailCategoriesId, setSubDetailCategoriesId] = useState([]);
	// const [SubImageCategoriesId, setSubImageCategoriesId] = useState();
	const [selectedOption, setSelectedOption] = useState(null);
	const [data, setdata] = useState([]);
	const [subcategory, setSubCategory] = useState("");
	const [image, setimage] = useState("");
	const [subrowData, setSubRowData] = useState([]);
	const [categoryId, setcategoryId] = useState("");
	const pagination = true;
	const paginationPageSize = 10;
	const rowHeight = 55;
	let image_reference = useRef(null);

	const resetForm = () => {
		setcategoryId('');
		setSubCategory('');
		setimage('');
		setdata([]);		
	  };
	const ChildMessageRenderer = (props) => {
		return (
			<div className="iconActionList"
			onClick={() => {
				setUpdatecSubategoriesData(props.data.subCategoryData);
			}}
			data-bs-toggle="modal"
			data-bs-target="#UpdateCategoriesData" 
			>
				<div className="editIcon">
					<MdModeEditOutline className="ActionIcon"
					/>
				</div>
				{/* <div className="ViewIcon"> 
                  <AiFillEye
                    className="ActionIcon"
					onClick={() => {
						console.log(props.data.image, "propspropsprops00000")
						setSubDetailCategoriesId(props.data.subCategory);
						setSubImageCategoriesId(props.data.subCateImage);

					}}
					data-bs-toggle="modal"
					data-bs-target="#SubDetailCategoriesData"/>     
                </div> */}
				<div className="DeleteIcon"
				onClick={() => {
					setDeleteSubategoriesId(props.data.subcateId);
				}}
				data-bs-toggle="modal"
				data-bs-target="#DeleteCategoriesData"
				>
					<AiFillDelete
						className="ActionIcon"
						
					/>
				</div>
			</div>
		);
	};

	// --Add subcategory API--//

	function subaddnewdrop() {
		var data = new FormData();
		data.append("subCategory", subcategory);
		data.append("image", image);
		data.append("categoryId", categoryId);
		var config = {
			method: "post",
			url: `${process.env.REACT_APP_BASEURL}/addSubcategory`,
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			data: data,
		};
		resetForm();
		axios(config)
			.then(function (response) {
				subgetnew();
				getnew();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// --get category API--//

	useEffect(() => {
		getnew();
		subgetnew();
	}, []);

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
				console.log(response,"respon")
				let array=[];
				response.data.CategoryData?.map(item=>{
					array.push({value: item._id, label: item.category})
				})
				setdata(array);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const handlechange = (e) => {
		setcategoryId(e.value);
	};

	// --Add subcategory API--//

	function subgetnew() {
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
				console.log(response,"get")
				let subcategoryData = [];
				response.data?.SubcategoryData?.map((subcat, index) => {

					subcategoryData.push({
						cateId: subcat.categoryId?._id,
						category: subcat.categoryId?.category,
						subCategory: subcat.subCategory,
						subCateImage: subcat.image,
						subcateId: subcat?._id,
						categoryData: subcat.categoryId,
						subCategoryData: subcat,

					});
				});
				setSubRowData(subcategoryData);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// --delete subcategory API--//

	function subdeleteData(index) {
		var data = JSON.stringify({
			subCategoryId: index,
		});
		var config = {
			method: "post",
			url: `${process.env.REACT_APP_BASEURL}/deleteSubcategory`,
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				subgetnew();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const SrNoRenderer = (props) => {
		return <span className="profle_img_box">{props.rowIndex + 1}</span>;
	};

	const IconRenderer = (props) => {
		return (
			<span className="profle_img_box">
				<img className="profile_img_table" src={props.data.subCateImage} />
			</span>
		);
	};

	const SubCategoryRenderer = (props) => {
		return (
			<span className="profle_img_box">
				<stong>{props.data.subCategory}</stong>
			</span>
		);
	};
	const CategoryRenderer = (props) => {
		return (
			<span className="profle_img_box">
				<stong>{props.data.category}</stong>
			</span>
		);
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
	const defaultColDef = useMemo(() => {
		return {
			flex: 1,
			sortable: true,
			resizable: true,
			filter: true,
		};
	}, []);

	const categoryValueGettter = params =>{
		// console.log(params.data,"params");
		return(params?.data?.category);
	}


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
				<div className="container-fluid">
					<div className="card">
						<div className="card-body">
							<h4 className="card-title">
								Category
								<div className="float-end btns_head">
									<button
										className="btn btn-theme btn-sm"
										data-bs-toggle="modal"
										data-bs-target="#createGroup"
									>
										Add New Category
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
													Add Category
												</h5>
												<button
													type="button"
													className="btn-close"
													data-bs-dismiss="modal"
													aria-label="Close"
													// onClick={()=>{resetForm();}}
												></button>
											</div>
											<div className="modal-body">
												<div className="row">

													<div className="col-md-12 mb-3">
														<label className="form-label">Select Category Group</label>
														<Select
															options={data}
															key={data}
															onChange={(e) => handlechange(e)}
															// getOptionLabel={(e) => (
															// 	<div
															// 		style={{
															// 			display: "flex",
															// 			alignItems: "center",
															// 		}}
															// 	>
															// 		<span style={{ marginLeft: 5 }}>
															// 			{e.category}
															// 		</span>
															// 	</div>
															// )}
														/>
													</div>
													<div className="col-md-12 mb-3">
														<label className="form-label"> Category</label>
														<div className="position-relative">
															<input
																value={subcategory}
																type="text"
																className="form-control"
																onChange={(e) => {
																	setSubCategory(
																		e.target.value.replace(/[^A-Za-z ]/gi, "")
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
												<div className="row">
													<div className="col-md-12 mb-3">
														<label className="form-label">
															Category Icon
														</label>
														<div className="position-relative">
															<div>
																<input
																	ref={image_reference}
																	type="file"
																	defaultValue={""}
																	onChange={(e) => setimage(e.target.files[0])}
																	key={data}
																	className="form-control"
																/>
															</div>
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
													type="submit"
													onClick={subaddnewdrop}
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
								id="UpdateCategoriesData"
								tabIndex="-1"
								aria-labelledby="exampleModalLabel"
								aria-hidden="true"
							>
								<div className="modal-dialog modal-dialog-scrollable">
									<div className="modal-content">
										<UpdatesubcategoriesDetails
											updatedData={UpdatecSubategoriesData}
											categoryData={data}

										/>
									</div>
								</div>
							</div>
							<div
								className="modal fade DeletePopup"
								id="DeleteCategoriesData"
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
															Are you sure you want to delete this Subcategory?
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
																subdeleteData(DeleteSubategoriesId);
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
							{/* <div
                className="modal fade"
                id="SubDetailCategoriesData"
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
                            SubCategory Name{" "}
                          </label>
                          <div className="position-relative">
                            <input
                              type="text"
                              defaultValue={SubDetailCategoriesId}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">SubCategory Icon</label>
                          <div className="position-relative">
                            <div>
                              <img
                                alt="Icons"
                                style={{ width: "250px" }}
                                src={SubImageCategoriesId}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
							<div
								// style={{ height: 440, width: "100%" }}
								className="ag-theme-alpine tableFix"
							>
								<AgGridReact
									// style={{ width: "100%", height: "100%;" }}
									rowHeight={rowHeight}
									// pagination={pagination}
									// paginationPageSize={paginationPageSize}
									rowData={subrowData}
									// domLayout="autoHeight"
									defaultColDef={defaultColDef}
									frameworkComponents={{
										childMessageRenderer: ChildMessageRenderer,
										subCategoryRenderer: SubCategoryRenderer,
										iconRenderer: IconRenderer,
										srNoRenderer: SrNoRenderer,
										statusRenderer: StatusRenderer,
										categoryRenderer: CategoryRenderer,
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
										width={250}
										field="Action"
										cellRenderer="childMessageRenderer"
										colId="params"
										sortable={false}
										filter={false}
									></AgGridColumn>
									<AgGridColumn
										width={90}
										cellRenderer="iconRenderer"
										field="Icon"
										sortable={false}
										filter={false}
									></AgGridColumn>
									<AgGridColumn
										width={180}
										cellRenderer="categoryRenderer"
										field="categoryGroup"
										valueGetter={categoryValueGettter}
										sortable={true}
										comparator={customLowerCaseComparator}
										// floatingFilter={true}
										filter={true}
									></AgGridColumn>
									<AgGridColumn
										width={180}
										// cellRenderer="subCategoryRenderer"
										headerName="Category"
										field="subCategory"
										sortable={true}
										comparator={customLowerCaseComparator}
										// floatingFilter={true}
										filter={true}
									></AgGridColumn>

									<AgGridColumn
										width={160}
										field="Status"
										cellRenderer="statusRenderer"
										colId="params"
										sortable={true}
										comparator={customLowerCaseComparator}
										filter={false}
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

export default Subcategories;
