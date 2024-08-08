import links from "./links";
import ObjectHelper from "./objectHelpers";


const getLocation = (location) => {
  return links?.baseApi + location;
};


async function status(response) {

  if (response.status >= 200 && response.status < 300) {
    // alert('Working fine ')
    return response.json()
  }
  if (response.status >= 401 && response.status <= 403) {
    alert(`Token expired please login again\nError code`)
    // setToken(null)
    // resetScreen(Screens?.Login)
  }
  if (response.status === 400 || (response.status >= 404 && response.status < 500)) {
    //alert(`Something went wrong, please try again later\nError code : ${response?.status} `)
    return response
  }
  if (response.status >= 500) {
    alert(`Server error, we are working on it please wait for sometime\nError code : ${response?.status} `)
  }
}

export const doPost = async (thunk, location, query, body, token = false, formData = false) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  let config = {}
  if(formData){
     config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }else{
     config = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: body,
    };
  }
 

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  

  const response = await fetch(url, config);


  status(response)
  console.log(response, url, body,".............")
  return await response.json()
};

export const doPut = async (thunk, location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

 

  const response = await fetch(url, config);

  console.log(url, response,body, "..................")
  
  return await status(response)
};


export const doDel = async (thunk, location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
 
  const response = await fetch(url, config);

  console.log(response, url, body,".............")
  
  return await status(response)
};

export const doGet = async (thunk, location, query, token = false) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, config);

  
 // console.log(response, url,token, ".............")
  return await status(response)
};

export const doPatch = async (thunk,location , query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);

  const requestOptions  = {
    method: "PATCH",
    body: JSON.stringify(body),
    redirect: "follow",
    headers : {
      "Content-Type" : "application/json"
    }
  };

  if(token){
    if (token) {
      requestOptions.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, requestOptions)
  return await response.json();
}
