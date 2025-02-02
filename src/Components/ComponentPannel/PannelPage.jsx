import React, { useState } from "react";
import SidePannel from "./SidePannel";
import Pannelproducts from "./Pannelproducts";
import "./PannelComp.css";
import HeaderTop from "../Header/HeaderTop";
import HeaderMiddle from "../Header/HeaderMiddle";
import HeaderBottom from "../Header/HeaderBottom";
import Footer from "../Common/Footer";
import { useParams } from "react-router-dom";

function PannelPage() {
  const {category} = useParams()
  const [data, setdata] = useState("Mushroom");
  useState(()=>{
    setdata(category)
  },[])
  return (

    
    <div className="_app_ d-sm-none">
       <header className="pb-md-4 pb-0">
              <HeaderTop />
              <HeaderMiddle />
              <HeaderBottom />
            </header>

      <div className="_wrapper_">
        <SidePannel setdata={setdata} />
        <Pannelproducts data={data} />
      </div>
    <Footer/>
    </div>
  );
}

export default PannelPage;
