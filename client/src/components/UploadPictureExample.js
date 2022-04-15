import React from 'react';

export default function  UploadPictureExample() {
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    let file = event.target.file.files[0]
    const { url } = await fetch("http://localhost:3001/api/v1/s3/getUploadUrl").then(res => res.json())
    console.log(url)

    var response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: file
    })
    var responseJson = await response.json()
    console.log(responseJson)

    const imageUrl = url.split('?')[0]
    console.log(imageUrl)
    // TAKE THIS IMAGE URL AND STORE THIS AND THE REST VIA BACKEND ENDPOINT
    // FOR EXAMPLE IF THERE IS A PROFILE IMAGE WE STORE THE URL AND OTHER INFO
  };

  return (
    <form onSubmit={handleSubmit}>
        <input name="file" type="file" accept="image/*"/>
        <button type="submit">Upload</button>
  </form>
  );
}