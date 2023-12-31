const loadPhone = async(searchText=13,isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll)=>{
    // console.log(phones) 

    const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent ='';
//   display show all button  if there are more than 12 phones
const showAllContainer = document.getElementById('show-all-container');
if(phones.length > 12){
    showAllContainer.classList.remove('hidden')
}
else{
   showAllContainer.classList.add('hidden');
}
console.log('is show all ', isShowAll)
// //   display only first 12 phones if not showAll phone
  if(isShowAll){
    phones = phones.slice(0,12 && !isShowAll);
  }

    phones.forEach(phone =>{
        console.log(phone);
        //2// create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`;
        // .set inner html
        phoneCard.innerHTML =`

        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}');
                        show_details_modal.showModal()" class="btn btn-primary">show details</button>
                      </div>
                    </div>
        ` ;
        // 4. append child
        phoneContainer.appendChild(phoneCard);

    })
    // hide loading spinner 
    toggleLoadingSpinner(false);
}
const handleShowDetail = async(id)=>{
  console.log('click show details',id)
  // load  single phone data
  const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  console.log(data)
  showPhoneDetails(data)
}
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName =document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  // show the modal
  show_detail_Modal.showModal();
}


// handle search button
const handleSearch =(isShowAll)=>{
  toggleLoadingSpinner(true)
   const searchField = document.getElementById('search-field');
   const searchText =searchField.value;
   console.log(searchText);
   loadPhone(searchText, isShowAll);
}   
// hanle Seacrh recap
const handleSearch2 =()=>{
    toggleLoadingSpinner(true);
    const searchField =document.getElementById('search-field2');
    const searchText = searchField.value;
    loadPhone(searchText);
}
const toggleLoadingSpinner =(isLoading)=>{
  const loadingSpinner=document.getElementById('loading-spinner');
  if (isLoading){
    loadingSpinner.classList.remove('hidden')
  }
 else{
  loadingSpinner.classList.add('hidden')
 }
}

// handle show all
const handleShowAll =()=>{
  handleSearch(true);

}

loadPhone();




