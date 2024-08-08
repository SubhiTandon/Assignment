import React, { useState, useEffect } from "react";
import "./Home.css";
import { connect, useDispatch } from "react-redux";
import { getuserDetails } from "../../store/Featureslices/UserDetails/userdetailsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomerCard from "../../commoncomponents/cards";
import  Snackbar  from "../../commoncomponents/Snackbar";


const Home = () => {
  const [userslist, setuserslist] = useState([]);
  const [snackbar , setsnackbar] = useState({
    open : false, message : "" , type : ""
  })
  
  const handleSnackbarClose = () => {
    setsnackbar({ ...snackbar, open : false})
  }

  const dispatch = useDispatch();

  const Userdata = async () => {
    const data = {
      token: "",
    };
    const resp = await dispatch(getuserDetails(data));
    debugger
    if(resp.payload.status === 404){
      setsnackbar({open : true , message: "Please try after sometime" , type:"error"})
    }
    else {
    const rawData = await unwrapResult(resp);
    setuserslist(rawData);
    }
  };

  useEffect(() => {
    Userdata();
  }, []);



  return (
    <div className="py-12 ">
      {!snackbar.open ? 
        <CustomerCard
          userslist={userslist}
        />
        :
        <Snackbar 
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={handleSnackbarClose}
        /> 
      }
    </div>
  );
};

export default Home;
