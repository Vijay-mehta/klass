import React, { useState, useMemo, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Groups.css";
import Select from "react-select";
import Updategroup from "./Updategroups";
import JoditEditor from "jodit-react";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { AiFillEye } from "react-icons/ai";
import ToggleButton from "../../components/Toggle_Button/ToggleButton";
import Modal_Popup from "../../components/modal_renderer/Modal_Popup";

function GroupsData() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false,
    height: 400,
  };
  const [UpdateGroupData, setUpdateGroupData] = useState("");
  const [DeleteGroupId, setDeleteGroupId] = useState("");
  const [DetailTagsId, setDetailTagsId] = useState([]);
  const [groupImage, setGroupImage] = useState("");
  const [sendGroupImage, setSendGroupImage] = useState("");
  const [groups, setGroups] = useState("");
  const [rowData, setRowData] = useState(null);
  const [options, setoptions] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);
  const [selectedOptionTagLabel, setSelectedOptionTagLabel] = useState([]);
  const [group, setGroup] = useState([]) // THIS STATE IS USED FOR "GROUP" PARAMETER FOR SECTION API 
  const [groupsName, setGroupsName] = useState([]) // THIS STATE IS USED FOR "GROUPSNAME" PARAMETER FOR SECTION API 
  console.log(rowData, "5667")
  const pagination = true;
  const paginationPageSize = 10;
  const rowHeight = 55;



  useEffect(() => {
    getnewgroup();
    getnewtag();
  }, []);

  //----- GET GROUP API --------//

  function addnewgroup() {

    selectedOptionTagLabel.map(item => {
      groupsName.push(item);
    })

    selectedOptionone.map(item => {
      group.push(item);
    })

    var data = new FormData();
    data.append("tags", selectedOptionTagLabel);
    data.append("groupDescription", content);
    data.append("groups", groups);
    data.append("image", sendGroupImage);
    data.append("group", group);
    data.append("groupsName", groupsName);


    console.log(data, "data")
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/addgroups`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response, "posy");
        getnewgroup();
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  //----- GET GROUP API --------//
  function getnewgroup() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getgroups`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    axios(config)
      .then((response) => {
        let data = JSON.stringify(response.data.data);


        // var array = []
        // console.log(response, "response1233");

        // response.data.categoryData.map(item => {
        //   array.push({
        //     grupName: item.groups,
        //     grupId: item._id,
        //     tags: item.tags,
        //     description: item.groupDescription,
        //     image: item.image
        //   })
        // })
        setRowData(JSON.parse(data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  //----- GET TAG API --------//

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
        console.log(response.data, "response.data");
        response.data.tagData.map((tag, index) => {
          options.push({ value: tag._id, label: tag.tags });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handlechangetag = (event) => {
    let array = [];
    let arrayLabel = [];
    event.forEach((value) => {
      array.push(value.value);
    });
    event.forEach((option) => {
      arrayLabel.push(option.label);
    })
    setselectedOptionone(array);
    setSelectedOptionTagLabel(arrayLabel);
    console.log(array, "array");
  };

  function deleteDataGroup(id) {
    var data = JSON.stringify({
      groupsId: id,
    });
    console.log(data);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deletegroups`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getnewgroup();
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  const SrNoRenderer = (props) => {
    return <span className="profle_img_box">{props.rowIndex + 1}</span>;
  };

  const TagsRenderer = (props) => {
    // console.log(props.data.tags, "props.data.data")
    // var array = JSON.stringify(props.data);
    // var display = JSON.parse(array);
    // options.map(item => {
    //   props.data.tags?.map(id => {
    //     if (item.value === id) {
    //       array.push({ value: item.value, label: item.label });
    //       display.push(item.label);
    //     }
    //   })
    // })
    // props.data.tags = array;
    // console.log(props.data.tags, "prop");
    return (
      <span className="profle_img_box">
        <span>{props.data.tags.join(", ")}</span>
      </span>
    );
  };

  const ChildMessageRenderer = (props) => {
    console.log(props, "7070");
    return (
      <div className="iconActionList">
        <div className="editIcon">
          <MdModeEditOutline
            className="ActionIcon"
            onClick={() => {
              setUpdateGroupData(props.data);
            }}
            data-bs-toggle="modal"
            data-bs-target="#UpdateGroupData"
          />
        </div>
        <div className="ViewIcon">
          <AiFillEye
            className="ActionIcon"
            onClick={() => {
              console.log(props.data, "propspropsprops")
              setDetailTagsId(props.data);
            }}
            data-bs-toggle="modal"
            data-bs-target="#DetailTagsData" />
        </div>
        <div className="DeleteIcon">
          <AiFillDelete
            className="ActionIcon"
            onClick={() => {
              console.log(props.data, "props.data._id");
              setDeleteGroupId(props.data._id);
            }}
            data-bs-toggle="modal"
            data-bs-target="#DeleteGroupData"
          />
        </div>
      </div>
    );
  };

  // const GroupRender = (props) => {
  //   console.log(props, "fghijokp")
  //   return <>
  //   <strong>{props.data.groups}</strong>
  //   </>;
  // }

  const TrendingRender = (props) => {
    return (
      <>
        <ToggleButton handleToggle={() => { changeGroupTrendingStatus(props?.data?._id); }} status={props?.data?.trending} />
      </>
      // <>
      //   {props.data.trending === true ? (
      //     <button
      //       className="btn btn-success btn-sm"
      //       onClick={() => {
      //         changeGroupTrendingStatus(props.data._id);
      //       }}
      //     >
      //       Trending
      //     </button>
      //   ) : (
      //     <button
      //       className="btn btn-danger btn-sm"
      //       onClick={() => {
      //         changeGroupTrendingStatus(props.data._id);
      //       }}
      //     >
      //       Not Trending
      //     </button>
      //   )}
      // </>
    );
  };

  function changeGroupStatus(groupId){
    var axios = require('axios');
var data = JSON.stringify({
  "groupId": groupId
});

var config = {
  method: 'post',
  url: `${process.env.REACT_APP_BASEURL}/changegrouptatus`,
  headers: { 
    'Authorization': localStorage.getItem("token"), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  getnewgroup();
})
.catch(function (error) {
  console.log(error);
});

  }

  function changeGroupTrendingStatus(groupId) {
    var data = JSON.stringify({
      groupId: groupId,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changgrouptrendingstatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data, "changeClassstatus")
        getnewgroup();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const StatusRenderer = (props) => {
    let status = props?.data?.status ? "deactivate" : "activate";
		let message = "Are you sure you want to " + status + " this group?";
    return (
      <>
      <Modal_Popup status={props?.data?.status}
					onClick={() => { changeGroupStatus(props?.data?._id); }}
					message={message}
				/>
        {/* <ToggleButton handleToggle={() => { changeGroupStatus(props?.data?._id) }} status={props?.data?.status} /> */}
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
      // flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  // const editdataReloadFunc = () => {
  //   getnewgroup();
  // }

  //----------------FUNCTION TO SET IMAGES THAT ARE TO BE SENT----------------------//

  const handleGroupImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      console.log(file, "file")
      let display = URL.createObjectURL(file);
      setGroupImage(display);
      setSendGroupImage(event.target.files[0]);
    }
  };


  //----------------FUNCTION TO RENDER IMAGES----------------------//

  const renderImages = (image) => {
    return (<img style={{ width: "110px", height: "140px" }} src={image} key={image} />)
  }


  const customLowerCaseComparator = (valueA, valueB) => {
    if (typeof valueA === 'string') {
      return valueA?.toLowerCase().localeCompare(valueB?.toLowerCase());
    }

    return (valueA > valueB ? 1 : (valueA < valueB ? -1 : 0));
  };

  const tagsValueGetter = params => {
    // console.log(params.data.tags,"params")
    return (params.data.tags.map(item => {
      console.log(item.tags, "params")
      return item.tags;
    }));
  }
  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid ">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Groups
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createGroup"
                  >
                    Add New Group
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
                          Add Group
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
                            <label className="form-label">Add Group </label>
                            <div className="position-relative">
                              <input
                                type="text"
                                value={groups}
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
                            <label className="form-label">Group Image</label>
                            <ul className="imagesUpload">
                              <li style={{ width: "100%", height: "148px" }}>
                                <input type="file" onChange={handleGroupImage} />
                                {groupImage.length === 0 ? <img
                                  style={{ width: "100%", height: "148px" }}
                                  src="../../images/defalutimg.svg"
                                /> : renderImages(groupImage)}
                                {/* {renderImages(authorImage)} */}
                              </li>
                            </ul>
                          </div>

                          <div className="col-md-12 mb-3">
                            <label className="form-label">Group Description</label>
                            <div className="App">
                              <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => { }}
                              />
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
                          onClick={addnewgroup}
                          className="btn submitBtn" data-bs-dismiss="modal"
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
                            <p>Are you sure you want to delete this group</p>
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
                                deleteDataGroup(DeleteGroupId);
                              }}
                              className="btn submitBtn" data-bs-dismiss="modal"
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
                    <Updategroup getGroups={getnewgroup} updatedData={UpdateGroupData} />
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
                            <table className="table table-bordered table_fix_width">
                              <tbody>


                                <tr>
                                  <th>Description</th>
                                  <td><div dangerouslySetInnerHTML={{ __html: DetailTagsId.description }} />
                                  </td>
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
              <div
                style={{ width: "100%" }}
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
                    tagsRenderer: TagsRenderer,
                    statusRenderer: StatusRenderer,
                    srNoRenderer: SrNoRenderer,
                    TrendingRender: TrendingRender,
                    // GroupRender: GroupRender,


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
                    width={300}
                    field="Action"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                    sortable={false}
                    pinned="left"
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={260}
                    cellRenderer="GroupRender"
                    field="groups"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    pinned="left"
                  // floatingFilter={true} 
                  ></AgGridColumn>
                  <AgGridColumn
                    width={260}
                    cellRenderer="tagsRenderer"
                    valueGetter={tagsValueGetter}
                    field="Tags"
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
                  <AgGridColumn
                    cellRenderer="TrendingRender"
                    field="trending"
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

export default GroupsData;
