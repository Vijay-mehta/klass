//This Component is used to Render Images on the screen and can be used while uploading images

import React, {useState, useEffect, useMemo} from "react";
import ImageUploader from "react-images-upload";

function RenderImages(props){
    
   let onDrop = (pictureFiles, pictureDataURLs) => {

     const newImagesUploaded = pictureDataURLs.slice(
       props.defaultImages?.length
       );
       console.log(newImagesUploaded.length,"lengthimages");
     props.handleChange(pictureFiles,newImagesUploaded,pictureDataURLs);
        console.log(props,"defaultImages");
        console.warn("pictureDataURLs =>", newImagesUploaded);
      };

      function removeDefault(){}

    return(
    <>
    <ImageUploader
        withIcon={false}
        withLabel={false}
        withPreview={true}
        buttonText={"Add photos"}
        fileSizeError={"File size is too big!"}
        fileTypeError={"This extension is not supported!"}
        onChange={onDrop}
        imgExtension={props.imgExtension}
        maxFileSize={props.maxFileSize}
        defaultImages={props.defaultImages}
      />
    
    </>
    )
}

export default RenderImages;