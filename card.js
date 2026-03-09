
let globalIsuuesData = [];

const allData = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            globalIsuuesData = data.data;
            displayData(globalIsuuesData);
        } );
}

//btn 3 tar jonno


const displayData = (informations) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    for (let info of informations) {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
         
            <div class="bg-white shadow-sm p-4 rounded-md h-full ">

                <div class="flex justify-between py-3">
                    <span class="bg-[#00A96E] rounded-full p-3 w-10 h-10 flex items-center justify-center"><i
                            class="fa-solid fa-spinner"></i></span>
                    <button class="bg-[#FEECEC] text-[#EF4444] px-8 py-2 rounded-full">${info.priority}</button>
                </div>

                <div class=" py-3">
                    <h1 class="font-bold text-xl">${info.title}</h1>
                    <p class="text-[#64748B]">${info.description}</p>
                </div>

                <div class="flex gap-4 font-bold  py-3">
                    <button
                        class="bg-[#FEECEC] text-[#EF4444] px-4 py-2 rounded-full flex gap-2 items-center justify-center"><i
                            class="fa-solid fa-bug "></i>Bug</button>
                    <button
                        class="bg-[#FDE68A] text-[#D97706] px-4 py-2 rounded-full flex gap-2 items-center justify-center"><i
                            class="fa-solid fa-life-ring"></i>Help Wanted</button>
                </div>

                <hr class="border-[#64748B]">

                <div class=" text-[#64748B] ">
                    <p class="py-2">#1by john_doe</p>
                    <p class="py-2">1/15/2024</p>
                </div>

            </div>
       
   
    `;
        cardContainer.append(cardDiv);
    }
}

allData()