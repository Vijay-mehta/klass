import React, { useState, useMemo, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Faqs.css";
// import "./UpdateEvents.css";
import "../Students/Students.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { useHistory } from "react-router-dom";

const SrNoRenderer = (props) => {
  console.log(props, "props")
  return (
    <>
      <span>{props.node.rowIndex + 1}</span>
    </>
  );
};


const GroupRenderer = (props, groupId) => {
  console.log(props, "1234")

  return (
    <span className="profle_img_box">
      <stong>{
        props.data?.groupId?.groups}</stong>
      <stong>{props.data?.classId?.businessName}</stong>
    </span>
  );
};

const TypeRenderer = (props) => {
  console.log(props, "1234")
  if (props.data.groupId == undefined) {
    return <stong>Class</stong>
  } else {
    return <stong>Group</stong>
  }


};



function Faqs() {
  const [rowData, setRowData] = useState([]);

  const [DeleteFaq, setDeleteFaq] = useState("");
  const [viewFaq, setViewFaq] = useState("");
  const [faqList, setFaqList] = useState([]);

  console.log(viewFaq, "33333")

  // let faqArray=[];
  // viewFaq.map((faq)=>{
  //   faqArray.push({faqAnswer:faq.answer,faqquestion:faq.question})
  //   console.log(faqArray,"faqArray")
  // }
  // )

  const pagination = true;
  const paginationPageSize = 10;
  const rowHeight = 55;
  let history = useHistory();

  useEffect(() => {
    getFaq();
  }, []);


  function getFaq() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getfaq`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "getgroup555")
        setRowData(response.data.groupData)

        // var result = response.data.groupData.map(faq =>  ({ faqans: faq.answer, faqque: faq.question,faqsqu:faq.sequenceNumber }));
        // console.log(typeof result,"44444")
        // let group = [];
        // const groupdata = response.data.taggroupData;
        // groupdata.map((groupCat, index) => {
        //   group.push({ grpId: groupCat._id, groupyName: groupCat.groupName })
        // })
        // setRowData(response.data.taggroupData);
        // console.log(response.data.taggroupData,"0000");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteFaq(id) {
    var data = JSON.stringify({
      FAQId: id,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deletefaq`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // window.location.reload(false);
        getFaq()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const ChildMessageRenderer = (props) => {
    console.log(props, "8898989")
    return (
      <div className="iconActionList">
        <div className="ViewIcon"
        onClick={() => {
          console.log(props.data, "viewtag11");

          setFaqList(props.data.faqData)
          setViewFaq(props.data);
        }}
        data-bs-toggle="modal"
        data-bs-target="#FaqViewId"
        >
          <AiFillEye
            className="ActionIcon"
            
          />
        </div>

        <div className="editIcon"
          onClick={() => {
            history.push({
              pathname: "UpdateFaqs",
              state: { details: props.data },
            });
          }}
        >
          <MdModeEditOutline
            className="ActionIcon"
          
          />
        </div>
        
        <div className="DeleteIcon"
         onClick={() => {
          console.log(props.data.faqData, "props.data")
          setDeleteFaq(props.data._id);
        }}
        data-bs-toggle="modal"
        data-bs-target="#FaqDeleteId"
        >
          <AiFillDelete
            className="ActionIcon"
           
          />
        </div>
      </div>
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


  const typeValueGetter = params =>{
    if(params?.data?.classId !== undefined){
      return ("Class");
    }
    else if(params?.data?.groupId !== undefined){
      return ("Group");
    }
  }

  const businessValueGetter = params =>{
    console.log(params.data,"params");
    if(params?.data?.classId !== undefined){
      return (params?.data?.classId?.businessName);
    }
    else if(params?.data?.groupId !== undefined){
      return (params?.data?.groupId?.groups);
    }
    }

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
                FAQ's
                <div className="float-end btns_head">
                  <button
                    className="btn btn-theme btn-sm"
                    onClick={() => {
                      history.push("/AddFaqs");
                    }}
                  >
                    Add New FAQ
                  </button>
                  <button className="btn btn-theme btn-sm">Upload CSV</button>
                </div>
              </h4>

              <div
                className="modal fade DeletePopup"
                id="FaqDeleteId"
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
                            <p>Are you sure you want to delete this faq?</p>
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
                                deleteFaq(DeleteFaq);
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
                id="FaqViewId"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-body" style={{ minHeight: "470px" }}>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label"> FAQ Detail </label>
                          <div className="position-relative">
                            <table className="table table-bordered table_fix_width">
                              <tbody>


                                <tr>
                                  <th>Name</th>
                                  <td>
                                    {viewFaq.classId?.businessName}
                                    {viewFaq.groupId?.groups}

                                  </td>
                                </tr>
                                </tbody>
                            </table>
                                
                                {faqList?.map((faqService, index) => (
                                  <div >
                                  <div >
                                    <strong>Question &nbsp;{index+1}</strong>
                                    <textarea disabled className="form-control"  >
                                      {faqService.question}
                                    </textarea>
                                    </div>
                                  <div>
                                  <strong>Answer &nbsp;{index+1}</strong>
                                    <textarea disabled className="form-control" >
                                      {faqService.answer}
                                    </textarea>
                                    </div>
                                    </div>
                                ))}
                              
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
                 style={{  width: "100%" }}
                 className="ag-theme-alpine tableFix"
              >
                <AgGridReact
                  // style={{ width: "100%", height: "100%;" }}
                  rowHeight={rowHeight}
                  // pagination={pagination}
                  // paginationPageSize={paginationPageSize}
                  rowData={rowData}
                  // domLayout="autoHeight"
                  defaultColDef={defaultColDef}
                  frameworkComponents={{
                    childMessageRenderer: ChildMessageRenderer,
                    srNoRenderer: SrNoRenderer,
                    groupRenderer: GroupRenderer,
                    typeRenderer: TypeRenderer,
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
                    width={140}
                    field="Actions"
                    cellRenderer="childMessageRenderer"
                    colId="params"
                    sortable={true}
                    filter={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    width={90}
                    field="Type"
                    cellRenderer="typeRenderer"
                    valueGetter={typeValueGetter}
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    // floatingFilter={true}
                     filter={true}
                  ></AgGridColumn>

                  <AgGridColumn
                    width={300}
                    field="businessName"
                    cellRenderer="groupRenderer"
                    valueGetter={businessValueGetter}
                    sortable={true}
                    comparator={customLowerCaseComparator}
                    // floatingFilter={true}
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

export default Faqs;
