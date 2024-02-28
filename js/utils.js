const searchData = () => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  const inputField = document.getElementById("input-field");
  const searchKeyword = inputField.value;
  loadData(searchKeyword);
};

const loadData = async (searchKeyword) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`
  );
  const data = await response.json();
  showData(data.data);
};

const showData = (phones) => {
  const phoneContainer = document.getElementById("phone-section");
  phoneContainer.innerHTML = "";

  const createPhoneCard = (phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList = `card bg-base-100 shadow-xl`;
    phoneDiv.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button onclick = "showDetailsModal('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  };
  if (phones.length > 12) {
    const remainingPhones = phones.slice(12);
    phones = phones.slice(0, 12);
    const showAllButton = document.getElementById("show-all-button");
    showAllButton.classList.remove("hidden");
    showAllButton.onclick = () => {
      remainingPhones.forEach(createPhoneCard);
      showAllButton.classList.add("hidden");
    };
    const allertContainer = document.getElementById("no-data-container");
    allertContainer.innerHTML = "";
  } else if (phones.length == 0) {
    const allertContainer = document.getElementById("no-data-container");
    allertContainer.innerHTML = "";
    const allertDiv = document.createElement("div");
    allertDiv.innerHTML = `<h1> No data available`;
    allertDiv.classList = `justify-center text-center w-full text-nowrap text-6xl `;
    allertContainer.appendChild(allertDiv);
    const showAllButton = document.getElementById("show-all-button");
    showAllButton.classList.add("hidden");
  } else {
    const showAllButton = document.getElementById("show-all-button");
    showAllButton.classList.add("hidden");
    const allertContainer = document.getElementById("no-data-container");
    allertContainer.innerHTML = "";
  }
  phones.forEach(createPhoneCard);
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
};

const showDetailsModal = async (id) => {
  const response = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const singlePhoneData = await response.json();
  console.log(singlePhoneData);
  showModal(singlePhoneData.data);
};

const showModal = (phone) => {
  console.log(phone);
  const informationDiv = document.getElementById("mobile-information");
  informationDiv.innerHTML = `
  <h3 class="font-bold text-xl"> ${phone.name}</h3>
  <p><span class="font-bold text-xl">Storage:</span>${phone.mainFeatures.storage}</p>
  <p><span class="font-bold text-xl">Display Size:</span>${phone.mainFeatures.displaySize}</p>
  <p><span class="font-bold text-xl">Chipset:</span>${phone.mainFeatures.chipSet}</p>
  <p><span class="font-bold text-xl">Memory:</span>${phone.mainFeatures.memory}</p>
  <p><span class="font-bold text-xl">Slug:</span>${phone.slug}</p>
  <p><span class="font-bold text-xl">Release Date:</span>${phone.releaseDate}</p>
  <p><span class="font-bold text-xl">Brand:</span>${phone.brand}</p>
  <p><span class="font-bold text-xl">GPS:</span>${phone.others.GPS}</p>
  `;
  const imgDiv = document.getElementById("phone-img");
  imgDiv.innerHTML = `
    <img class="rounded-3xl py-2" src="${phone.image}">
    `;
  show_details_modal.showModal();
};
