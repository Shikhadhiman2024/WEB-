//Browser------->Server (Fetch)--Combinely known as API
//Fetch is going to take some time
//it should not block other code
//fetch needs to be a promise(async call)
//fetch --resolve--.then,async
//fetch--reject--.catch,await


// let x=fetch('https://fakestoreapi.com/products');
// console.log("x:",x);  //does not worked out

fetch("https://fakestoreapi.com/products").then(function(res){
    // console.log("res",res);
    
    return res.json()  //same as res.collect--to collect fetched data(collecting stream--takes time)
})
.then(function(res){
    console.log("res",res);
})
.catch(function(err){
    console.log("error",err);  //to catch error if encounter
})

//covert above code to async await
let container=document.getElementById("container");
let data; //data for global access

async function getData(){
    try{                     //--try & catch for handling errors 
    let res= await fetch("https://fakestoreapi.com/products")
    // console.log("res",res);

    data= await res.json();
    console.log("data",data);
    appendProducts(data);
}
catch(err){
    console.log("error",err);
}
}

getData();

//we need to append the data

function appendProducts(data){
//data--array of objects
container.innerHTML=null; //in order to avoid redundency

data.forEach(function(el){
    let div=document.createElement("div");
    let img=document.createElement("img");

    img.src=el.image;
    let title=document.createElement("p");
    title.innerText=el.title;

    let price=document.createElement("p");
    price.innerText=el.price;

    div.append(img,title,price);

    container.append(div);
})
}
// appendProducts(data);  ---as data takes time to load so untill then the data is undedined and there is no use of calling the function
 
function sortLH(){   //due to these type of functions our original data is lost!!
    data = data.sort(function(a,b){
        return a.price - b.price;
    });

    // console.log("Sorted Low to High",data);
    appendProducts(data);
}

function sortHL(){
    data=data.sort(function(a,b){
        return b.price-a.price;

    });
    appendProducts(data);
}

//how to keep original data
//dynamic filtering
function filter(){
    let copy_data=data; //in order to keep our original data safe  we made a copy of it
    let query=document.getElementById("query").value;
    // console.log("query",query);
    copy_data=copy_data.filter(function(el){
         return el.title.toLowerCase().includes(query)
    });
    appendProducts(copy_data);
}

//let copy_data=[...data]-->spread operator in order to create new array which does not change the original one


























