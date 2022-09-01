import React, { useState, useMemo, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Articles.css";
import "../Students/Students.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { useHistory } from 'react-router-dom'
import ToggleButton from "../../components/Toggle_Button/ToggleButton";
import Modal_Popup from "../../components/modal_renderer/Modal_Popup";


const SrNoRenderer = (props) => {
  return (
    <>
      <span>{props.node.rowIndex + 1}</span>
    </>
  );
};

const ImageRenderer = (props, ref) => {
  return (
    <span className="profle_img_box">
      <img className="profile_img_table" src={props.data.authorimage} alt="icon" />
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

const CreatedByRenderer = (props) => {
  return (
    <>
      <span>{props.data.createdBy}</span>
    </>
  );
};

const DescriptionRenderer = (props) => {
  return (
    <>
      <span>{props.data.description}</span>
    </>
  );
};

const TagsRenderer = (props) => {
  // console.log(props,"props")
  // let text = [];
  // let arr = props.data.tags;
  // arr.map((item) => {
  //   // console.log(item.tags,"arr")
  //   text.push(item.tags);
  // })

  return (
    <span className="profle_img_box">
      <span>{props?.data?.tags?.join(", ")}</span>
    </span>
  );
};

const GroupRender = (props) => {
  // let textgroup = [];
  // let arrgroup = props.data.groupId;
  // arrgroup.map((item) => {
  //   textgroup.push(item.groups);
  // })

  return (
    <span className="profle_img_box">
      <span>{props?.data?.groupId?.join(", ")}</span>
    </span>
  );
};

function Articles() {
  const [rowData, setRowData] = useState([]);
  const [DeleteBusinessId, setDeleteBusinessId] = useState("");
  const [options, setoptions] = useState([]);
  const rowHeight = 55;

  let history = useHistory();


  useEffect(() => {
    getarticles();
    getnewtag();
  }, []);
  // ----Delete article API ---//

  function articlesdeleteData(id) {
    var data = JSON.stringify({
      articleId: id,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deletearticles`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        getarticles();
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  // ---- Get article API ---//

  function getarticles() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getarticles`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.articleData, "articleData")
        setRowData(response.data.articleData);
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
        // console.log(response,"response234")
        let arr = [];
        response.data.tagData.forEach((tag, index) => {
          arr.push({ value: tag._id, label: tag.tags });
        }

        );
        setoptions(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  function changeArticleStatus(articleId) {
    var data = JSON.stringify({
      "articleId": articleId,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changearticleStatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data, "changeeventstatus")
        getarticles();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function changeArticleTrendingStatus(articleId) {
    var data = JSON.stringify({
      "articleId": articleId,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changearticletrendingstatus`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data, "changeClassstatus")
        getarticles();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const StatusRenderer = (props) => {
    let status = props?.data?.status ? "deactivate" : "activate";
    let message = "Are you sure you want to "+status+" this article?";
    return (<>
      <Modal_Popup status={props?.data?.status}
        onClick={() => { changeArticleStatus(props?.data?._id); }}
        message={message}
      />
      {/* <ToggleButton handleToggle={() => { changeArticleStatus(props?.data?._id) }} status={props?.data?.status}/> */}
    </>)
    // return (<>
    //   {props?.data.status === true ? <button className="btn btn-success btn-sm" onClick={() => { changeArticleStatus(props?.data._id) }} >Verified</button> : <button className="btn btn-danger btn-sm" onClick={() => { changeArticleStatus(props?.data._id) }}>Not Verified</button>}
    // </>);
  }

  const TrendingRender = (props) => {
    // console.log(props, "fghijokp")
    return (
      <ToggleButton handleToggle={() => { changeArticleTrendingStatus(props?.data?._id) }} status={props?.data?.trending} />
      // <> 
      //   {props.data.trending === true ? <button className="btn btn-success btn-sm" onClick={() => { changeArticleTrendingStatus(props.data._id) }} >Trending</button> : <button className="btn btn-danger btn-sm" onClick={() => { changeArticleTrendingStatus(props.data._id) }}>Not Trending</button>}
      // </>
    );
  }

  const token = `${localStorage.getItem('token')}`
  let encoded = encodeURIComponent(token);
  // console.log(encoded,"encoded");


  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div className="ViewIcon" onClick={(e) => {
          e.preventDefault();
          window.open(`http://angularklassbook.s3-website.us-east-2.amazonaws.com/#/admin/admin-articles/${props.data._id}/${encoded}`, '_blank', 'noopener,noreferrer')
        }}>
          <AiFillEye

          />
        </div>
        <div className="editIcon"
          onClick={() => history.push({
            pathname: "/UpdateArticles",
            state: { details: props.data }
          })}>
          <MdModeEditOutline
            className="ActionIcon"

          />
        </div>
        <div className="DeleteIcon" onClick={() => {
          setDeleteBusinessId(props.data._id);
        }}
          data-bs-toggle="modal"
          data-bs-target="#BusinessDeleteId">
          <AiFillDelete
            className="ActionIcon"
          />
        </div>
      </div>
    );
  };

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      getQuickFilterText: params => {
        return params.value.name;
      }
    };
  }, []);

  const tagValueGetter = params => {
    // console.log(params.data.tags,"params")
    return (params.data?.tags?.map(item => {
      // console.log(item.tags,"params")
      return item.tags;
    }));
  }

  const groupValueGetter = params => {
    // console.log(params.data?.groupId,"params")
    return (params.data?.groupId?.map(item => {
      // console.log(item.groups,"params")
      return item.groups;
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
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Articles
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    onClick={() => history.push("./AddArticles")}
                  >
                    Add New Article
                  </button>
                  <button
                    className="btn btn-theme btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "http://192.168.1.22:4200/#/";
                    }}
                  >
                    Upload CSV
                  </button>
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
                            <p>Are you sure you want to delete this article?</p>
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
                                articlesdeleteData(DeleteBusinessId);
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
              <div>
                <div
                  style={{ width: "100%" }}
                  className="ag-theme-alpine tableFix"
                >
                  <AgGridReact
                    // style={{ width: "100%", height: "100%;" }}
                    rowHeight={rowHeight}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    frameworkComponents={{
                      childMessageRenderer: ChildMessageRenderer,
                      srNoRenderer: SrNoRenderer,
                      titleRenderer: TitleRenderer,
                      createdByRenderer: CreatedByRenderer,
                      descriptionRenderer: DescriptionRenderer,
                      imageRenderer: ImageRenderer,
                      tagRenderer: TagsRenderer,
                      statusRenderer: StatusRenderer,
                      TrendingRender: TrendingRender,
                      GroupRender: GroupRender,
                    }}
                  >
                    <AgGridColumn
                      width={90}
                      field="SrNo"
                      cellRenderer="srNoRenderer"
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
                      width={140}
                      field="title"
                      cellRenderer="titleRenderer"
                      sortable={true}
                      filter={true}
                      comparator={customLowerCaseComparator}
                      pinned="left"
                    ></AgGridColumn>
                    <AgGridColumn
                      width={150}
                      field="authorName"
                      sortable={true}
                      filter={true}
                      comparator={customLowerCaseComparator}
                      pinned="left"
                    ></AgGridColumn>
                    <AgGridColumn
                      width={200}
                      field="tags"
                      cellRenderer="tagRenderer"
                      valueGetter={tagValueGetter}
                      sortable={true}
                      filter={true}
                      comparator={customLowerCaseComparator}
                    ></AgGridColumn>
                    <AgGridColumn
                      width={250}
                      field="groups"
                      cellRenderer="GroupRender"
                      valueGetter={groupValueGetter}
                      sortable={true}
                      filter={true}
                      comparator={customLowerCaseComparator}
                    ></AgGridColumn>
                    <AgGridColumn
                      width={125}
                      field="author image"
                      cellRenderer="imageRenderer"
                      sortable={false}
                      filter={false}
                    ></AgGridColumn>

                    <AgGridColumn
                      cellRenderer="statusRenderer"
                      width={90}
                      field="status"
                      sortable={true}
                      filter={false}
                      comparator={customLowerCaseComparator}
                    ></AgGridColumn>

                    <AgGridColumn
                      cellRenderer="TrendingRender"
                      width={95}
                      field="trending"
                      sortable={true}
                      filter={false}
                      comparator={customLowerCaseComparator}
                    ></AgGridColumn>
                  </AgGridReact>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Articles;