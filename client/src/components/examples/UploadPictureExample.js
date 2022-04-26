import React from 'react';

export default function  UploadPictureExample() {
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    let file = event.target.file.files[0]
    if (file) {
      const urlResponse = await fetch('/api/v1/s3/getUploadUrl')
      const urlJSON = await urlResponse.json()
      
      await fetch(urlJSON.upload_url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: file
      });
      const imageUrl = urlJSON.upload_url.split('?')[0]
      console.log(imageUrl)
      // TAKE THIS IMAGE URL AND STORE THIS AND THE REST VIA BACKEND ENDPOINT
      // FOR EXAMPLE IF THERE IS A PROFILE IMAGE WE STORE THE URL AND OTHER INFO
      // <img src=${imageUrl}></img>
    } else {
      console.log("No file attached.")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <input name="file" type="file" accept="image/*"/>
        <button type="submit">Upload</button>
  </form>
  );
}