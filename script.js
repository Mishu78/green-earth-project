const categoriesContainer=document.getElementById('categoriesContainer');
const treesContainer=document.getElementById('treesContainer');
const loadingSpinner=document.getElementById('loadingSpinner');
const allTress =document.getElementById('attTreesbtn')

async function loadCategories(){
const res= await fetch('https://openapi.programming-hero.com/api/categories')
 const data= await res.json()
 //console.log(data);
 data.categories.forEach((category) => {
    //console.log(category)
    const btn=document.createElement('button');
    btn.className="btn btn-outline w-full";
    btn.textContent=category.category_name;
    btn.onclick =()=>selectCategory(category.id,btn);
    categoriesContainer.appendChild(btn);
 });
};
async function selectCategory(categoryId,btn){
  console.log(categoryId,btn);
  showLoading();
  
  const allButton= document.querySelectorAll("#categoriesContainer button , #allTreesbtn")
  

allButton.forEach((btn)=>{
btn.classList.remove('btn-primary');
btn.classList.add('btn-outline');
});
allTreesbtn.classList.add('btn-primary');
allTreesbtn.classList.remove('btn-outline');

loadTrees();
const res=await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
const data= await res.json();
displayTrees(data.plants);
hideLoading();
}

allTreesbtn.addEventListener('click',()=>{
  const allButton= document.querySelectorAll("#categoriesContainer button , #allTreesbtn")
  

allButton.forEach((btn)=>{
btn.classList.remove('btn-primary');
btn.classList.add('btn-outline');
});
})
function hideLoading(){
  loadingSpinner.classList.add('hidden');
}
function showLoading(){
  loadingSpinner.classList.remove('hidden');
}

async function loadTrees(){
  showLoading();
const res = await fetch('https://openapi.programming-hero.com/api/plants')
const data=await res.json();
hideLoading();
console.log(data);
displayTrees(data.plants);
hideLoading();
}

function displayTrees(trees){
  treesContainer.innerHTML="";
console.log(trees);
trees.forEach((tree) => {
console.log(tree);
const card = document.createElement('div');
card.className= "card bg-white shadow-sm";
card.innerHTML= `
  <figure>
    <img
      src="${tree.image}"
      alt="${tree.name}"
      title="${tree.name}"
      class="h-48 object-cover w-full"/>
  </figure>
  <div class="card-body">
    <h2 class="card-title">${tree.name}</h2>
    <p class="line-clamp-2">${tree.description}</p>
    <div class="badge badge-success">${tree.category}</div>
    <div class="card-actions justify-between items-center">
        <h2 class="font-bold text-xl text-green-700">${tree.price}</h2>
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
  `
  treesContainer.appendChild(card);
});
}
loadCategories();
loadTrees();

