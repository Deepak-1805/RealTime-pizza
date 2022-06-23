import axios from 'axios'
import Noty from 'noty'
let addtocart=document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')

function updatetocart(pizza){
    axios.post('/update-cart',pizza).then(res=>{
        console.log(res)
        cartCounter.innerText=res.data.totalQty
        new Noty(
            {
                type:'success',
                timeout:1000,
                text:'Item added to cart',
                progressBar: false,
            }
        ).show();
    }).catch(err =>{
        new Noty(
            {
                type:'error',
                timeout:1000,
                text:'Something went wrong',
                progressBar: false,
            }
        ).show();
    })
}
addtocart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza)
        updatetocart(pizza)
        console.log(pizza)
    })
})