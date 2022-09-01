import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const UpdatesubcategoriesDetails = (props) => {
  console.log(props,"props")
  const updatedDataupdatedData = props.updatedData;
  const [subCategory, setSubcategory] = useState("");
  const [disImage, setDisImage] = useState("");
  const [image, setImage] = useState("");

  function subupdateData() {
    var data = new FormData();
    data.append("subCategoryId", props.updatedData?._id);
    data.append(
      "subCategory",
      subCategory === "" || null
        ? updatedDataupdatedData?.subCategory
        : subCategory
    );
    data.append(
      "image",
      image === "" || null ? updatedDataupdatedData?.image : image
    );
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/updateSubcategory`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //--------Function to handle and set ico Image--------//

  const IconImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      let display = URL.createObjectURL(file);
      setDisImage(display);
      setImage(event.target.files[0]);
    }
  };

  const renderImages = (image) => {
    return (
      <img
        style={{ width: "110px", height: "140px" }}
        src={image}
        key={image}
      />
    );
  };
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Edit Category
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
            <label className="form-label"> Category </label>
            <div className="position-relative">
              <input
                type="text"
                defaultValue={props.updatedData?.subCategory}
                className="form-control"
                onChange={(e) => setSubcategory(e.target.value)}
              />
              <div className="hint_box" style={{ display: "block" }}></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label">Category Icon</label>
            <ul className="imagesUpload">
              <li style={{ width: "100%", height: "148px" }}>
                <input type="file" onChange={IconImage} />
                {!disImage ? (
                  <img
                    style={{ width: "100%", height: "148px" }}
                    src={props.updatedData?.image}
                  />
                ) : (
                  renderImages(disImage)
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger "
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={subupdateData}
          className="btn submitBtn"
          data-bs-dismiss="modal"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default UpdatesubcategoriesDetails;
