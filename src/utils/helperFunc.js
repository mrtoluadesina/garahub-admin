import axios from "axios"
export const retrieveMessage = err => {
  if (err.response && err.response.data) {
    return err.response.data.message || err.response.data.error;
  } else if (err.message) {
    return err.message;
  } else {
    return err;
  }
};
export const getActualPrice = (qty, productPrice) => {
  let amount = 0;
  let lastKey = '';
  for (let key in productPrice) {
    lastKey = key;
    let nums = key.split('-');
    if (parseInt(nums[0]) <= qty && qty <= parseInt(nums[1])) {
      // @ts-ignore
      amount += parseInt(productPrice[key]);
      break;
    }
  }
  if (amount === 0) {
    let highestOrder = parseInt(lastKey.split('-')[1]);
    // @ts-ignore
    let firstTotal = Math.floor(qty / highestOrder) * parseInt(productPrice[lastKey]);
    amount = firstTotal + getActualPrice(qty % highestOrder, productPrice);
  }
  return amount;
}

export const uploadImage= async images =>{
  let imageArray=[]
  const uploaders = images.map(file => {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", `codeinfuse, medium, gist`);
    formData.append("upload_preset", "irb6cac6"); // Replace the preset name with your own
    formData.append("api_key", "651518656572252"); // Replace API key with your own Cloudinary key
    formData.append("timestamp", (Date.now() / 1000) | 0);
    
    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios.post("https://api.cloudinary.com/v1_1/dczmdkhbw/image/upload", formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    }).then(response => {
      const data = response.data;
      const fileURL = data.secure_url // You should store this URL for future references in your app
      imageArray.push(fileURL)
      
    
    }).then(data=>{
      return imageArray
    }).catch(err=>err)
    
    
  });
  // Once all the files are uploaded 
  return axios.all(uploaders).then(data=> {
    // ... perform after upload is successful operation
    return data
  });
  
}
export const priceArray = prices =>{
	return Object.keys(prices).map(price=>{
  	let individual = price.split("-")
    return {from:individual[0],to:individual[1],price:prices[price]}
  })

}

export const imagesPrepared = arr =>{
  const keys = ["firstImage","secondImage","thirdImage","fourthImage","fifthImage"]
  let objects = {}
  arr.forEach((element,index)=>{
      objects={...objects,[keys[index]]:element}
  })

  return objects;
}
export const pricePrepared = obj=>{
  let objs = {}
 obj.map(element=>{
     objs = {...objs,[`${element.from}-${element.to}`]:element.price}
     return{[`${element.from}-${element.to}`]:element.price}
 
 })   
 return objs
 }
export const formattedDate = (ISOString) => {
  let newDate = new Date(ISOString);
  return newDate.toDateString();
};

export function checkValidSlug(slug) {
   return /^[a-z0-9-]+$/gi.test(slug);
}

