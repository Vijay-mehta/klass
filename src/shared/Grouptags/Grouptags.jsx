import React, { useState, useMemo, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Grouptags.css";
import Select from "react-select";
import UpdateGrouptags from "./UpdateGrouptags";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import Updategroup from "./UpdateGrouptags";
import ToggleButton from "../../components/Toggle_Button/ToggleButton";
import Modal_Popup from "../../components/modal_renderer/Modal_Popup";

function Grouptags() {
  const [UpdateGroupData, setUpdateGroupData] = useState();
  const [DeleteGroupId, setDeleteGroupId] = useState("");
  const [GroupView, setGroupView] = useState([]);
  const [groupName, setGroups] = useState("");
  const [rowData, setRowData] = useState([]);
  const [tags, setTags] = useState("");
  const [data, setdata] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const [options, setoptions] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);

  console.log(rowData, "rowData")
  const pagination = true;
  const paginationPageSize = 10;
  const rowHeight = 55;

  const ChildMessageRenderer = (props) => {
    console.log(props, "group123")
    return (
      <div className="iconActionList">
        <div className="editIcon"
          onClick={() => {
            setUpdateGroupData(props.data);
          }}
          data-bs-toggle="modal"
          data-bs-target="#UpdateGroupData"
        >
          <MdModeEditOutline
            className="ActionIcon"

          />
        </div>
        <div className="ViewIcon"
          onClick={() => {
            console.log(props, "propspropsprops")
            setGroupView(props.data);
          }}
          data-bs-toggle="modal"
          data-bs-target="#DetailGroup"
        >
          <AiFillEye
            className="ActionIcon"
          />
        </div>
        <div className="DeleteIcon"
          onClick={() => {
            setDeleteGroupId(props.data._id);
          }}
          data-bs-toggle="modal"
          data-bs-target="#DeleteGroupData"
        >
          <AiFillDelete
            className="ActionIcon"

          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    getnewtag();
    getgrouptags();
  }, []);


  //--- Add grouptag API---//

  function addgrouptag() {
    var data = JSON.stringify({
      "groupName": groupName,
      "tags": selectedOptionone.toString(),
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/addgrouptag`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "response")
        getgrouptags();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function changeGroupTagStatus(tagId) {
    var data = JSON.stringify({
      "tagId": tagId
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASEURL}/changetagsgrouptatus`,
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        getgrouptags();
      })
      .catch(function (error) {
        console.log(error);
      });


  }


  function getgrouptags() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getgrouptags`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "33333")
        let group = [];
        const groupdata = response.data.taggroupData;
        groupdata.map((groupCat, index) => {
          group.push({ grpId: groupCat._id, groupyName: groupCat.groupName })
        })
        setRowData(response.data.taggroupData);
        console.log(response.data.taggroupData, "0000");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
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
        console.log(options, "options666")
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handlechangetag = (event) => {
    let array = [];
    event.forEach((value) => {
      array.push(value.value);
    });
    setselectedOptionone(array);

    console.log(array, "array");
  };


  const TagsRenderer = (props) => {
    console.log(props.data.tags, "99999")
    const Tags = [];
    props.data?.tags?.map(item => {
      Tags.push(item.tags);
    })
    return (
      <>
        <span>{Tags.join(",")}</span>
      </>
    );
  };


  let viewTags = GroupView?.tags?.map((tag) => {
    return tag?.tags.trim();
  })

  function deleteGroup(index) {
    var data = JSON.stringify({
      grouptagId: index,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deletegrouptags`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getgrouptags();
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const SrNoRenderer = (props) => {
    return <span className="profle_img_box">{props.rowIndex + 1}</span>;
  };


  const GroupRenderer = (props) => {
    console.log(props, "4544")
    return (
      <span className="profle_img_box">
        <span>{props.data.groupName}</span>
      </span>
    );
  };

  const StatusRenderer = (props) => {
    // console.log(props.data, "propsdata")
    let status = props?.data?.status ? "deactivate" : "activate";
		let message = "Are you sure you want to " + status + " this tag-group?";
    return (
      <>
        <Modal_Popup status={props?.data?.status}
          onClick={() => { changeGroupTagStatus(props?.data?._id); }}
          message={message}
        />
        {/* <ToggleButton handleToggle={() => { changeGroupTagStatus(props?.data?._id) }} status={props?.data?.status} /> */}
      </>
      // <span class="status">
      //   <label class="switch">
      //     <input class="switch-input" type="checkbox" />
      //     <span
      //       class="switch-label"
      //       data-on="Active"
      //       data-off="Deactive"
      //     ></span>
      //     <span class="switch-handle"></span>
      //   </label>
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
    getgrouptags();
  }

  const tagValueGetter = params => {
    // console.log(params.data.tags,"params")
    return (params.data?.tags?.map(item => {
      // console.log(item.tags,"params")
      return item.tags;
    }));
  }


  const customLowerCaseComparator = (valueA, valueB) => {
    if (typeof valueA === 'string') {
      return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
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
                Tag-Group
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New Tag-Group
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
                          Add Tag-Group
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
                            <label className="form-label"> Tag-Group </label>
                            <div className="position-relative">
                              <input
                                type="text"
                                value={groupName}
                                className="form-control"
                                onChange={(e) => {
                                  setGroups(e.target.value);
                                }}
                              />
                              <div
                                className="hint_box"
                                style={{ display: "block" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">
                              Select Tags
                            </label>
                            <Select
                              isMulti
                              options={options}
                              onChange={(e) => handlechangetag(e)}
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
                          onClick={addgrouptag}
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
              ></div>
              <div
                className="modal fade DeletePopup"
                id="DeleteGroupData"
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
                            <p>Are you sure you want to delete this Tag-Group</p>
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
                                deleteGroup(DeleteGroupId);
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
                id="UpdateGroupData"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <Updategroup updatedData={UpdateGroupData} onEditDataFunction={editdataReloadFunc} />
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="DetailGroup"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Group Tag Details
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

                                  <tr>
                                    <th>Group Tag :</th>
                                    <td> {GroupView.groupName}</td>
                                  </tr>
                                  <tr>
                                    <th>Tags :</th>
                                    <td>{viewTags?.join(", ")}</td>
                                  </tr>
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
                className="ag-theme-alpine tableFix"
              >
                <AgGridReact
                  rowHeight={rowHeight}
                  // pagination={pagination}
                  // paginationPageSize={paginationPageSize}
                  rowData={rowData}
                  // domLayout="autoHeight"
                  defaultColDef={defaultColDef}
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    groupRenderer: GroupRenderer,
                    tagsRenderer: TagsRenderer,
                    statusRenderer: StatusRenderer,
                    srNoRenderer: SrNoRenderer,
                  }}
                >
                  <AgGridColumn
                    width={90}
                    field="SrNo"
                    Srno={true}
                    sortable={false}
                    filter={false}
                    cellRenderer="srNoRenderer"
                    pinned="left"
                  ></AgGridColumn>

                  <AgGridColumn
                    width={100}
                    field="Action"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                    pinned="left"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={150}
                    cellRenderer="groupRenderer"
                    headerName="Tag-Group"
                    field="groupName"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    // floatingFilter={true}
                    filter={true}
                    pinned="left"
                  ></AgGridColumn>


                  <AgGridColumn
                    width={300}
                    field="tags"
                    cellRenderer="tagsRenderer"
                    colId="params"
                    valueGetter={tagValueGetter}
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    filter={true}
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

export default Grouptags;
