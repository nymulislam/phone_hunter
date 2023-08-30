document.getElementById('default-search').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        searchButton()
    }
})


const searchButton = () => {
    const inputFiled = document.getElementById("default-search")
    const inputValue = inputFiled.value;
    inputFiled.value = "";
    spinner(true);
    loadPhone(inputValue);
}


const loadPhone = async (inputValue='iPhone') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`);
    const data = await res.json();
    const phones = data.data;

    collectData(phones)
}

loadPhone()

const spinner = isSpinning => {
    const loading = document.getElementById('spinner')
    isSpinning ? loading.classList.remove('hidden') : loading.classList.add('hidden')
}


const collectData = phones => {
    const parentDiv = document.getElementById("card_container");
    parentDiv.textContent = "";

    const showButton = document.getElementById('expand_button')

    phones.length > 9 ?
        showButton.classList.remove('hidden')
        : showButton.classList.add('hidden')

    phones = phones.slice(0, 9)


    phones.forEach(phone => {
        const newDiv = document.createElement("div");
        newDiv.classList = `card bg-base-100 shadow-xl my-8`

        newDiv.innerHTML = `
        <figure class="p-5 py-8 bg-blue-50 m-6">
            <img src="${phone.image}" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title text-2xl">${phone.phone_name}</h2>
            <p class="text-sm text-gray-500">Phones are communication and entertainment devices.</p>
            <h3 class="card-title text-xl">$899</h3>
            <button
            class="btn btn-primary bg-blue-600 text-white border-blue-500 hover:bg-blue-700 w-2/3 normal-case text-base font-medium mt-3"
            onclick="showDetails('${phone.slug}')">Show Details</button>
        </div>
        `
        parentDiv.appendChild(newDiv)
    })

    spinner(false);
}

const showDetails = async (id) => {
    const idDynamic = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const res = await idDynamic.json();
    const data = res.data;
    displayModal(data)
}

const displayModal = phone => {

    const modalId = document.getElementById('my_modal')

    const modalInfo = document.getElementById('details_container');
    
    modalInfo.innerHTML = `
    <figure class="p-5 py-7 bg-blue-50 rounded-md">
    <img src="${phone?.image}" class="rounded-xl mx-auto" />
    </figure>

    <h3 class="text-2xl font-semibold my-4">${phone?.name}</h3>

    <h4 class="mb-3"><strong>Storage: </strong> <span class="text-gray-600">${phone?.mainFeatures?.storage}</span></h4>
    <h4 class="mb-3"><strong>Display Size: </strong><span class="text-gray-600">${phone?.mainFeatures?.displaySize}</span></h4>
    <h4 class="mb-3"><strong>Chipset: </strong><span class="text-gray-600">${phone?.mainFeatures?.chipSet}</span></h4>
    <h4 class="mb-3"><strong>Memory: </strong><span class="text-gray-600">${phone?.mainFeatures?.memory}</span></h4>
    <h4 class="mb-3"><strong>Sensors: </strong><span class="text-gray-600">${phone?.mainFeatures?.sensors || 'No'}</span></h4>

    <h4 class="mb-3"><strong>WLAN: </strong><span class="text-gray-600">${phone?.others?.WLAN || 'No'}</span></h4>

    <h4 class="mb-3"><strong>Bluetooth: </strong><span class="text-gray-600">${phone?.others?.GPS || 'No'}</span></h4>

    <h4 class="mb-3"><strong>GPS: </strong><span class="text-gray-600">${phone?.others?.NFC || 'No'}</span></h4>

    <h4 class="mb-3"><strong>NFC: </strong><span class="text-gray-600">${phone?.others?.Radio || 'No'}</span></h4>

    <h4 class="mb-3"><strong>USB: </strong><span class="text-gray-600">${phone?.others?.USB || 'No'}</span></h4>
    `
    modalId.showModal()
    
}