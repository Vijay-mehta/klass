import React, { useState, useEffect, useHistory } from "react";
import axios from "axios";
import Select from "react-select";

const UpdateSections = (props) => {
    // console.log(props.updatedData, "hello")
    let editSectionData = props.updatedData;

    const [groupingFilter, setGroupingFilter] = useState([]);
    const [groupingOptions, setGroupingOptions] = useState([]);
    const [objectTypeValue, setObjectTypeValue] = useState([]);
    const [logic, setLogic] = useState("");
    const [description, setDescription] = useState("");
    const [trendingSend, setTrendingSend] = useState("");
    const [statusSend, setStatusSend] = useState("");
    const [objectName, setObjectName] = useState("");
    const [groupingSend, setGroupingSend] = useState("");
    const [groupingFilterSend, setGroupingFilterSend] = useState("");
    // const history = useHistory();


    useEffect(() => {
        if (editSectionData?.group === "tags") {
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
                    let optionArray = [];
                    response.data?.tagData?.map((item) => {
                        optionArray.push({ value: item._id, label: item.tags });
                    })
                    setGroupingFilter(optionArray);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [])


    let logics = [{ value: "0", label: "Admin" }];
    //{ value: "0", label: "Trending" }, { value: "1", label: "Customer Search" },
    //{ value: "4", label: "Liked" }, { value: "5", label: "Related Classes" }
    //, { value: "3", label: "Location" },

    let objectTypes = [{ value: "0", label: "Classes" }, { value: "1", label: "Group" },
    { value: "2", label: "Event" }, { value: "3", label: "Articles" },
    ];

    let grouping = [{ value: "0", label: "Category Group" }, { value: "1", label: "Category" },
    { value: "2", label: "Tag-Group" }, { value: "3", label: "tags" },
    { value: "4", label: "Group" },];

    let trending = [{ value: "0", label: "true" }, { value: "1", label: "false" }]
    let status = [{ value: "0", label: "true" }, { value: "1", label: "false" }]

    //--------------Default Value States------------//
    let defaultLogics = [];
    logics.map(item => {
        if (item.label === editSectionData?.logictype) {
            defaultLogics.push({ value: item.value, label: item.label })
        }
    })

    let defaultObjectTypes = [];
    objectTypes.map(item => {
        if (item.label === editSectionData?.Objectname) {
            defaultObjectTypes.push({ value: item.value, label: item.label })
        }
    })

    let defaultGrouping = [{ value: "0", label: "Category Group" }, { value: "1", label: "Category" },
    { value: "2", label: "Tag-Group" }, { value: "3", label: "Tags" },
    { value: "4", label: "Group" }, { value: "5", label: "Product-Category" },
    { value: "6", label: "Product-Category Group" },];

    let defaultTrending = [];
    trending.map(item => {
        // console.log(item.label,"defaultTrending")
        if (item.label === editSectionData?.trending?.toString()) {
            defaultTrending.push({ value: item.value, label: item.label })
        }
    })

    let defaultStatus = [];
    status.map(item => {
        // console.log(item.label,"defaultTrending")
        if (item.label === editSectionData?.status?.toString()) {
            defaultStatus.push({ value: item.value, label: item.label })
        }
    })


    // ---- Edit business Details API ---//
    function editSections() {
        //console.log()

        var data = JSON.stringify({
            "sectionId": editSectionData._id,
            "pageName": editSectionData.page,
            "logictype": logic ? logic : editSectionData.logictype,
            "description": description ? description : editSectionData.description,
            "trending": trendingSend ? trendingSend : editSectionData.trending,
            "Objectname": objectName ? objectName : editSectionData.Objectname,
            "group": groupingSend ? groupingSend : editSectionData?.group,
            "filtertype": groupingFilterSend ? groupingFilterSend : editSectionData?.filtertype,
            "sorting": "",
            "status": statusSend ? statusSend : editSectionData.status,
            "rows": "",
            "pagination": ""
        });

        // console.log(data,"requestData");

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASEURL}/editsection`,
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                props.getSection();
            })
            .catch(function (error) {
                console.log(error);
            });



    }


    //----------------handle object type changes-----------//
    function handleObjectTypes(event) {
        if (event.label === "Classes") {
            grouping = [
                { value: "2", label: "tags" }];
            //{value:"0",label:"Category Group"}, {value:"4",label:"Group"}, { value: "0", label: "Category" },{ value: "1", label: "Tag-Group" },
            setObjectTypeValue(event.label)
            setGroupingOptions(grouping);
            setObjectName(event.label);
        }


        else if (event.label === "Event") {
            grouping = [{ value: "2", label: "tags" }];
            // { value: "0", label: "Group" }, { value: "1", label: "Tag-Group" },
            setObjectTypeValue(event)
            setGroupingOptions(grouping);
            setObjectName(event.label);
        }

        else if (event.label === "Group") {
            grouping = [{ value: "0", label: "Tag-Group" }, { value: "1", label: "tags" }];
            setObjectTypeValue(event)
            setGroupingOptions(grouping);
            setObjectName(event.label);
        }

        else if (event.label === "Articles") {
            grouping = [{ value: "0", label: "Group" }, { value: "1", label: "Tag-Group" }, { value: "2", label: "tags" }];
            setObjectTypeValue(event)
            setGroupingOptions(grouping);
            setObjectName(event.label);
        }
    }

    function handleLogicChange(event) {
        setLogic(event.label);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleTrendingChange(event) {
        setTrendingSend(event.label);
    }

    function handleStatusChange(event) {
        setStatusSend(event.label);
    }

    function handleGroupingFilterChange(event) {
        setGroupingFilterSend(event.value)
    }

    function handleGroupingChange(event) {
        let groupingFilterDefault;
        if (event.label === "Tags") {
            groupingFilterDefault = "tags"
        }
        else if (event.label === "Tag-Group") {
            groupingFilterDefault = "taggroups"
        }
        else if (event.label === "Product-Category") {
            groupingFilterDefault = "productcategory"
        }
        else if (event.label === "Category Group") {
            groupingFilterDefault = "category"
        }
        else if (event.label === "Category") {
            groupingFilterDefault = "subCategory"
        }
        else if (event.label === "Group") {
            groupingFilterDefault = "groups"
        }
        // else if(event.label === "Tag-Group"){}
        setGroupingSend(groupingFilterDefault);

        if (event.label === "Tags") {

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
                    let optionArray = [];
                    response.data?.tagData?.map((item) => {
                        optionArray.push({ value: item._id, label: item.tags });
                    })
                    setGroupingFilter(optionArray);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

        else if (event.label === "Category Group") {

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
                    let optionArray = [];
                    response.data?.CategoryData?.map(item => {
                        optionArray.push({ value: item._id, label: item.category })
                    })
                    setGroupingFilter(optionArray);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        else if (event.label === "Category") {
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
                    let optionArray = [];
                    response.data.SubcategoryData.map(item => {
                        optionArray.push({ value: item._id, label: item.subCategory })
                    })
                    setGroupingFilter(optionArray);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        else if (event.label === "Tag-Group") {
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
                    let optionArray = [];
                    response?.data?.taggroupData?.map(item => {
                        optionArray.push({ value: item._id, label: item.groupName })
                    })
                    setGroupingFilter(optionArray);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else if (event.label === "Group") {
            var config = {
                method: "get",
                url: `${process.env.REACT_APP_BASEURL}/getgroups`,
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            };

            axios(config)
                .then(function (response) {
                    // console.log(response,"responseGroup")
                    let optionArray = [];
                    response.data?.data?.map(item => {
                        optionArray.push({ value: item._id, label: item.groups })
                    })
                    setGroupingFilter(optionArray);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

        else if (event.label === "Product-Category") {
            let optionArray = [];
            setGroupingFilter(optionArray);
        }
        else if (event.label === "Product-Category Group") {
            let optionArray = [];
            setGroupingFilter(optionArray);
        }


    }



    return (
        <>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Edit Sections
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        // onClick={() => { window.location.reload(false) }}
                    ></button>
                </div>
                <div className="modal-body" >
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> Logics</label>
                            <div className="position-relative">
                                <Select
                                    defaultValue={defaultLogics}
                                    key={defaultLogics.map(item => item.value)}
                                    options={logics}
                                    onChange={handleLogicChange}
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> Description </label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editSectionData?.description}
                                    key={editSectionData?.description}
                                    type="text"
                                    className="form-control"
                                    onChange={handleDescriptionChange}
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> Object's Type </label>
                            <div className="position-relative">
                                <Select
                                    defaultValue={defaultObjectTypes}
                                    key={defaultObjectTypes.map(item => item.value)}
                                    options={objectTypes}
                                    onChange={handleObjectTypes}
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> Grouping </label>
                            <div className="position-relative">
                                <Select
                                    defaultValue={defaultGrouping.map(item => {
                                        if (editSectionData?.group === "tags" && item.label === "Tags") {

                                            return item;
                                        }
                                        else if (editSectionData?.group === "taggroups" && item.label === "Tag-Group") {

                                            return item;
                                        }
                                        else if (editSectionData?.group === "productcategory" && item.label === "Product-Category") {

                                            return item;
                                        }
                                        else if (editSectionData?.group === "category" && item.label === "Category Group") {

                                            return item;
                                        }
                                        else if (editSectionData?.group === "subCategory" && item.label === "Category") {


                                            return item;
                                        }
                                        else if (editSectionData?.group === "groups" && item.label === "Group") {
                                            return item;
                                        }
                                        // else if(editSectionData?.group === "tags" && item.label === "Product-Category Group"){
                                        //     return item;
                                        // }

                                    })}
                                    key={defaultGrouping.map(item => {
                                        if (editSectionData?.group === "tags" && item.label === "Tags") {
                                            return item.value
                                        }
                                        else if (editSectionData?.group === "taggroups" && item.label === "Tag-Group") {

                                            return item.value;
                                        }
                                        else if (editSectionData?.group === "productcategory" && item.label === "Product-Category") {

                                            return item.value;
                                        }
                                        else if (editSectionData?.group === "category" && item.label === "Category Group") {

                                            return item.value;
                                        }
                                        else if (editSectionData?.group === "subCategory" && item.label === "Category") {

                                            return item.value;
                                        }
                                        else if (editSectionData?.group === "groups" && item.label === "Group") {
                                            return item.value;
                                        }
                                        // else if(editSectionData?.group === "tags" && item.label === "Product-Category Group"){
                                        //     return item.value;
                                        // }
                                    })}
                                    options={defaultGrouping}
                                    onChange={handleGroupingChange}
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>


                        <div className="col-md-12 mb-4">
                            <label className="form-label">Grouping-Filter</label>
                            <div className="position-relative">
                                <Select
                                    defaultValue={groupingFilter.map(item => {
                                        if (item.value === editSectionData?.filtertype) {
                                            return item;
                                        }
                                    })}
                                    key={groupingFilter.map(item => {
                                        if (item.value === editSectionData?.filtertype) {
                                            return item.value;
                                        }
                                    })}
                                    options={groupingFilter}
                                    onChange={handleGroupingFilterChange}
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 mb-4">
                            <label className="form-label">Trending</label>
                            <div className="position-relative">
                                <Select
                                    defaultValue={defaultTrending}
                                    key={defaultTrending.map(item => item.value)}
                                    options={trending}
                                    onChange={handleTrendingChange}
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 mb-4">
                            <label className="form-label">Status</label>
                            <div className="position-relative">
                                <Select
                                    defaultValue={defaultStatus}
                                    key={defaultStatus.map(item => item.value)}
                                    options={status}
                                    onChange={handleStatusChange}
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 mb-4">
                            <label className="form-label">No. of Rows</label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editSectionData?.rows}
                                    key={editSectionData?.rows}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
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
                            <label className="form-label">Pagination</label>
                            <div className="position-relative">
                                <input
                                    value={editSectionData?.pagination}
                                    key={editSectionData?.pagination}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
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
                            <div className="position-relative">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn CancelBtn" data-bs-dismiss="modal"
                    >Cancel</button>
                    <button
                        onClick={() => { editSections() }}
                        type="button"
                        className="btn submitBtn" data-bs-dismiss="modal"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default UpdateSections;