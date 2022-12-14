import React, { useState, useMemo, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import Select from "react-select";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Class.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { FiEdit2 } from "react-icons/fi";
import JoditEditor from "jodit-react";
//import Class from "../Class/Class";
import { useHistory, useParams, useLocation } from "react-router-dom";



function UpdateClass(props){
  let location = useLocation();
  //--------States to Manage INCOMING DATA AND INPUT VALUES--------//
  let classDetails = location.state.details;
  console.log(classDetails,"cls")
  const [defaultWebsite, setDefaultWebsite] = useState("")
  const [defaultEmail, setDefaultEmail]= useState("")
  const [response, setResponse] = useState()
  const [data, setData] = useState([]);
  const [rd, setRd] = useState();
  const [businessOptions, setBusinessOptions] = useState([]);
  const [defaultBusinessOptions, setDefaultBusinessOptions]= useState([]);
  const [defaultPhoneNumber, setDefaultPhoneNumber] = useState("")
  const [classImages, setClassImages] = useState([]);
  const [classImagesBE, setClassImagesBE] = useState();
  const [className, setClassName] = useState("");
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [defaultSubcategoryOptions, setDefaultSubcategoryOptions] = useState([]);
  const [selectedSubcategories, setSelectdSubcategories] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [webAddress, setWebAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [content, setContent] = useState("");
  const editor = useRef(null);
  let history = useHistory();
  let { id } = useParams();
  console.log(id)
  //setContent(classDetails.aboutBusiness);
  
  //--------States to Manage OUTGOING DATA--------//
  
  const [businessId, setbusinessId] = useState("");
  const [businessName, setBusinessName] = useState();
  const [rowData, setRowData] = useState([]);
  const [UpdateBusinessData, setUpdateBusinessData] = useState({});
  const [Businessview, setBusinessview] = useState([]);
  const [DeleteBusinessId, setDeleteBusinessId] = useState("");
  const [Classview, setClassview] = useState([]);
  const [aboutBusiness, setAboutBusiness] = useState("");
  const [getCategoryId, setgetCategoryId] = useState("");
  const [getSubCategoryId, setgetSubCategoryId] = useState("");
  const [rowData1, setRowData1] = useState([]);
  const [getbusiness, setgetbusiness] = useState([]);
  const [rowDatasubcategory, setRowDatasubcategory] = useState([]);
  const [options, setoptions] = useState([]);
  const [optionsSubcategory, setoptionsSubcategory] = useState([]);
  const [selectedOptionSub, setselectedOptionSub] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);
  
  const config = {
    readonly: false,
    height: 400
  };

  useEffect(()=>{
    getBusinessNew();
    getSubcategory();
    getNewTag();
    getClassById();
  },[])

  //--------CLASS EDIT API--------//

  function editClass() {
    var data = new FormData();

    for(var i =0 ; i<classImages.length; i++){
      data.append("image",classImages[i])
    }
    data.append("userId", businessId);
    data.append("businessName", className);
    data.append("aboutBusiness", content);
    console.log(content,"aboutBusiness")
    data.append("businesssubCategory", selectedSubcategories);
    data.append("webAddress", webAddress);
    data.append("tags", selectedTags);
    //data.append("businessCategory", getCategoryId);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editclass`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
        "enctype": "multipart/form-data"
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data, "addclasses");
        history.push("/Class")
      })
      .catch(function (error) {
        console.log(error);
      });
      history.push("/Class")
  }

  //--------CLASS BY ID GET API--------//

  function getClassById() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getclassbyid?classId=${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        //setResponse(response)
        setData(response.data);
        console.log(response.data,"responsedata")
        let a=[]
        let arrayBusiness = [];
        //let businessDetails = response.data.businessDetails;
        a = Object.values(response.data.businessDetails)
        arrayBusiness.push({value:a[0], label:a[1]})
        setDefaultBusinessOptions(arrayBusiness) 
        
        let arrayClass = []
        a= response.data.classDetails.businesssubCategory;
        a.map(item=>{
          arrayClass.push({value:item._id, label:item.subCategory});
        })
        setDefaultSubcategoryOptions(arrayClass);

        setDefaultPhoneNumber(response.data.businessDetails.mobileNo);

        setDefaultEmail(response.data.businessDetails.email);

        setDefaultWebsite(response.data.classDetails.webAddress)

        let arrayTags = [];
        a= response.data.classDetails.tags;
        arrayTags.map(item=>{
          arrayTags.push({value:item._id, label:item.subCategory});
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //--------BUSINESS GET API--------//

  function getBusinessNew() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getbusiness`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.data,"con")
        response.data?.data?.map((item)=>{
          businessOptions.push({value: item._id, label: item.name})
        })
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  //--------SUBCATEGORY GET API--------//

  const getSubcategory = (subcategoryID) => {
    console.log(subcategoryID, "getSubcategory")
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
        console.log(response, "123")
        let subcategory = [];
        const categorydata = response.data.SubcategoryData;
        categorydata.map((subCat, index) => {
          subcategoryOptions.push({ value: subCat._id, label: subCat.subCategory })
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 
  //--------POSTAL CODE GET API--------//

  function getAddressPostCode() {
    var data = JSON.stringify({
      'postalCode': postalCode,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/getAddressPostcode`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        setAddress1(response.data.addressfrompostcode.address[0].BUILDING);
        setAddress2(response.data.addressfrompostcode.address[0].ADDRESS);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //--------TAGS GET API--------//

  function getNewTag() {
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
          tagOptions.push({ value: tag._id, label: tag.tags });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

 //--------This function is not used--------//
  const handleUpdate = (event) => {
    const editorContent = event.target.innerHTML;
    setContent(editorContent);
  };

  //--------Function to handle and set Class Images--------//

  const handleClassImages = (event) =>{
    let fileArray = Array.from(event.target.files).map(item=>URL.createObjectURL(item));
    setClassImages((prevImages)=>prevImages.concat(fileArray));
  }

  //--------Function to render images--------//

  const renderImages=(images)=>{
    return images.map((single_image)=>{
      return (<img style={{ width:"110px", height:"140px" }}  src={single_image} key={single_image} />) 
    })
    
  }
  
    
  //--------REACT SELECT LIBRARY METHODS--------//

  //--------Function to handle Business options in Select--------//

  const handleBusinessChange = (event) =>{
    setbusinessId(event.value)
  }

  //--------Function to handle Subcategory options in Multiselect--------//

   const handleSubcategoryOptions =(event)=>{
     console.log(event,"event")
     let array=[]
     event?.map((item)=>{
       array?.push(item.value)
     })
     setSelectdSubcategories(array);
     console.log(array,"sc")
   }

  //--------Function to handle Tag options in Multiselect--------//

  const handleTagOptions =(event) =>{ 
    let array=[];
    event.map(item=>{
      array.push(item.value)
    })
    setSelectedTags(array);
    console.log(array,"ar")
  }



  return(
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
          <div className="card-body">
              <h4 className="card-title">
               Edit Class
              </h4>
              <div className="col-md-12 mb-3 mt-3">
                  <label className="form-label">Select Business</label>
                  <Select
                    value={defaultBusinessOptions} 
                    key={defaultBusinessOptions.map(item=>{return data.value})}
                    options={businessOptions}
                    onChange={handleBusinessChange}
                  />
                </div>
              <div className="BusinessBasic">
              <div className="row">
                <div className="col-md-12">
                <label className="form-label" style={{ color:"#f9560f", fontWeight:"500" }}>Class Basic Details</label>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Add Class Images</label>
                  <ul className="imagesUpload">
                    <li>
                    <input type="file" multiple onChange={(event)=>{handleClassImages(event); setClassImagesBE(event)}}/>
                    <button>Choose Files</button>
                    </li>
                    {renderImages(classImages)}
                  </ul>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Class Name</label>
                  <input type="text" 
                         className="form-control" 
                         value = {classDetails.businessName} 
                         onChange = {(event)=>{
                         setClassName(event.target.value)
                          }}
                        />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Class Category</label>
                  <Select 
                    isMulti
                    defaultValue={defaultSubcategoryOptions?.map(item=>{return {value:item.value, label:item.label}})}
                    key={defaultSubcategoryOptions?.map(item=>{return item.value})}
                    options={subcategoryOptions}
                    onChange={handleSubcategoryOptions}
                    />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="text" 
                  className="form-control" 
                  value= {defaultPhoneNumber}
                  onChange={(event)=>{setPhoneNumber(event.target.value)}}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" 
                  value={defaultEmail}
                  className="form-control" 
                  onChange={(event)=>{setEmail(event.target.value)}}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Website</label>
                  <input type="text" 
                  value={defaultWebsite}
                  className="form-control" 
                  onChange={(event)=>{setWebAddress(event.target.value)}}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">About Class</label>
                  <div className="App">
                      <JoditEditor
                              ref={editor}
                                value={content}
                                config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                    </div>
                </div>
                
                <div className="col-md-2 mb-3">
                  <label className="form-label">Postal Code</label>
                  <input type="text" 
                  className="form-control"
                  onChange={(event)=>{setPostalCode(event.target.value);}}
                  onBlur={getAddressPostCode}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Address 1</label>
                  <input type="text" 
                  className="form-control"
                  value={address1}
                  onChange={(event)=>{setAddress1(event.target.value)}}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Address 2</label>
                  <input type="text" 
                  className="form-control" 
                  value={address2}
                  onChange={(event)=>{setAddress2(event.target.value)}}
                  />
                </div>
                <div className="col-md-2 mb-3">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control" value="Singapore" disabled />
                </div>
              </div>
              </div>

              <div className="col-md-12 mb-3 mt-3">
                  {/* <label className="form-label">Branches</label> */}
                  <select className="form-control form-select">
                    <option>Jaipur Branch</option>
                    <option>Add New Branch</option>
                  </select>
                </div>

            <div className="BusinessBasic branchData">
              <div className="row">
              <div className="col-md-6 mb-3">
                  <label className="form-label">Branch Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control" value="Singapore" disabled />
                </div>
              <div className="col-md-2 mb-3">
                  <label className="form-label">Postal Code</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-5 mb-3">
                  <label className="form-label">Address 1</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-5 mb-3">
                  <label className="form-label">Address 2</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
             </div>

             
             <div className="col-md-12 mb-3 mt-4">
                  <label className="form-label">Tags</label>
                  <Select
                    isMulti
                    options={tagOptions}
                    onChange={handleTagOptions}
                  />
                </div>

             <ul class="nav nav-tabs bottomTabbing" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#tabN1">Programs</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#tabN2">Reviews</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#tabN3">Teachers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#tabN4">Gallery</a>
              </li>
            </ul>

            <div class="tab-content bottomTabbingBody">
            <div id="tabN1" class="tab-pane active">
              <div className="add_Btn" data-bs-toggle="modal" data-bs-target="#addProgram">
                <AiOutlinePlusSquare /> Add Program
              </div>

              <ul class="reviewList programs">
                        <li class="border-0">
                            <h5>Program Name
                            <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editProgram" /></h5>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatist... <a href="javascript:void(0);">Read more</a></p>
                        </li>
                        <li class="border-0">
                            <h5>Program Name
                            <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editProgram" /></h5>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium... <a href="javascript:void(0);">Read more</a></p>
                        </li>
                        <li class="border-0">
                            <h5>Program Name
                            <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editProgram" /></h5>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatist... <a href="javascript:void(0);">Read more</a></p>
                        </li>
                    </ul>

            </div>
            <div id="tabN2" class=" tab-pane fade">
           
                  <ul class="reviewList">
                        <li>
                            <h5>
                                Martin Holub  <AiFillDelete className="editProgram" />
                            </h5>
                            <div class="review-rating">
                                <div class="review-stars notranslate">
                                    <span style={{ width:"90%" }} class="review-stars-range"></span>
                                </div>
                                <div class="rating-total">2 days ago</div>
                            </div>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatist... <a href="javascript:void(0);">Read more</a></p>
                        </li>
                        <li>
                            <h5>
                                Martin Holub  <AiFillDelete className="editProgram" />
                            </h5>
                            <div class="review-rating">
                                <div class="review-stars notranslate">
                                    <span style={{ width:"90%" }} class="review-stars-range"></span>
                                </div>
                                <div class="rating-total">2 days ago</div>
                            </div>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatist... <a href="javascript:void(0);">Read more</a></p>
                        </li>
                        <li>
                            <h5>
                                Martin Holub  <AiFillDelete className="editProgram" />
                            </h5>
                            <div class="review-rating">
                                <div class="review-stars notranslate">
                                    <span style={{ width:"90%" }} class="review-stars-range"></span>
                                </div>
                                <div class="rating-total">2 days ago</div>
                            </div>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatist... <a href="javascript:void(0);">Read more</a></p>
                        </li>
                    </ul>
            </div>
            <div id="tabN3" class=" tab-pane fade">
            <div className="add_Btn" data-bs-toggle="modal" data-bs-target="#addTeacher">
                <AiOutlinePlusSquare /> Add Teacher
              </div>
            <ul class="tearcherList">
                        <li>
                            <img class="catImg" src="../../images/defalutimg.svg" />
                            <div class="tearcherListBody">
                                <h5>Teacher???s Name
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editTeacher" /></h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry..... <a href="javascript:void(0);">Read more</a></p>
                            </div>
                        </li>
                        <li>
                            <img class="catImg" src="../../images/defalutimg.svg" />
                            <div class="tearcherListBody">
                                <h5>Teacher???s Name
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editTeacher" /></h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry..... <a href="javascript:void(0);">Read more</a></p>
                            </div>
                        </li>
                        <li>
                            <img class="catImg" src="../../images/defalutimg.svg" />
                            <div class="tearcherListBody">
                                <h5>Teacher???s Name
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editTeacher" /></h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry..... <a href="javascript:void(0);">Read more</a></p>
                            </div>
                        </li>
                        <li>
                            <img class="catImg" src="../../images/defalutimg.svg" />
                            <div class="tearcherListBody">
                                <h5>Teacher???s Name
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editTeacher" /></h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry..... <a href="javascript:void(0);">Read more</a></p>
                            </div>
                        </li>
                        <li>
                            <img class="catImg" src="../../images/defalutimg.svg" />
                            <div class="tearcherListBody">
                                <h5>Teacher???s Name
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editTeacher" /></h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry..... <a href="javascript:void(0);">Read more</a></p>
                            </div>
                        </li>
                    </ul>
            </div>
            <div id="tabN4" class=" tab-pane fade">
            <div className="add_Btn" data-bs-toggle="modal" data-bs-target="#addGallery">
                <AiOutlinePlusSquare /> Add Gallery
              </div>
            <div class="row m-0">
                    
                    <div className="col-md-3 col-6">
                        <div className="classSection">
                            <div className="classSectionImg editGallery">
                                <img className="catImg" src="../../images/defalutimg.svg" />
                                
                                <a href="javascript:void(0);" className="editIcon">
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editGallery" />
                                </a>
                            </div>
                            <div className="classSectionBody">
                            <a href="javascript:void(0);" className="titleName">
                                Album Name
                            </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-3 col-6">
                        <div className="classSection">
                            <div className="classSectionImg editGallery">
                                <img className="catImg" src="../../images/defalutimg.svg" />
                                
                                <a href="javascript:void(0);" className="editIcon">
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editGallery" />
                                </a>
                            </div>
                            <div className="classSectionBody">
                            <a href="javascript:void(0);" className="titleName">
                                Album Name
                            </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-3 col-6">
                        <div className="classSection">
                            <div className="classSectionImg editGallery">
                                <img className="catImg" src="../../images/defalutimg.svg" />
                                
                                <a href="javascript:void(0);" className="editIcon">
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editGallery" />
                                </a>
                            </div>
                            <div className="classSectionBody">
                            <a href="javascript:void(0);" className="titleName">
                                Album Name
                            </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-3 col-6">
                        <div className="classSection">
                            <div className="classSectionImg editGallery">
                                <img className="catImg" src="../../images/defalutimg.svg" />
                                
                                <a href="javascript:void(0);" className="editIcon">
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editGallery" />
                                </a>
                            </div>
                            <div className="classSectionBody">
                            <a href="javascript:void(0);" className="titleName">
                                Album Name
                            </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-3 col-6">
                        <div className="classSection">
                            <div className="classSectionImg editGallery">
                                <img className="catImg" src="../../images/defalutimg.svg" />
                                
                                <a href="javascript:void(0);" className="editIcon">
                                <FiEdit2 className="editProgram" data-bs-toggle="modal" data-bs-target="#editGallery" />
                                </a>
                            </div>
                            <div className="classSectionBody">
                            <a href="javascript:void(0);" className="titleName">
                                Album Name
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div class="col-md-12">
                  <button type="button" class="btn CancelBtn me-3">Cancel</button>
                  <button type="button" class="btn submitBtn me-3">Submit</button>
          </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />


 
<div class="modal" id="addProgram">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Add Program</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
          <div className="col-md-12 mb-3 mt-4">
                  <label className="form-label">Select Branch</label>
                  <select className="form-control form-select">
                    <option>--- Select Branch ---</option>
                  </select>
                </div>
         <div className="col-md-12 mb-3">
            <label className="form-label">Program Name</label>
            <input type="text" className="form-control" value=""  />
          </div>
          <div className="col-md-12 mb-3">
                  <label className="form-label">Program Description</label>
                  <div className="App">
                      <JoditEditor
                              ref={editor}
                                value={content}
                                config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                    </div>
                </div>
          </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger CancelBtn" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn submitBtn" data-bs-dismiss="modal">Submit</button>
      </div>

    </div>
  </div>
</div>


<div class="modal" id="editProgram">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Edit Program</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
          <div className="col-md-12 mb-3 mt-4">
                  <label className="form-label">Select Branch</label>
                  <select className="form-control form-select">
                    <option>--- Select Branch ---</option>
                  </select>
                </div>
         <div className="col-md-12 mb-3">
            <label className="form-label">Program Name</label>
            <input type="text" className="form-control" value=""  />
          </div>
          <div className="col-md-12 mb-3">
                  <label className="form-label">Program Description</label>
                  <div className="App">
                      <JoditEditor
                              ref={editor}
                                value={content}
                                config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                    </div>
                </div>
          </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger CancelBtn" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn submitBtn" data-bs-dismiss="modal">Submit</button>
      </div>

    </div>
  </div>
</div>


<div class="modal" id="addTeacher">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Add Teacher</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
          <div className="col-md-12 mb-3 mt-4">
                  <label className="form-label">Select Branch</label>
                  <select className="form-control form-select">
                    <option>--- Select Branch ---</option>
                  </select>
                </div>
          <div className="col-md-12 mb-3">
                  <label className="form-label">Add Teacher Image</label>
                  <ul className="imagesUpload">
                    <li>
                      <input type="file"/>
                      <img src="../../images/defalutimg.svg" />
                    </li>
                  </ul>
                </div>
         <div className="col-md-12 mb-3">
            <label className="form-label">Teacher Name</label>
            <input type="text" className="form-control" value=""  />
          </div>
          <div className="col-md-12 mb-3">
                  <label className="form-label">Teacher Description</label>
                  <div className="App">
                      <JoditEditor
                              ref={editor}
                                value={content}
                                config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                    </div>
                </div>
          </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger CancelBtn" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn submitBtn" data-bs-dismiss="modal">Submit</button>
      </div>

    </div>
  </div>
</div>


<div class="modal" id="editTeacher">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Edit Teacher</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
          <div className="col-md-12 mb-3 mt-4">
                  <label className="form-label">Select Branch</label>
                  <select className="form-control form-select">
                    <option>--- Select Branch ---</option>
                  </select>
                </div>
          <div className="col-md-12 mb-3">
                  <label className="form-label">Add Teacher Image</label>
                  <ul className="imagesUpload">
                    <li>
                      <input type="file"/>
                      <img src="../../images/defalutimg.svg" />
                    </li>
                  </ul>
                </div>
         <div className="col-md-12 mb-3">
            <label className="form-label">Teacher Name</label>
            <input type="text" className="form-control" value=""  />
          </div>
          <div className="col-md-12 mb-3">
                  <label className="form-label">Teacher Description</label>
                  <div className="App">
                      <JoditEditor
                              ref={editor}
                                value={content}
                                config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                    </div>
                </div>
          </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger CancelBtn" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn submitBtn" data-bs-dismiss="modal">Submit</button>
      </div>

    </div>
  </div>
</div>


<div class="modal" id="addGallery">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Add Gallery</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
          <div className="col-md-12 mb-3 mt-4">
                  <label className="form-label">Select Branch</label>
                  <select className="form-control form-select">
                    <option>--- Select Branch ---</option>
                  </select>
                </div>
         <div className="col-md-12 mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" value=""  />
          </div>
          <div className="col-md-12 mb-3">
                  <label className="form-label">Add Image / Video</label>
                  <ul className="imagesUpload">
                    <li>
                      <input type="file"/>
                      <img src="../../images/defalutimg.svg" />
                    </li>
                  </ul>
                </div>
          </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger CancelBtn" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn submitBtn" data-bs-dismiss="modal">Submit</button>
      </div>

    </div>
  </div>
</div>


<div class="modal" id="editGallery">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Edit Gallery</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
          <div className="col-md-12 mb-3 mt-4">
                  <label className="form-label">Select Branch</label>
                  <select className="form-control form-select">
                    <option>--- Select Branch ---</option>
                  </select>
                </div>
         <div className="col-md-12 mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" value=""  />
          </div>
          <div className="col-md-12 mb-3">
                  <label className="form-label">Add Image / Video</label>
                  <ul className="imagesUpload">
                    <li>
                      <input type="file"/>
                      <img src="../../images/defalutimg.svg" />
                    </li>
                  </ul>
                </div>
          </div>

      

    </div>
  </div>
</div>


    </>
  )
}

export default UpdateClass;