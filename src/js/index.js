import {ref as dataRef, get, set, push, remove} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {productDisplay} from './templates/products'

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
    const productRef = dataRef(db, 'products/');
    const productSnapShot = await get(productRef)
    const data =  productSnapShot.val();

    if(data == null){
        document.querySelector('.products-list-title').textContent = 'No Available Products';
    }else {
        Object.values(data).map(product=>{
            const card = productDisplay(product)
            document.querySelector('.cards-container').append(card)
        })
    }


}

pageInit()

export{pageInit}