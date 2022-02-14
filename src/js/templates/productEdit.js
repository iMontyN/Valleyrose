
import {ref as databaseRef, push, set, get, remove} from 'firebase/database';
import { db, storage  } from "../libs/firebase/firebaseConfig";
import {onUpdateProduct} from "../update"



function productDisplayForm ({key, title, sku, category, price, description, urlPath}){
    const template =`
    <form id="productForm" class="add-new-product">
        <div class="product-image form-control">
          <div class="display">
            <img src="${urlPath}" alt="${title}">
          </div>
          <div class="upload-img">
            <div>
              <label for="productImage">Upload Image </label>
              <input type="file" id="productImage" style="display:none;"  class="select-file"   accept=".jpg, .png, .jpeg, .webp">
            </div>
            <div class="message"> 
              <p>Product Not Updated</p>
            </div>
          </div>   

        </div>
        <div class="form-group">
          <div class="product-name form-control">
            <label for="productTitle">Product Title</label>         
            <input id="productTitle" value ="${title}" type="text">
          </div>
          <div class="form-control">
            <div class="form-inline">
              <div>
                <label for="product-category">Category</label>
                <select id="category" name="category">
                  <option value="${category}">${category}</option>
                  <option value="bridal">Bridal Bouquet</option>
                  <option value="fresh-flower">Fresh Flower</option>
                  <option value="long-life">Long Life Flowers</option>
                  <option value="ballloons">Ballloons</option>
                </select> 
              </div>
              <div>
                <label for="productPrice">Price</label>         
                <input id="productPrice" type="text" value="${price}">
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" id="description">${description}</textarea>
            </div>
          </div>
        </div>
        <div class="btns form-control">
          <button id="update" type="submit">Update Product</button>
          <button id="exit" type="submit">Exit</button>
        </div>
      </form>
      `
    const element = document.createRange().createContextualFragment(template).children[0]
    addProductControls(element)
    return element
}

function addProductControls(product){
  product.querySelector('#exit').addEventListener('click', onExitPage)
}


function onExitPage(){
  location.assign('index.html');
}


export{productDisplayForm}