import {ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get, remove, update, getDatabase} from 'firebase/database'
import {db,storage} from './libs/firebase/firebaseConfig';
import {productDisplayForm} from './templates/productEdit'



document.querySelector('.update_product').addEventListener('submit', onUpdateProduct)
document.querySelector('.sidenav').addEventListener('mouseout', onHoverSideNav)
document.querySelector('.sidenav').addEventListener('mouseover', onHoverSideNav)

var toggleVar = "closed"
const listTitle =document.querySelectorAll(".list-title")

function onHoverSideNav() {
    if (toggleVar == "closed"){
        document.querySelector(".sidenav").style.width = "12rem";
        for (let i = 0; i < listTitle.length; i++) {
            listTitle[i].style.visibility = "visible";
        }
        document.querySelector("main").style.marginLeft = "12rem";
        document.querySelector(".navbar").style.marginLeft = "12rem";
        toggleVar ="open"
    }
    else {
        document.querySelector(".sidenav").style.width = "4rem";
        document.querySelector("main").style.marginLeft = "0";
        for (let i = 0; i < listTitle.length; i++) {
            listTitle[i].style.visibility = "hidden";
        }
        document.querySelector(".navbar").style.marginLeft = "0";
        toggleVar ="closed"
    }
}

async function pageInit(){
    const key = sessionStorage.getItem('key')
    console.log("Update Page")
    
    if(key == null){
        document.querySelector('.error').textContent = 'No product available to edit, please select a product from the dashboard.';
    }else{
        const dataRef =  databaseRef( db, `products/${key}`)
        const rentalSnapShot = await get(dataRef)
        const data =  rentalSnapShot.val();
    
        const card = productDisplayForm(data)
        document.querySelector('.card').append(card)
    }


}

async function onUpdateProduct(e) {
        e.preventDefault()

        const key = sessionStorage.getItem('key')
        const dataRef =  databaseRef( db, `products/${key}`)

        const updatedTitle = document.querySelector('#productTitle').value.trim();
        const updatedDescription = document.querySelector('#description').value.trim();
        const updatedPrice = document.querySelector('#productPrice').value;
        const updatedCategory = document.querySelector('#category').options[document.querySelector('#category').selectedIndex].text;
        const file = document.querySelector('#productImage').files[0]

        console.log(updatedCategory)
        if( file != null){
            const imageRef =  storageRef( storage, `images/${file.name}`);
            const uploadResult = await uploadBytes(imageRef, file);
            const urlPath =  await getDownloadURL(imageRef);
            const storagePath = uploadResult.metadata.fullPath;

            update(dataRef, {
                title: updatedTitle,
                storagePath: storagePath,
                description: updatedDescription,
                category: updatedCategory,
                price: updatedPrice,
                urlPath: urlPath
            })
        }else{
            update(dataRef, {
                title: updatedTitle,
                description: updatedDescription,
                category: updatedCategory,
                price: updatedPrice,
            }).then(() => {
                document.querySelector('.message').style.color ="green";
                document.querySelector('.message').textContent = "Product Updated!";
            }).catch((e) => {
                console.log(e);
            })
        }
}


pageInit();

