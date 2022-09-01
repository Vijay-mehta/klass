import React, { useState } from "react";
import axios from "axios";

const UpdateBusiness = (props) => {
    let editBusinessData = props.updatedData;
    // console.log(editBusinessData, "editBusinessData")
    const [uniqueId, setuniqueId] = useState("");
    const [name, setName] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address1, setaddress1] = useState("");
    const [address2, setaddress2] = useState("");
    const [country, setcountry] = useState("");
    const [postalCode, setpostalCode] = useState("");
    const [businessName, setBusinessName] = useState("");

    const resetForm = () => {
        setuniqueId('');
        setName('');
        setBusinessEmail('');
        setBusinessName('');
        setMobileNo('');
        setaddress1('');
        setaddress2('');
        setcountry('');
        setpostalCode('');
        // setpassword('');
    }

    // ---- Edit business Details API ---//
    function EditBusiness() {
        var data = JSON.stringify({
            'userId': props.updatedData?.admin_id?._id,
            'uniqueId': uniqueId === "" ? editBusinessData?.uniqueId : uniqueId,
            'name': name === "" ? editBusinessData?.admin_id?.name : name,
            'email': businessEmail === "" ? editBusinessData?.admin_id?.email : businessEmail,
            'mobileNo': mobileNo === "" ? editBusinessData?.admin_id?.mobileNo : mobileNo,
            'address1': address1 === "" ? editBusinessData?.address1 : address1,
            'address2': address2 === "" ? editBusinessData?.address2 : address2,
            'country': country === "" ? editBusinessData?.country : country,
            'postalCode': postalCode === "" || null ? editBusinessData?.postalCode : postalCode,
            'businessName': businessName === "" || null ? editBusinessData?.businessName : businessName,
        });

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASEURL}/editbusiness`,
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data, "EditBusiness")
                props.onEditDataFunction();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // ---- get Postal Code API ---//
    function getAddressPostcode() {
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
                // console.log(response.data, "response in postal code api")
                setaddress1(response.data.addressfrompostcode.address[0].ADDRESS);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Edit Business
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={resetForm}
                    ></button>
                </div>
                <div className="modal-body" style={{ minHeight: "470px" }}>
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> Unique Id</label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editBusinessData?.uniqueId}
                                    key={editBusinessData?.uniqueId}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setuniqueId(e.target.value);
                                    }}
                                    disabled
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="form-label"> Class/ Business/ Institute Name</label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editBusinessData?.businessName}
                                    key={editBusinessData?.businessName}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setBusinessName(e.target.value);
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
                            <label className="form-label"> Contact Person Name</label>
                            <div className="position-relative">
                                <input

                                    defaultValue={editBusinessData?.admin_id?.name}
                                    key={editBusinessData?.admin_id?.name}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setName(e.target.value);
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
                            <label className="form-label"> Business Email</label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editBusinessData?.admin_id?.email}
                                    key={editBusinessData?.admin_id?.email}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setBusinessEmail(e.target.value);
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
                            <label className="form-label"> Mobile No</label>
                            <div className="position-relative">
                                <input
                                    defaultValue={editBusinessData?.admin_id?.mobileNo}
                                    key={editBusinessData?.admin_id?.mobileNo}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setMobileNo(e.target.value);
                                    }}
                                />
                                <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                >
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn CancelBtn" data-bs-dismiss="modal"
                            >Cancel</button>
                            <button
                                onClick={() => { EditBusiness() }}
                                type="button"
                                className="btn submitBtn" data-bs-dismiss="modal"
                            >
                                Submit
                            </button>
                        </div>

                        <div className="col-md-12 mb-4">
                            <div className="position-relative">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default React.memo(UpdateBusiness);