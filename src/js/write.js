import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

document.querySelector("#productImage").addEventListener("change", onImageSelected);
document.querySelector('#add').addEventListener('click', onAddProduct)
document.querySelector('#exit').addEventListener('click', onExitPage)
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

    function onAddProduct(e) {
        e.preventDefault();
        uploadNewProduct();
    }

    function onExitPage(e){
        e.preventDefault();
        location.assign('index.html');
    }

    function onImageSelected(e) {
        let file = e.target.files[0];
        document.querySelector(".display img").src = URL.createObjectURL(file);
    }

    async function uploadNewProduct() {
        const title = document.querySelector('#productTitle').value.trim();
        const description = document.querySelector('#description').value.trim();
        const price = document.querySelector('#productPrice').value;
        const category = document.querySelector('#category').options[document.querySelector('#category').selectedIndex].text;
        const file = document.querySelector('#productImage').files[0]
        
        const imageRef =  storageRef( storage, `images/${file.name}`);
        const dataRef =  databaseRef( db, 'products')

        const uploadResult = await uploadBytes(imageRef, file);
        const urlPath =  await getDownloadURL(imageRef) 
        const storagePath = uploadResult.metadata.fullPath;

        const itemRef = await push(dataRef)

        set(itemRef,{
            key:itemRef.key,
            sku: (itemRef.key).substring((itemRef.key).length -5),
            urlPath,
            storagePath,
            title,
            description,
            category,
            price,
            file
        }).then(() => {
            document.querySelector('.message').style.color ="green";
            document.querySelector('.message').textContent = "Product is in the database!";
        }).catch((e) => {
            console.log(e);
        })
        
    }