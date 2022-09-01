import React, { useState, useMemo, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import "./Sections.css";
import "../Students/Students.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { useHistory } from "react-router-dom";
import UpdateSections from "./updateSections";

function Sections() {
  //--------------useEffect() OF THIS ENTIRE COMPONENT---------------------//
  useEffect(() => {
    getSection();
  }, [])


  const SrNoRenderer = (props) => {
    return (
      <>
        <span>{props.rowIndex + 1}</span>
      </>
    );
  };

  const SectionPage = (props) => {
    // console.log(props, "123")
    return (
      <>
        <span>{props.data.page}</span>
      </>
    );
  };


  const section = (props) => {
    // console.log(props, "123")
    return (
      <>
        <span>{props.data.section}</span>
      </>
    );
  };

  const sectionDescription = (props) => {
    // console.log(props, "123")
    return (
      <>
        <span>{props.data.description}</span>
      </>
    );
  };

  const logictypeSection = (props) => {
    // console.log(props, "123")
    return (
      <>
        <span>{props.data.logictype}</span>
      </>
    );
  };

  const sectionObjectname = (props) => {
    // console.log(props, "123")
    return (
      <>
        <span>{props.data.Objectname}</span>
      </>
    );
  };

  const sectionGrouping = (props) => {
    // console.log(props, "123")
    return (
      <>
        <span>{props.data.group}</span>
      </>
    );
  };


  const StatusSection = (props) => {
    return (
      <>
        {props?.data.status === true ? (
          <button
            className="btn btn-success btn-sm"
          >
            Verified
          </button>
        ) : (
          <button
            className="btn btn-danger btn-sm"
          >
            Not Verified
          </button>
        )}
      </>
    );
  };

  const TrendingSection = (props) => {
    return (
      <>
        {props.data.trending === true ? (
          <button
            className="btn btn-success btn-sm"
          >
            Trending
          </button>
        ) : (
          <button
            className="btn btn-danger btn-sm"
          >
            Not Trending
          </button>
        )}
      </>
    );
  };

  const rowsSection = (props) => {
    // console.log(props, "123")
    return (
      <>
        <span>{props.data.rows}</span>
      </>
    );
  };

  const GroupingFilterSection = (props) => {
    if (props.data?.filtertype?.groups !== undefined) {
      return (
        <>
          <span>{props.data?.filtertype?.groups}</span>
        </>
      );
    }
    else if (props.data?.filtertype?.category !== undefined) {
      return (
        <>
          <span>{props.data?.filtertype?.category}</span>
        </>
      )
    }
    else if (props.data?.filtertype?.subCategory !== undefined) {
      return (
        <>
          <span>{props.data?.filtertype?.subCategory}</span>
        </>
      );
    }
    else if (props.data?.filtertype?.groupName !== undefined) {
      return (
        <>
          <span>{props.data?.filtertype?.groupName}</span>
        </>
      );
    }

    else if (props.data?.filtertype?.tags !== undefined) {
      return (
        <>
          <span>{props.data?.filtertype?.tags}</span>
        </>
      );
    }

    else { return <span>{props.data?.filtertype?.tags}</span> }
  };

  const paginationSection = (props) => {
    // console.log(props, "123")
    return (
      <>
        <span>{props.data.pagination}</span>
      </>
    );
  };

  const ChildMessageRenderer = (props) => {
    // console.log(props, "propsareimportant");
    return (
      <div className="iconActionList">
        <div className="editIcon" onClick={() => { setUpdateData(props.data) }} data-bs-toggle="modal"
          data-bs-target="#UpdateSections">
          <MdModeEditOutline className="ActionIcon " onClick={() => { setUpdateData(props.data) }} data-bs-toggle="modal"
            data-bs-target="#UpdateSections" />
        </div>
      </div>
    );
  };

  //--------------States for GROUPING-FILTER OPTIONS ----------------------//

  const [updateData, setUpdateData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const rowHeight = 55;


  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      getQuickFilterText: params => {
        return params.value.name;
      }
    };
  }, []);


  //------------FUNCTION TO GET ALL THE SECTION DATA (using get section api)-------------//
  function getSection() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getsection`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        // console.log(response.data.sectionData, "section")
        setSectionData(response.data.sectionData)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const groupingFilterValueGetter = params => {
    // console.log(params.data, "params");
    if (params.data?.group === "tags") {
      return (params.data?.filtertype?.tags);
    }
    else if (params.data?.group === "taggroups") {
      return (params.data?.filtertype?.groupName);
    }
    else if (params.data?.group === "subCategory") {
      return (params.data?.filtertype?.subCategory);
    }
    else if (params.data?.group === "category") {
      return (params.data?.filtertype?.category);
    }
    else if (params.data?.group === "groups") {
      return (params.data?.filtertype?.groups);
    }
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Sections
              </h4>
              <div className="modal fade" id="UpdateSections"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <UpdateSections updatedData={updateData} getSection={getSection} />
                </div>
              </div>

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
                            <p>Are you sure you want to delete this events</p>
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
                style={{  width: "100%" }}
                className="ag-theme-alpine tableFix"
              >

                <AgGridReact

                  // style={{ width: "100%", height: "100%;" }}
                  rowHeight={rowHeight}
                  rowData={sectionData}
                  defaultColDef={defaultColDef}
                  frameworkComponents={{
                    SrNoRenderer: SrNoRenderer,
                    sectionPage: SectionPage,
                    section: section,
                    sectionDescription: sectionDescription,
                    StatusSection: StatusSection,
                    TrendingSection: TrendingSection,
                    logictypeSection: logictypeSection,
                    sectionObjectname: sectionObjectname,
                    sectionGrouping: sectionGrouping,
                    rowsSection: rowsSection,
                    groupingFilterSection: GroupingFilterSection,
                    paginationSection: paginationSection,
                    childMessageRenderer: ChildMessageRenderer
                  }}
                >
                  <AgGridColumn
                    width={100}
                    field="SrNo"
                    cellRenderer="SrNoRenderer"
                    sortable={true}
                    filter={true}
                    pinned="left"
                  ></AgGridColumn>

                  <AgGridColumn
                    width={100}
                    field="Actions"
                    cellRenderer="childMessageRenderer"
                    sortable={true}
                    filter={true}
                    pinned="left"
                  ></AgGridColumn>

                  <AgGridColumn
                    width={120}
                    field="page"
                    cellRenderer="sectionPage"
                    sortable={true}
                    filter={true}
                    pinned="left"
                  ></AgGridColumn>

                  <AgGridColumn
                    width={120}
                    field="section"
                    cellRenderer="section"
                    sortable={true}
                    filter={true}
                    pinned="left"
                  ></AgGridColumn>

                  <AgGridColumn
                    width={115}
                    field="logictype"
                    cellRenderer="logictypeSection"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={240}
                    field="description"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={130}
                    field="Objectname"
                    cellRenderer="sectionObjectname"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={100}
                    field="group"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    cellRenderer="groupingFilterSection"
                    headerName="Grouping-Filter"
                    field="filtertype"
                    valueGetter={groupingFilterValueGetter}
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    cellRenderer="TrendingSection"
                    field="Trending"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    cellRenderer="StatusSection"
                    field="Status"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={80}
                    cellRenderer="rowsSection"
                    field="rows"
                    sortable={false}
                    filter={false}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={120}
                    cellRenderer="paginationSection"
                    field="pagination"
                    sortable={false}
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

export default Sections;