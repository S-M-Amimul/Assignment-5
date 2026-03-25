

let allIssues = []


const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data
            displayIssues(allIssues)
        })
}


const filterIssues = (status) => {
    const filtered = allIssues.filter(issue => issue.status === status)
    displayIssues(filtered)
}
const buttons = document.querySelectorAll("#filter-button button");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        
        buttons.forEach(b => b.classList.remove("active"));

      
        btn.classList.add("active");
    });
});


const displayIssues = (issues) => {
    const issueContainer = document.getElementById("issue-container")
    issueContainer.innerHTML = ""

    issues.forEach((issue) => {
        let labelHTML = ""
        issue.labels.forEach(label => {
            if (label === "bug") {
                labelHTML += `<span class="bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-3xl text-xs"><i class="fa-solid fa-bug"></i> bug</span>`
            } else if (label === "help wanted") {
                labelHTML += `<span class="bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-3xl text-xs"><i class="fa-regular fa-life-ring"></i> help wanted</span>`
            } else {
                labelHTML += `<span class="bg-[#BBF7D0] text-[#00A96E] px-2 py-1 rounded-3xl text-xs"><i class="fa-solid fa-wand-magic-sparkles"></i> ${label}</span>`
            }
        })

        let statusHTML = ""
        if (issue.status === "open") {
            statusHTML += `<span>
                <img src="assets/Open-Status.png" alt="">
            </span>`
        } else {
            statusHTML += `<span>
                <img src="assets/Closed- Status .png" alt="">
            </span>`
        }

        if (issue.priority === "high") {
            statusHTML += `<span class="bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-3xl text-xs">HIGH</span>`
        } else if (issue.priority === "medium") {
            statusHTML += `<span class="bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-3xl text-xs">MEDIUM</span>`
        } else {
            statusHTML += `<span class="bg-[#9CA3AF30] text-[#9CA3AF] px-2 py-1 rounded-3xl text-xs">LOW</span>`
        }

        let borderColor = issue.status === "open" ? "border-t-4 border-green-500" : "border-t-4 border-purple-500"
        const createdDate = new Date(issue.createdAt).toLocaleDateString();
        const card = document.createElement("div")
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm py-5 px-5 space-y-4 h-[300px] ${borderColor}">
            <div class="flex justify-between">${statusHTML}</div>
            <h4 class="font-semibold">${issue.title}</h4>
            <p class="text-[12px] text-[#64748B]">${issue.description}</p>
            <div class="flex gap-2 flex-wrap">${labelHTML}</div>
            <p class="text-[12px] text-[#64748B]">#1 by ${issue.author}</p>
            <p class="text-[12px] text-[#64748B]">${createdDate}</p>
        </div>
        `
        card.addEventListener("click", () => {
            loadIssueDetail(issue.id);
        })
        issueContainer.appendChild(card)
    })


    const issueCount = document.getElementById("issue-count")
    if (issueCount) {
        issueCount.textContent = `${issues.length} Issues`
    }
}



const loadIssueDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    const res = await fetch(url);
    const details = await res.json()
    displayIssueDetails(details.data)

}
const displayIssueDetails = (issue) => {
    const detailsBox = document.getElementById("details-container")

    const date = new Date(issue.createdAt).toLocaleDateString();


    let statusHTML = "";
    if (issue.status === "open") {
        statusHTML = `<span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs">Opened</span>`;
    } else {
        statusHTML = `<span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs">Closed</span>`;
    }

    
    let labelHTML = "";
    issue.labels.forEach(label => {
        if (label === "bug") {
            labelHTML += `<span class="bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs"><i class="fa-solid fa-bug"></i> BUG</span>`;
        }
        else if (label === "help wanted") {
            labelHTML += `<span class="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs"><i class="fa-regular fa-life-ring"></i> HELP WANTED</span>`;
        } else {
            labelHTML += `<span class="bg-[#BBF7D0] text-[#00A96E] px-2 py-1 rounded-3xl text-xs"><i class="fa-solid fa-wand-magic-sparkles"></i> ${label}</span>`
        }
    });

    
    let priorityHTML = "";
    if (issue.priority === "high") {
        priorityHTML = `<span class="bg-[#FEECEC] text-[#EF4444] px-3 py-1 rounded-full text-xs">HIGH</span>`;
    }
    else if (issue.priority === "medium") {
        priorityHTML = `<span class="bg-[#FFF8DB] text-[#D97706] px-3 py-1 rounded-full text-xs">MEDIUM</span>`;
    }
    else {
        priorityHTML = `<span class="bg-[#9CA3AF30] text-[#9CA3AF] px-3 py-1 rounded-full text-xs">LOW</span>`;
    }

    detailsBox.innerHTML = `
    <div class="">
        <h2 class=" text-[#1F2937] font-bold text-[24px]">${issue.title}</h2>
         <div class="flex items-center gap-3 mt-2 text-sm">
            ${statusHTML}
            <span class="text-gray-500  text-[12px]"> • Opened by ${issue.author} • ${date}</span>
        </div>
        <div class="flex gap-2 mt-3">
            ${labelHTML}
        </div>

        <!-- description -->
        <p class="text-gray-600 mt-4">
            ${issue.description}
        </p>

        <!-- bottom box -->
        <div class="bg-gray-100 rounded-lg p-4 flex justify-between mt-5">
            <div>
                <p class="text-sm text-gray-500">Assignee:</p>
                <p class="font-semibold">${issue.author}</p>
            </div>

            <div>
                <p class="text-sm text-gray-500">Priority:</p>
                ${priorityHTML}
            </div>
        </div>    

    </div>`

    document.getElementById("issue_modal").showModal()
}


loadIssues()


document.getElementById("btn-search").addEventListener("click",()=>{
    const input = document.getElementById("input-search")
    const searchValue = input.value.trim().toLowerCase();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then(data=>{ displayIssues(data.data); 
        });

})
