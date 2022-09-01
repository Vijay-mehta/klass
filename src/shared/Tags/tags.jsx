import React, {
	useState,
	useMemo,
	useEffect,
} from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./tags.css";
import Updatetags from './Updatetags'
import { MdModeEditOutline } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import ToggleButton from "../../components/Toggle_Button/ToggleButton";
import Modal_Popup from "../../components/modal_renderer/Modal_Popup";

function Tags() {
	const [UpdateTagsData, setUpdateTagsData] = useState();
	const [DeleteCategoriesId, setDeleteCategoriesId] = useState('');
	const [DetailTagsId, setDetailTagsId] = useState([]);
	const [tags, setTags] = useState("");
	const [rowData, setRowData] = useState([]);
	const pagination = true;
	const paginationPageSize = 10;
	const rowHeight = 55;

	const ChildMessageRenderer = (props) => {
		return (
			<div className="iconActionList"
				onClick={() => {
					setUpdateTagsData(props.data);
				}}
				data-bs-toggle="modal"
				data-bs-target="#UpdateTagsData"
			>
				<div className="editIcon">
					<MdModeEditOutline className="ActionIcon"
					/>
				</div>
				{/* <div className="ViewIcon"> 
           <AiFillEye
              className="ActionIcon"
					onClick={() => {
						console.log(props.data.category, "propspropsprops")
						setDetailTagsId(props.data.tags);
					}}
					data-bs-toggle="modal"
					data-bs-target="#DetailTagsData" />     
        </div> */}
				<div className="DeleteIcon"
					onClick={() => {
						console.log(props.data._id, "props.data._id")
						setDeleteCategoriesId(props.data._id);
					}}
					data-bs-toggle="modal"
					data-bs-target="#DeleteCategoriesData"
				>
					<AiFillDelete className="ActionIcon"

					/>
				</div>
			</div>
		);
	};

	function addnewtag() {
		var data = JSON.stringify({
			"tags": tags,
		});

		var config = {
			method: "post",
			url: `${process.env.REACT_APP_BASEURL}/addtag`,
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				// window.location.reload(false);
				resetForm();
				getnewtag();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function changeTagStatus(tagId) {
		var data = JSON.stringify({
			"tagId": tagId
		});

		var config = {
			method: 'post',
			url: `${process.env.REACT_APP_BASEURL}/changetagstatus`,
			headers: {
				'Authorization': localStorage.getItem("token"),
				'Content-Type': 'application/json'
			},
			data: data
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
				getnewtag();
			})
			.catch(function (error) {
				console.log(error);
			});

	}

	const resetForm = () => {
		setTags('');

	}

	useEffect(() => {
		getnewtag();
	}, []);

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
				setRowData(response.data.tagData);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function deleteDatatag(index) {
		var data = JSON.stringify({
			tagId: index,
		});
		console.log(data);

		var config = {
			method: "post",
			url: `${process.env.REACT_APP_BASEURL}/deletetag`,
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				// window.location.reload(false);
				getnewtag();
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	const SrNoRenderer = (props) => {
		return <span className="profle_img_box">{props.rowIndex + 1}</span>;
	}

	const TagsRenderer = (props) => {
		return <span className="profle_img_box"><span>{props.data.tags}</span></span>;
	}

	const StatusRenderer = props => {
		let status = props?.data?.status ? "deactivate" : "activate";
		let message = "Are you sure you want to " + status + " this tag?";
		return (
			<>
				<Modal_Popup status={props?.data?.status}
					onClick={() => { changeTagStatus(props?.data?._id); }}
					message={message}
				/>
				{/* <ToggleButton handleToggle={() => { changeTagStatus(props?.data?._id) }} status={props?.data?.status} /> */}
			</>
			// <span class="status">
			// 	<label class="switch">
			// 		<input class="switch-input" type="checkbox" />
			// 		<span class="switch-label" data-on="Active" data-off="Deactive"></span>
			// 		<span class="switch-handle"></span>
			// 	</label>
			// </span>
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

	const editdataReloadFunc = () => {
		getnewtag();
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
								Tags
								<div className="float-end btns_head">
									<button
										className="btn btn-theme btn-sm"
										data-bs-toggle="modal"
										data-bs-target="#createGroup"
									>
										Add New Tag
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
													Add Tag
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
														<label className="form-label">Add Tag </label>
														<div className="position-relative">
															<input
																type="text"
																value={tags}
																className="form-control"
																onChange={(e) => {
																	setTags(e.target.value)
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
													onClick={addnewtag}
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
											<div className="row">
												<div className="col-md-12">
													<div className="">
														<p>
															Are you sure you want to delete this tag
														</p>
														<button type="button" className="btn btn-danger CancelBtn" data-bs-dismiss="modal"
														>Cancel</button>
														<button type="submit" onClick={() => {
															deleteDatatag(DeleteCategoriesId);
														}} className="btn submitBtn"
															data-bs-dismiss="modal"
														>Delete</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								className="modal fade"
								id="UpdateTagsData"
								tabIndex="-1"
								aria-labelledby="exampleModalLabel"
								aria-hidden="true"
							>
								<div className="modal-dialog modal-dialog-scrollable">
									<div className="modal-content">
										<Updatetags updatedData={UpdateTagsData} onEditDataFunction={editdataReloadFunc} />
									</div>
								</div>
							</div>
							<div
								className="modal fade"
								id="DetailTagsData"
								tabIndex="-1"
								aria-labelledby="exampleModalLabel"
								aria-hidden="true"
							>
								<div className="modal-dialog modal-dialog-scrollable">
									<div className="modal-content">
										<div className="modal-body" style={{ minHeight: "470px" }}>
											<div className="row">
												<div className="col-md-12 mb-3">
													<label className="form-label"> Tags Name </label>
													<div className="position-relative">
														<input
															type="text"
															defaultValue={DetailTagsId}
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
							<div
								style={{ width: "100%" }}
								className="ag-theme-alpine tableFix"
							>
								<AgGridReact
									rowHeight={rowHeight}
									// pagination={pagination}
									// paginationPageSize={paginationPageSize}
									rowData={rowData}
									// domLayout='autoHeight'
									defaultColDef={defaultColDef}
									frameworkComponents={{
										childMessageRenderer: ChildMessageRenderer,
										tagsRenderer: TagsRenderer,
										statusRenderer: StatusRenderer,
										srNoRenderer: SrNoRenderer
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
										width={300}
										field="Action"
										cellRenderer="childMessageRenderer"
										colId="params"
										sortable={false}
										filter={false}
									></AgGridColumn>
									<AgGridColumn
										width={260}
										cellRenderer="tagsRenderer"
										field="tags"
										sortable={true}
										comparator={customLowerCaseComparator}
									// floatingFilter={true}
									></AgGridColumn>

									<AgGridColumn
										width={300}
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

export default Tags;
