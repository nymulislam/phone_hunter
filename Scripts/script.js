document.getElementById('default-search').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        searchButton()
    }
})


const searchButton = () => {
    const inputFiled = document.getElementById("default-search")
    const inputValue = inputFiled.value;
    inputFiled.value = "";
    loadPhone(inputValue);
}


const loadPhone = async (inputValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`);
    const data = await res.json();
    const phones = data.data;

    collectData(phones)
}


const collectData = phones => {
    const parentDiv = document.getElementById("card_container");
    parentDiv.textContent = "";

    phones.forEach(phone => {
        console.log(phone);
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

                        <!-- Open the modal using ID.showModal() method -->
                        <button
                            class="btn btn-primary bg-blue-600 text-white border-blue-500 hover:bg-blue-700 w-2/3 normal-case text-base font-medium mt-3"
                            onclick="my_modal.showModal()">Show Details</button>
                        <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
                            <form method="dialog" class="modal-box">
                                <h3 class="font-bold text-lg">Hello!</h3>
                                <p class="py-4">Press ESC key or click the button below to close</p>
                                <div class="modal-action">
                                    <!-- close the modal -->
                                    <button
                                        class="btn btn-primary bg-red-600 text-white border-red-500 hover:bg-red-700 normal-case text-lg">Close</button>
                                </div>
                            </form>
                        </dialog>
                    </div>
        `
        parentDiv.appendChild(newDiv)
    });
}