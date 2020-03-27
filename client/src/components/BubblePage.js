import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../auth/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [update, setUpdate] = useState([]); 
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getBubbles = () => {
    axiosWithAuth()
      .get('/api/colors')
      .then(res => {
        console.log("Colors were just retrieved again! Response: ", res)
        setColorList(res.data);
      })
      .catch(err => {
        console.log("Color retrieval UNSUCCESSFUL! Response: ", err)
      })
  }

  useEffect(() => {
    getBubbles();
  }, [update])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setUpdate={setUpdate}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
