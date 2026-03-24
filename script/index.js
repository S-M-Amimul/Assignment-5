// // load issues
// const loadIssues = () => {


//     fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
//         .then(res => res.json())
//         .then(data => displayIssues(data.data))

// }

// const displayIssues = (issues) => {


//     const issueContainer = document.getElementById("issue-container")
//     issueContainer.innerHTML = ""


//     issues.forEach((issue) => {

//         // 🔴🟢 label design তৈরি
//         let labelHTML = ""

//         issue.labels.forEach(label => {

//             if (label === "bug") {
//                 labelHTML += `<span class= "bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-3xl text-xs"><i class="fa-solid fa-bug"></i> bug</span>`
//             }
//             else if (label === "help wanted") {
//                 labelHTML += `<span class="bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-3xl text-xs"><i class="fa-regular fa-life-ring"></i> help wanted</span>`
//             }
//             else {
//                 labelHTML += `<span class="bg-[#BBF7D0] text-[#00A96E] px-2 py-1 rounded-3xl text-xs"><i class="fa-solid fa-wand-magic-sparkles"></i> ${label}</span>`
//             }

//         })


//         let statusHTML = ""

//         if (issue.status === "open") {
//             statusHTML += `<span class="bg-[#00A96E50]  px-2 py-1 rounded-3xl text-xs"><i class="fa-brands fa-ubuntu"></i> 
//     </span>`
//         } else if (issue.status === "closed") {
//             statusHTML += `<span class="bg-[#A855F750]  px-2 py-1 rounded-3xl text-xs"><i class="fa-regular fa-circle-check"></i> 
//     </span>`
//         }

//         if (issue.priority === "high") {
//             statusHTML += `<span class= "bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-3xl text-xs"> HIGH</span>`
//         }
//         else if (issue.priority === "medium") {
//             statusHTML += `<span class="bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-3xl text-xs">MEDIUM</span>`
//         }
//         else {
//             statusHTML += `<span class="bg-[#9CA3AF30] text-[#9CA3AF] px-2 py-1 rounded-3xl text-xs">LOW</span>`
//         }

//          let borderColor = ""

//         if (issue.status === "open") {
//             borderColor = "border-t-4 border-green-500"
//         } else if (issue.status === "closed") {
//             borderColor = "border-t-4 border-purple-500"
//         }


//         const card = document.createElement("div")
//         card.innerHTML = `
//         <div class="bg-white rounded-xl shadow-sm  py-5 px-5 space-y-4   h-[300px] ${borderColor}">
//             <div class="flex justify-between ">
//                 ${statusHTML}
//             </div>
//             <h4 class="font-semibold">${issue.title}</h4>
//             <p class="text-[12px] text-[#64748B] ">${issue.description}</p>
//             <div class="flex gap-2 flex-wrap">
//                 ${labelHTML}
//             </div>
//             <p class="text-[12px] text-[#64748B] ">#1 by ${issue.author}</p>
//             <p class="text-[12px] text-[#64748B] ">#1 by ${issue.createdAt}</p>
            

          

            

//         </div>`

//         issueContainer.appendChild(card)

//     })
// }


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

const displayIssues = (issues) => {

    const issueContainer = document.getElementById("issue-container")
    issueContainer.innerHTML = ""   // ✅ FIX

    issues.forEach((issue) => {


        let labelHTML = ""

        issue.labels.forEach(label => {

            if (label === "bug") {
                labelHTML += `<span class="bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-3xl text-xs"><i class="fa-solid fa-bug"></i> bug</span>`
            }
            else if (label === "help wanted") {
                labelHTML += `<span class="bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-3xl text-xs"><i class="fa-regular fa-life-ring"></i> help wanted</span>`
            }
            else {
                labelHTML += `<span class="bg-[#BBF7D0] text-[#00A96E] px-2 py-1 rounded-3xl text-xs"><i class="fa-solid fa-wand-magic-sparkles"></i> ${label}</span>`
            }

        })


        let statusHTML = ""

        if (issue.status === "open") {
            statusHTML += `<span class="bg-[#00A96E50] px-2 py-1 rounded-3xl text-xs">
                <i class="fa-brands fa-ubuntu"></i>
            </span>`
        } else {
            statusHTML += `<span class="bg-[#A855F750] px-2 py-1 rounded-3xl text-xs">
                <i class="fa-regular fa-circle-check"></i>
            </span>`
        }

        if (issue.priority === "high") {
            statusHTML += `<span class="bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-3xl text-xs">HIGH</span>`
        }
        else if (issue.priority === "medium") {
            statusHTML += `<span class="bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-3xl text-xs">MEDIUM</span>`
        }
        else {
            statusHTML += `<span class="bg-[#9CA3AF30] text-[#9CA3AF] px-2 py-1 rounded-3xl text-xs">LOW</span>`
        }

        let borderColor = ""

        if (issue.status === "open") {
            borderColor = "border-t-4 border-green-500"
        } else {
            borderColor = "border-t-4 border-purple-500"
        }

        const card = document.createElement("div")

        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm py-5 px-5 space-y-4 h-[300px] ${borderColor}">
            
            <div class="flex justify-between">
                ${statusHTML}
            </div>

            <h4 class="font-semibold">${issue.title}</h4>
            <p class="text-[12px] text-[#64748B]">${issue.description}</p>

            <div class="flex gap-2 flex-wrap">
                ${labelHTML}
            </div>

            <p class="text-[12px] text-[#64748B]">#1 by ${issue.author}</p>
            <p class="text-[12px] text-[#64748B]">${issue.createdAt}</p>

        </div>
        `

        issueContainer.appendChild(card)

    })
}


loadIssues()


