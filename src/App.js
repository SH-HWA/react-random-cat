import "./App.css";
import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";
import AWS from "aws-sdk";

function App() {
  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:e9b847f3-a29c-4e48-8662-74daca9726d0",
    }),
  });

  const [cat, setCat] = useState(
    "https://purr.objects-us-east-1.dream.io/i/1378514_717282693110_1598433115_n.jpg"
  );
  const [profile, setProfile] = useState(
    `https://gearlogimagestorage.s3.ap-northeast-2.amazonaws.com/%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AB+%E1%84%86%E1%85%A5%E1%84%82%E1%85%B5.png`
  );

  const handleClick = () => {
    axios.get("https://aws.random.cat/meow").then((res) => {
      setCat(res.data.file);
      // console.log(res)
    });
  };
  const handleFileInput = (e) => {
    // console.log(e.target.files[0].name);
    const file = e.target.files[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "gearlogimagestorage",
        Key: e.target.files[0].name,
        Body: file,
      },
    });

    const upPromise = upload.promise();

    upPromise.then(
      function (data) {
        // console.log(data.Location);
        setProfile(data.Location);
        alert("uploaded");
      },
      function (err) {
        return alert("error: ", err.message);
      }
    );
  };

  return (
    <div>
      <h2>고양이 사진 나와라!!!</h2>
      <div className="flex">
        <img className="catImg" src={cat} />
        <div></div>
        <button className="button" onClick={() => handleClick()}>
          사진변경
        </button>
      </div>
      <input className="button2" type="file" onChange={handleFileInput} />
      <div>
        <img className="catImg" src={profile} />
      </div>
    </div>
  );
}

export default App;
