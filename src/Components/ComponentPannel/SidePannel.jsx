import React,{useState,useEffect} from 'react'
import axios from 'axios';
import "./Sidepage.css"
import { useNavigate } from 'react-router-dom';
function SidePannel({setdata}) {
    const [categories, setcategories] = useState([]);
    const [active, setactive] = useState(null);
  const navigate=useNavigate()
    

    const getdata = async () => {
      const response = await axios.get(
        "https://www.api.vegenmart.com/api/getAllCategories"
      );
  
      setcategories(response.data);
    };
    useEffect(() => {
      getdata();
    }, []);
  
    const handleClick = (index) => {
      setactive(index);
    };
    return (
      <div className="sidebar_container">
        {categories.map((element, index) => {
          return (
            <div
              className="sidebar_element border-bottom mb-2"
              key={index}
              onClick={() => {
                handleClick(index);
                // setdata(element.category_name);
                navigate(`/pannelpage/${element.category_name}`)
                console.log(element.category_name);
                
              }}
              style={
                active === index
                  ? {
                      border: "1px solid pink",
                      backgroundColor:"#FEF0F6"
                    }
                  : { background: "white" }
              }
            >
              <img
                src={element.category_url}
                alt=""
                style={{ width: "40px", borderRadius: "20px" }}
              />
              <p className="name_text">{element.category_name}</p>
            </div>
          );
        })}
      </div>
    );
}

export default SidePannel