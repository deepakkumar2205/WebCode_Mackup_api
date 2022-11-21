//Target an element
let ul=document.querySelector(".ul");
let btn=document.querySelector("btn");
//create function to fetch data from api
let getUsers = async ()=>{
    let url=(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`);
  try {
      let res = await fetch(url);
      res=await res.json();
      console.log(ThreeCard(res));
      ul.innerHTML=ThreeCard(res);
      
    
  } catch (error) {
      console.log(error);
  }
}
getUsers()

//function to append the template to html page
let inserting=(data)=>{
    data.forEach(element => {
        //  showProduct(element)   ;
         
})
}

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
                        <p class="card-text"><b>Population :</b> ${(product.description)}</p>
                        <a class="card-text" href="${product.product_link}"><b>Click here to buy </b></a>
                    </div>
                </div>
            </div>
    </div>
                    `;        
            // <button class="btn btn-primary" onclick="weatherBtn([${country.latlng[0]},${country.latlng[1]}],'${country.name.common}')">weather</button>                       
        return temp
}

//let 3data
let ThreeCard=(data)=>{
    console.log(data.length);
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
console.log("deepakkumar");





///////////////////////////////////////////
