
let globalIsuuesData = [];

const allData = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            globalIsuuesData = data.data;
            displayData(globalIsuuesData);
            updateIssueCount(globalIsuuesData);
            hideLoading();
        });
}

//loding
const showLoading = () => {
    document.getElementById("loading").classList.remove("hidden");
}

const hideLoading = () => {
    document.getElementById("loading").classList.add("hidden");
}

//btn active color
const buttons = document.querySelectorAll("#filter-buttons button");


buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active color from all buttons
        buttons.forEach(b => b.classList.remove("bg-blue-500", "text-white"));
        buttons.forEach(b => b.classList.add("bg-gray-300"));

        // Add active color to clicked button
        btn.classList.add("bg-blue-500", "text-white");
        btn.classList.remove("bg-gray-300");

        // Get status from data attribute
        const status = btn.getAttribute("data-status");
        filterIssues(status);
    });
});



//btn 3 tar jonno

const filterIssues = (status) => {
    showLoading(); 


    setTimeout(() => {
        let filteredData;

        if (status === "all") {
            filteredData = globalIsuuesData;
        } else {
            filteredData = globalIsuuesData.filter(
                item => item.status.toLowerCase() === status.toLowerCase()
            );
        }

        displayData(filteredData);
        updateIssueCount(filteredData);

        hideLoading(); 
    }, 200); 
}

// card r length ber karar jonno 

const updateIssueCount = (filteredData) => {
    document.getElementById("issue-count").textContent = `${filteredData.length} Issues`;
}

//api the data niye card create

const displayData = (informations) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    for (let info of informations) {
        const cardDiv = document.createElement('div');
         let borderColor = "";
        if (info.status.toLowerCase() === "open") {
            borderColor = "border-t-4 border-emerald-600"; 
        } else if (info.status.toLowerCase() === "closed") {
            borderColor = "border-t-4 border-violet-600";
        }

        cardDiv.innerHTML = `
         
            <div class="bg-white shadow-sm p-4 rounded-md h-full ${borderColor} ">

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
                    <p class="py-2">${info.author || 'unknown'}</p>
                    <p class="py-2">${new Date(info.createdAt).toLocaleDateString()}</p>
                </div>

            </div>
       
   
    `;
        cardContainer.append(cardDiv);

     cardDiv.addEventListener("click", () => {
    document.getElementById("modal-title").textContent = info.title;
    document.getElementById("modal-description").textContent = info.description;
    document.getElementById("modal-author").textContent = `Author: ${info.author || 'unknown'}`;
    document.getElementById("modal-date").textContent = `Date: ${new Date(info.createdAt).toLocaleDateString()}`;
    document.getElementById("modal-labels").textContent = info.labels ? `Labels: ${info.labels.join(', ')}` : '';

    document.getElementById("card-modal").classList.remove("hidden");
});

        
    }
    
}

allData()