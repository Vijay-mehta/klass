import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const UpdateClass = (props) => {
    let editCLassData = props.updatedData;
    console.log(editCLassData, "editClassData");
    const [businessName, setBusinessName] = useState("");
    const [aboutBusiness, setAboutBusiness] = useState("");
    const [priority, setpriority] = useState("");
    const [getCategoryId, setgetCategoryId] = useState("");
    const [getSubCategoryId, setgetSubCategoryId] = useState("");
    const [webAddress, setWebAddress] = useState("");
    const [editBusinessNameId, seteditBusinessNameId] = useState(null);
    const [rowDatasubcategory, setowDatasubcategory] = useState();
    const [options, setoptions] = useState([]);
    const [defaultoptions, setdefaultoptions] = useState([]);
    const [selectedOptionone, setselectedOptionone] = useState([]);
    const [selectedOptiononeDefault, setselectedOptiononeDefault] = useState([]);
    const [image, setimage] = useState("");
    console.log(options, "options");
    useEffect(() => {
        getnewtag();
        setTimeout(() => {
            defaulthandleTags();
        }, 1000);
    }, []);
    function EditClasses() {
        var data = new FormData();
        data.append('classId', editCLassData?._id)
        data.append('businessName', businessName === '' || null ? editCLassData?.businessName : businessName)
        data.append('aboutBusiness', aboutBusiness === '' || null ? editCLassData?.aboutBusiness : aboutBusiness)
        data.append('businessCategory', getCategoryId === '' || null ? editCLassData?.businessCategory?._id : getCategoryId)
        data.append('businesssubCategory', getSubCategoryId === '' || null ? editCLassData.businesssubCategory?._id : getSubCategoryId)
        data.append('webAddress', webAddress === '' || null ? editCLassData?.webAddress : webAddress)
        data.append('image', image === '' || null ? editCLassData?.image[0] : image)
        data.append('tags', selectedOptionone.toString() === '' || null ? editCLassData?.tags?.map((item) => { return item._id }).toString() : selectedOptionone.toString())

        var config = {
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/editclass`,
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                props.onEditDataFunction();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handlechange = (e) => {

        getSubcategory(e._id);
        setgetCategoryId(e._id);
    };

    const getSubcategory = (subcategoryID) => {
        var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/getsubcategorybyId?categoryId=${subcategoryID}`,
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then(function (response) {
                let subcategory = [];
                const categorydata = response.data.SubcategoryData;
                categorydata.map((subCat, index) => {
                    subcategory.push({
                        subId: subCat._id,
                        subcategoryName: subCat.subCategory,
                    });
                });
                setowDatasubcategory(subcategory);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleSubCateegory = (e) => {
        setgetSubCategoryId(e._id);
    };

    const handleClassUpdateName = (e) => {
        seteditBusinessNameId(e._id);
    };

    const handlechangetag = (event) => {
        console.log(event, "array");
        let array = [];

        event.forEach((value) => {
            array.push(value.value);
        });
        setselectedOptionone(array);

        console.log(array, "array");
    };

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
                let arrayTags = [];
                let defaultarrayTags = [];
                response.data.tagData.forEach((tag, index) => {
                    arrayTags.push({ value: tag._id, label: tag.tags });

                });
                setoptions(arrayTags);
                setdefaultoptions(arrayTags);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const defaulthandleTags = () => {
        console.log(defaultoptions, "options in update class");
        let array = [];
        props.data?.tags.forEach((tags) => {
            defaultoptions.forEach((items) => {
                if (items.value == tags) {
                    array.push({ value: items.value, label: items.label });
                }
            });
        });
        setselectedOptiononeDefault(array);

        console.log(array, selectedOptiononeDefault, "array");
    };

    return (
        <>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Edit Class
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body" style={{ minHeight: "470px" }}>
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <label className="form-label">Select Business</label>
                            <div className="position-relative">
                                {console.log(props.businessData, "props.businessData.name")}
                                <Select
                                   // placeholder={editCLassData.admin_id?.name}
                                    onChange={handleClassUpdateName}
                                    options={props.businessData}
                                    getOptionLabel={(e) => (
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginLeft: 5 }}>{e.name}</span>
                                        </div>
                                    )}
                                />
                                <div className="hint_box" style={{ display: "block" }}></div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> Business Name</label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editCLassData?.businessName}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setBusinessName(e.target.value);
                                    }}
                                />
                                <div className="hint_box" style={{ display: "block" }}></div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> Set Priority</label>
                            <div className="position-relative">
                                <input
                                    // defaultValue={editEventsData?.title}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setpriority(e.target.value);
                                    }}
                                />
                                <div className="hint_box" style={{ display: "block" }}></div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> Image</label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editCLassData?.image}
                                    type="File"
                                    className="form-control"
                                    onChange={(e) => {
                                        setimage(e.target.files[0]);
                                    }}
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>
                      
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> About Business</label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editCLassData?.aboutBusiness}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setAboutBusiness(e.target.value);
                                    }}
                                />
                                <div className="hint_box" style={{ display: "block" }}></div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="form-label">Select Category Group</label>
                            <div className="position-relative">
                                <Select
                                  //  placeholder={editCLassData.businessCategory?.category}
                                    onChange={handlechange}
                                    options={props.cateName}
                                    getOptionLabel={(e) => (
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginLeft: 5 }}>{e.category}</span>
                                        </div>
                                    )}
                                />
                                <div className="hint_box" style={{ display: "block" }}></div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="form-label">Business Category</label>
                            <div className="position-relative">
                                <Select
                                    // placeholder={
                                    //     editCLassData.businesssubCategory?.subCategory
                                    // }
                                    options={rowDatasubcategory}
                                    onChange={handleSubCateegory}
                                    getOptionLabel={(e) => (
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginLeft: 5 }}>{e.subcategoryName}</span>
                                        </div>
                                    )}
                                />
                                <div className="hint_box" style={{ display: "block" }}></div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Select Tags</label>

                            <Select
                                isMulti
                                // placeholder={editArticlesData?.tags?.map((item)=>{return item.tags}).toString()}
                                defaultValue={editCLassData?.tags?.map((item) => { return { value: item._id, label: item.tags } })}
                                key={editCLassData?.tags?.map((item) => { return item._id })}
                                options={options}
                                name="tags"
                                onChange={(e) => {
                                    e.persist = () => { }
                                    handlechangetag(e)
                                }}

                            />
                        </div>

                        <div className="col-md-12 mb-4">
                            <label className="form-label">WebAddress</label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editCLassData?.webAddress}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setWebAddress(e.target.value);
                                    }}
                                />
                                <div className="hint_box" style={{ display: "block" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn CancelBtn"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            EditClasses();
                        }}
                        type="button"
                        className="btn submitBtn" data-bs-dismiss="modal"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default UpdateClass;