//Target an element
let ul=document.querySelector(".ul");
let dropDown=document.getElementById("dropDown");

//important brands list in array
let brands=['Select brand here','almay','annabelle','benefit','cargo cosmetics','clinique','covergirl','e.l.f.',"l'oreal",'maybelline','nyx','smashbox','revlon'];

//using forEach method to createelment and append in the dropdown list.
brands.forEach((brand,index)=>{
    let option=document.createElement("option");
    option.setAttribute("value",index);
    option.innerText=brand;
    dropDown.append(option)
});

//initial brand name
let brandName="maybelline";
//dynamic url
let url=(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName}`);
//starting page.
let startpage=0;
//eventlistener to listen the drop down selection
dropDown.addEventListener("click",async()=>{
    let index=dropDown.selectedIndex;
     if(index>0){
        brandName="";
        brandName+=brands[index];
        url=(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName}`)
        console.log(url);
     }
     try {
        let res = await fetch(url);
        res=await res.json();
        let filteredArray=res.slice(startpage,startpage+9)
            ul.innerHTML=ThreeCard(filteredArray);
        } catch (error) {
            console.log(error);        
    }

})

//create function to fetch data from api
let getUsers = async ()=>{
  try {
      let res = await fetch(url);
      res=await res.json();
      return res
  } catch (error) {
      console.log(error);
  }
}

//this will load the data when page get load.
addEventListener("DOMContentLoaded",async ()=>{
    try {
        let res = await fetch(url);
        res=await res.json();
        let filteredArray=res.slice(startpage,startpage+9)
            ul.innerHTML=ThreeCard(filteredArray);
            // inserting(res);       
        } catch (error) {
            console.log(error);        
    }
})

//clicking next putton
let nextBtn=document.querySelector(".nextBtn");
nextBtn.addEventListener("click",()=>{
    
    startpage+=9;
    getUsers().then(function(value){
        console.log(startpage);
        if(startpage<value.length){
            let array=value.slice(startpage,startpage+9);
            ul.innerHTML=ThreeCard(array);
        }else{
            startpage+=-9;
            alert("you are already in last page")
        }
    }) 
})

//clicking prev putton
let prevBtn=document.querySelector(".prevBtn");
prevBtn.addEventListener("click",()=>{
    
    startpage-=9;
    getUsers().then(function(value){
        console.log(startpage);
        if(startpage>0){
            let array=value.slice(startpage,startpage+9);
            ul.innerHTML=ThreeCard(array);
        }else{
            startpage+=+9;
            alert("you are already in first page")
        }
    }) 
})

// this template funciton will give syntax of html with value
let template=(product)=>{
    let temp=`
    <!-- CARD -->
    <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
            <div class="card h-100" >
                <div class="card-header">${product.name}</div>
                <div class="card-body">
                    <img class="flag1"f src="${product.image_link}" alt="">
                    <div class=align>
                        <p class="card-text"><b>Brand:</b>${product.brand}</p>
                        <p class="card-text"><b>Price :</b>$ ${(+product.price)+(-0.03)}</p>
                        <p class="card-text"><b>Description :</b> ${(product.description)}</p>
                        <a class="card-text" href="${product.product_link}"><b>Click here to buy </b></a>
                    </div>
                </div>
            </div>
    </div>
                    `;        
                     
        return temp
}

//let 3card in a row
let ThreeCard=(data)=>{

    let mainAdd="";
    let tempAdd="";
    for(let i=0;i<data.length;i=i+3){
        let c="";
        for(let j=i;j<i+3;j++){
            c+=template(data[j])
        }
        tempAdd=`<li style="list-style:none;"><div class="row">${c}</div></li>`;
        mainAdd+=tempAdd;
    }
    return mainAdd
}

/////////////////end///////////////////////////////////
