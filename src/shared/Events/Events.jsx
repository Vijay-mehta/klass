import React, { useState, useMemo, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Events.css";
import "./UpdateEvents.css";
import "../Students/Students.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { useHistory } from "react-router-dom";
import ToggleButton from "../../components/Toggle_Button/ToggleButton";
import Modal_Popup from "../../components/modal_renderer/Modal_Popup";

const SrNoRenderer = (props) => {
  return (
    <>
      <span>{props.node.rowIndex + 1}</span>
    </>
  );
};

const ImageRenderer = (props) => {
  return (
    <span className="profle_img_box">
      <img className="profile_img_table" src={props.data.image[0]} alt="icon" />
    </span>
  );
};

const TitleRenderer = (props) => {
  return (
    <>
      <span>{props.data.title}</span>
    </>
  );
};

const GroupRender = (props) => {
  // console.log(props.data, "eventgroup")
  // let textgroup = [];
  // let arrgroup = props.data?.groupId;
  // arrgroup.map((item) => {
  //   console.log(item.groups, "78990898")
  //   textgroup.push(item.groups);
  // })

  return (
    <span className="profle_img_box">
      <span>{props?.data?.groupId?.join(", ")}</span>
    </span>
  );
};

const TagEventRenderer = (props) => {
  // console.log(props, "props")
  // let text = [];
  // let arr = props.data.tags;
  // arr.map((item) => {
  //   console.log(item.tags, "arr")
  //   text.push(item.tags);
  // })

  return (
    <span className="profle_img_box">
      <span>{props?.data?.tags?.join(", ")}</span>
    </span>
  );
};

const DateRenderer = (props) => {
  return (
    <>
      <span>{props.data.Date}</span>
    </>
  );
};

function Events() {
  const [rowData, setRowData] = useState([]);
  const [EventsView, setEventsView] = useState([]);
  const [DeleteEventsId, setDeleteEventsId] = useState("");
  const [options, setoptions] = useState([]);

  const pagination = true;
  const paginationPageSize = 100;
  const rowHeight = 55;
  let history = useHistory();

  useEffect(() => {
    getevents();
  }, []);
  // ----Delete API ---//

  function eventsdeleteData(id) {
    var data = JSON.stringify({
      eventId: id,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteevent`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getevents();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---- Get business API ---//
  function getevents() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getevents`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        response.data.eventData.map(item=>{
          console.log(item, "getevent")

        })
        setRowData(response.data.eventData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const StatusRenderer = (props) => {
    let status = props?.data?.status ? "deactivate" : "activate";
    let message = "Are you sure you want to "+status+" this event?";
    return (
      <>
      <Modal_Popup status={props?.data?.status}
          onClick={() => {changeEventStatus(props?.data?._id);}}
          message={message}
          />
        {/* <ToggleButton handleToggle={()=>{changeEventStatus(props?.data._id);}} status={props?.data?.status}/> */}
      </>
        // {/* {props?.data.status === true ? (
        //   <button
        //     className="btn btn-success btn-sm verified"
        //     onClick={() => {
        //       changeEventStatus(props?.data._id);
        //     }}
        //   >
        //     Verified
        //   </button>
        // ) : (
        //   <button
        //     className="btn btn-danger btn-sm verified"
        //     onClick={() => {
        //       changeEventStatus(props?.data._id);
        //     }}
        //   >
        //     Not Verified
        //   </button>
        // )} */}
    );
  };

  const TrendingRender = (props) => {
    return (
      <>
        <ToggleButton handleToggle={()=>{changeEventTrendingStatus(props?.data?._id);}} status={props?.data?.trending}/>
      </>
      // <>
      //   {props.data.trending === true ? (
      //     <button
      //       className="btn btn-success btn-sm"
      //       onClick={() => {
      //         changeEventTrendingStatus(props.data._id);
      //       }}
      //     >
      //       Trending
      //     </button>
      //   ) : (
      //     <button
      //       className="btn btn-danger btn-sm"
      //       onClick={() => {
      //         changeEventTrendingStatus(props.data._id);
      //       }}
      //     >
      //       Not Trending
      //     </button>
      //   )}
      // </>
    );
  };

  function changeEventStatus(eventId) {
    var data = JSON.stringify({
      eventId: eventId,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changeeventStatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data, "changeeventstatus")
        getevents();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function changeEventTrendingStatus(eventId) {
    var data = JSON.stringify({
      eventId: eventId,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changeeventtrendingstatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data, "changeClassstatus")
        getevents();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">

        <div className="ViewIcon" onClick={(e) => {
          e.preventDefault();
          console.log(encoded, "encoded");
          // url = ; //
          window.open(`http://angularklassbook.s3-website.us-east-2.amazonaws.com/#/admin/admin-events/${props.data._id}/${encoded}`, '_blank', 'noopener,noreferrer')
        }}>
          <AiFillEye
            className="ActionIcon"
          />
        </div>

        <div className="editIcon" onClick={() => {
          history.push({
            pathname: "UpdateEvents",
            state: { details: props.data },
          });
        }}>
          <MdModeEditOutline
            className="ActionIcon"
          // onClick={() => {
          //   history.push({
          //     pathname: "UpdateEvents",
          //     state: { details: props.data },
          //   });
          // }}
          />
        </div>
        <div className="DeleteIcon" onClick={() => {
          setDeleteEventsId(props.data._id);
        }}
          data-bs-toggle="modal"
          data-bs-target="#BusinessDeleteId">
          <AiFillDelete
            className="ActionIcon"
            onClick={() => {
              setDeleteEventsId(props.data._id);
            }}
            data-bs-toggle="modal"
            data-bs-target="#BusinessDeleteId"
          />
        </div>
      </div>
    );
  };

  const token = `${localStorage.getItem("token")}`;
  let encoded = encodeURIComponent(token);

  const groupValueGetter = params => {
    console.log(params.data?.groupId, "params")
    return (params.data?.groupId?.map(item => {
      // console.log(item.groups,"params")
      return item.groups;
    }));
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
      return valueA?.toLowerCase().localeCompare(valueB?.toLowerCase());
    }

    return (valueA > valueB ? 1 : (valueA < valueB ? -1 : 0));
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
                Events
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    onClick={() => {
                      history.push("/AddEvents");
                    }}
                  >
                    Add New Event
                  </button>
                  <button className="btn btn-theme btn-sm">Upload CSV</button>
                </div>
              </h4>

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
                            <p>Are you sure you want to delete this event?</p>
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
                                eventsdeleteData(DeleteEventsId);
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
                style={{ width: "100%" }}
                className="ag-theme-alpine tableFix"
              >
                <AgGridReact
                  // style={{ width: "100%", height: "100%;" }}
                  rowHeight={rowHeight}
                  // pagination={pagination}
                  // paginationPageSize={paginationPageSize}
                  rowData={rowData}
                  // domLayout="autoHeight"
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    srNoRenderer: SrNoRenderer,
                    titleRenderer: TitleRenderer,
                    imageRenderer: ImageRenderer,
                    dateRenderer: DateRenderer,
                    statusRenderer: StatusRenderer,
                    GroupRender: GroupRender,
                    TagEventRenderer: TagEventRenderer,
                    TrendingRender: TrendingRender,
                  }}
                >
                  <AgGridColumn
                    width={90}
                    field="SrNo"
                    cellRenderer="srNoRenderer" GroupRender
                    sortable={false}
                    filter={false}
                    pinned="left"
                  ></AgGridColumn>
                  <AgGridColumn
                    width={100}
                    field="Actions"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                    sortable={false}
                    filter={false}
                    pinned="left"

                  ></AgGridColumn>

                  <AgGridColumn
                    width={200}
                    field="title"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    // floatingFilter={true}
                    filter={true}
                    pinned="left"

                  ></AgGridColumn>
                  <AgGridColumn
                    width={250}
                    field="groups"
                    cellRenderer="GroupRender"
                    sortable={true}
                    valueGetter={groupValueGetter}
                    filter={true}
                    comparator={customLowerCaseComparator}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={250}
                    field="tags"
                    cellRenderer="TagEventRenderer"
                    sortable={true}
                    valueGetter={tagValueGetter}
                    filter={true}
                    comparator={customLowerCaseComparator}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={130}
                    field="Date"
                    cellRenderer="dateRenderer"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    // floatingFilter={true}
                    filter={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={140}
                    field="startTime"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    // floatingFilter={true}
                    filter={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={90}
                    field="endTime"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    // floatingFilter={true}
                    filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    cellRenderer="statusRenderer"
                    width={90}
                    field="status"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                  ></AgGridColumn>
                  <AgGridColumn
                    cellRenderer="TrendingRender"
                    width={95}
                    field="trending"
                    sortable={true}
                    comparator={customLowerCaseComparator}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={90}
                    field="image"
                    cellRenderer="imageRenderer"
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

export default Events;
