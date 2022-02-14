
import {ref as databaseRef, push, set, get, remove} from 'firebase/database';
import { db, storage  } from "../libs/firebase/firebaseConfig";
import {pageInit} from "../index"

function productDisplay ({key, title, sku, category, price, description, urlPath}){
    const template = `
            <div class="control-container">
                <div class="card">
                    <div class="card-header">
                        <img src="${urlPath}" alt="${title}" />
                    </div>
                    <div class="card-body">
                        <h3 class="title">${title} <span class="category">${category}</span></h3>
                        <p class="card-price">$${price/100}</p>
                        <p class="card-description">${description}</p>
                        <p class="card-sku"><span>SKU#</span>${sku} </p>
                        <div class="card-btns">
                            <button>Add to Cart</button>
                            <button>Wishlist</button>
                        </div>
                    </div>
                </div>
                <div class="cntrl-btns">
                    <button id="edit" class="edit" data-key="${key}">Edit</button>
                    <button id="delete" class="delete" data-key="${key}"> Delete
                    </button>
                </div>
            </div>
    `
    const element = document.createRange().createContextualFragment(template).children[0]
    addProductControls(element)
    return element
}

export{productDisplay}

function clearMenu()
{
    let element = document.querySelector(".cards-container");
    if(element == null)
        element.textContent ='Please Add More Products!';
    else
        element.textContent ='';

}


function addProductControls(product){
    product.querySelector('#edit').addEventListener('click', onEditProduct)
    product.querySelector('#delete').addEventListener('click', onRemoveProduct)
}



function onEditProduct(e){
    const key = e.target.dataset.key
    console.log('edit');
    sessionStorage.setItem('key',key)
    location.assign('update.html');
}

function onRemoveProduct(e){
    const key = e.target.dataset.key
    console.log('delete');
    const dataRef =  databaseRef( db, `products/${key}`)
    let answer = confirm('Are you sure you want to permanently remove this product ?')
    if(answer == true){
        remove(dataRef)
        clearMenu()
        pageInit()
    }
}
