import React, { useState, useEffect } from "react";
import Card from "../../Components/Card";

import "./styles.scss";
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../actions/categoryActions";
import Select from "react-select";
import { uploadImage, priceArray,imagesPrepared, pricePrepared } from "../../utils/helperFunc";
import { createPoductActions, updatePoductActions } from "../../actions/productAction";
import { BeatLoader } from "react-spinners";
import izitoast from "izitoast";
export default props => {
  const { method, object={categoryId:[]} } = props;
  const [uploadSuccess,setSuccess] = useState(false)
  const [updateError,setUpdateError] = useState(false)

  const dispatch = useDispatch();
  const {
    category: { categories },
    products: { success, error, productObj, fetching,updated }
  } = useSelector(state => state);

  let [pricingCount, setPricingCount] = useState(1);

  let [listOfPrices] = useState(method==="edit"?priceArray(object.price):[])

  let [pricingList, setPricingList] = useState([]);

  let [range, setRange] = useState({
    from: 0,
    to: 0
  });
  const generateSku = () => "sku" + Date.now();

  let [product, createProduct] = useState({
    name: "",
    description: "",
    quantity: 0,
    categories: object?[...categories.filter(cat => {
      
      return object.categoryId.includes(cat.value)
    })]:[],
    sku: generateSku()
  });

  const handleChange = ({ target }) => {
    createProduct({ ...product, [target.name]: target.value });
  };
 
  let [images, createImages] = useState({});

  // let listOfArray=[]

  useEffect(() => {
    
    dispatch(fetchCategories());
    if (method === "edit") {
      let array = []
      object.categoryId.map((element,index)=>{
        const cate=categories.filter((category,index)=>{
          if(category.value===element){
            array.push(categories[index])
            //setListOfArray(()=> [ ...listOfArray,categories[index]])
            return index
            
          }
          
        })
        return cate
      })
      createProduct({
        ...product,
        name: object.name,
        description: object.description,
        quantity: object.quantity,
        categories: [...array],
        price:object.price,
        sku: object.sku
      });
      setPricingCount(Object.keys(object.price).length)
      const editImages = imagesPrepared(object.images)      
      createImages({...images, ...editImages})
    }
  }, [success]);

  const handlePricingChange = ({ target }) => {
    
    
    let name = target.name;
    let index = name[name.length - 1];

    let key = range[`from${index}`] + "-" + range[`to${index}`];
    if (name.slice(0, name.length - 1) === "from") {
      setRange({ ...range, [name]: target.value });
    }
    if (name.slice(0, name.length - 1) === "to") {
      setRange({ ...range, [name]: target.value });
    }
    if (name.slice(0, name.length - 1) === "price") {
      
      
      setPricingList({ ...pricingList, [key]: target.value });
    }
  };

  const handleFileUpload = ({ target }) => {
    createImages({ ...images, [target.name]: target.files[0] });
  };

  const handleSelectChange = value => {
    if (value) {
      
      createProduct({ ...product, categories: [...value] });
      return;
    }
    createProduct({ ...product, categories: [] });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    
    
    let imagesArray = []
    let editPricing ={}
    if (method==="edit"){
      const refinedList =Object.values(images).filter(element=>!object.images.includes(element))
      imagesArray = await uploadImage(Object.values(refinedList));
      editPricing = pricePrepared(listOfPrices)
      setSuccess(updated)
      setUpdateError(error)
    }
    else {
      imagesArray = await uploadImage(Object.values(images));
      setSuccess(success)
      setUpdateError(error)
    }

    let categoryId = product.categories.map(category => category.value);
    const data = {
      name: product.name,
      description: product.description,
      quantity: parseInt(product.quantity),
      sku: product.sku,
      price: Object.keys(editPricing).length>0?{...editPricing}:{ ...pricingList },
      images: imagesArray.length>0?[...imagesArray][0]:[Object.values(images)],
      categoryId,
    };   
    // 
    if (method!=="edit"){
      dispatch(createPoductActions(data));
    }
    else{
      dispatch(updatePoductActions(object._id,data))
    }
    
    
  };
const handleEditPricingChange = ({target})=>{
  let name = target.name
  let index = name[name.length - 1];
  let key =name.slice(0, name.length - 1)
  if (name.slice(0, name.length - 1) === "from") {
    setRange({ ...range, [name]: target.value });
  }
  if (name.slice(0, name.length - 1) === "to") {
    setRange({ ...range, [name]: target.value });
  }
  if (name.slice(0, name.length - 1) === "price") {
    setRange({ ...range, [name]: target.value });
  }
  listOfPrices[index][key] = target.value
  
  
}
  const priceEditGenerator=()=>{
    return listOfPrices.map((list,index)=>(
      <div className="d-flex">
        <div className="form-group">
            <label htmlFor={`from${index}`}>From</label>
            <Input
              type="number"
              name={`from${index}`}
              onChange={handleEditPricingChange}
              value={listOfPrices[index].from}
            />
          </div>
        <div className="form-group">
            <label htmlFor={`to${index}`}>To</label>
            <Input
              type="number"
              name={`to${index}`}
              onChange={handleEditPricingChange}
              value={listOfPrices[index].to}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`price${index}`}>Price</label>
            <Input
              type="number"
              name={`price${index}`}
              onChange={handleEditPricingChange}
              value={listOfPrices[index].price}
            />
          </div>
      </div>

    ))
  }


  const priceInputGenerator = () => {
    let lists = [];
    for (let index = 0; index < pricingCount; index++) {
      
      lists.push(
        <div key={index} className="d-flex">
          <div className="form-group">
            <label htmlFor={`from${index + 1}`}>From</label>
            <Input
              type="number"
              name={`from${index + 1}`}
              onChange={handlePricingChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`to${index + 1}`}>To</label>
            <Input
              type="number"
              name={`to${index + 1}`}
              placeholder="0"
              onChange={handlePricingChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`price${index + 1}`}>Price</label>
            <Input
              type="number"
              name={`price${index + 1}`}
              placeholder="0"
              onChange={handlePricingChange}
            />
          </div>
        </div>
      );
    }

    return lists;
  };

  const addPriceFunc = e => {
    e.preventDefault();
    setPricingCount(previousValue => (previousValue += 1));
  };
  
  
  return (
    <div className="add-product-section">
      <div className="container">
        <h2>Add products</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col _big">
              <Card>
                <div className="form-group">
                  <h3>Product Name</h3>
                  <Input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Product Name"
                    value={product.name}
                  />
                </div>
                <div className="form-group">
                  <h3>Description</h3>
                  <TextArea
                    name="description"
                    onChange={handleChange}
                    placeholder="Describe your product"
                    value={product.description}
                  />
                </div>
              </Card>
              <Card>
                <div className="form-group">
                  <h3>Images</h3>
                  <div className="d-flex between">
                  {object.images!==undefined?<span className="flex-1"><img className="img-fluid" src={object.images[0]} alt="product1"/></span>:null}
                   <Input
                    type="file"
                    name="firstImage"
                    onChange={handleFileUpload}
                    className="flex-4"
                  /> 
                  
                  
                  </div>
                  <div className="d-flex between">
                  {object.images!==undefined?<span className="flex-1" ><img className="img-fluid" src={object.images[1]}alt="product2"/></span>:null}
                   <Input
                    type="file"
                    name="secondImage"
                    onChange={handleFileUpload}
                    className="flex-4"
                  /> 
                  
                  
                  </div>
                  <div className="d-flex between">
                  {object.images!==undefined?<span className="flex-1" ><img className="img-fluid" src={object.images[2]}alt="product3"/></span>:null}
                   <Input
                    type="file"
                    name="thirdImage"
                    onChange={handleFileUpload}
                    className="flex-4"
                  /> 
                  
                  
                  </div>
                  <div className="d-flex between">
                  {object.images!==undefined?<span className="flex-1"><img className="img-fluid" src={object.images[3]}alt="product4"/></span>:null}
                   <Input
                    type="file"
                    name="fourthImage"
                    onChange={handleFileUpload}
                    className="flex-4"
                  /> 

                  </div>
                  <div className="d-flex between">
                  {object.images!==undefined?<span className="flex-1"><img className="img-fluid" src={object.images[4]} alt="product5"/></span>:null}
                   <Input
                    type="file"
                    name="fifthImage"
                    onChange={handleFileUpload}
                    className="flex-4"
                  /> 
                  </div>
                </div>
              </Card>
              <Card>
                <h3>Pricing</h3>
                <div className="form-group">{method==="edit"?priceEditGenerator():priceInputGenerator()}</div>
                {pricingCount<2?<button className="btn add" onClick={addPriceFunc}>
                  Add Price
                </button>:null}
              </Card>
              <Card>
                <h3>Inventory</h3>
                <div className="form-group">
                  <label>Stock</label>
                  <Input
                    type="number"
                    name="quantity"
                    onChange={handleChange}
                    placeholder="0"
                    value={product.quantity}
                  />
                </div>
              </Card>
            </div>
            <div className="col _small">
              <Card>
                <h4>Categories</h4>
                <div className="form-group">
                  <label>select category</label>
                  {/* <Input type="text" placeholder="Enter Category" />
                   */}

                  <Select
                    options={categories}
                    onChange={handleSelectChange}
                    name="category"
                    isMulti={true}
                    defaultValue={[...product.categories]}
                  />
                </div>
              </Card>
            </div>
          </div>
          <div className="row">
            <Button
              className="btn redSolidBtn"
              value={
                (fetching && <BeatLoader color="#fff" size={5} />) || "Save"
              }
            />
          </div>
        </form>
        {uploadSuccess
          ? izitoast.show({
              messageColor: "white",
              title: method==="edit"?"Product Updated":"Product Added",
              backgroundColor: "#00FF00",
              titleColor: "white",
              timeout: 5000,
              message: method==="edit"?`Product ${productObj.name} successfully Updated`:`Product ${productObj.name} successfully Added`,
              onClosed:()=>setSuccess(false)
            })
          : updateError
          ? izitoast.show({
              messageColor: "white",
              title: "product Save",
              backgroundColor: "red",
              titleColor: "white",
              timeout: 5000,
              message: error,
              onClosed:()=>setUpdateError(false)
            })
          : null}
      </div>
    </div>
  );
};
