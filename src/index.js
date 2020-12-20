// Global Queries and Variable Declarations
const dogTableBody = document.querySelector('#table-body')
let dogForm = document.querySelector('#dog-form')
let dogFormName = dogForm.firstElementChild
let dogFormBreed = dogForm.childNodes[3]
let dogFormSex = dogForm.childNodes[5]
let currentDogId;
// Inital Fetch Function Definition
const initialFetchDog = () => {
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogObjects => {
            dogObjects.forEach(renderDogTableBody)
        })
    }

    // Render Dog Table Body Function Definition
    const renderDogTableBody = (dogObject) => {
        dogTableBody.innerHTML += `
        <tr>
            <td>${dogObject.name}</td>
            <td>${dogObject.breed}</td>
            <td>${dogObject.sex}</td>
            <td><button data-id=${dogObject.id}>Edit Dog</button></td>
        </tr>
        `
    }

// Dog Edit Button event Listener through delegation on dogTableBody
const tableBodyEvent = (event) => {
    if (event.target.matches('button')) {
        const closestTableRow = event.target.closest('tr')
        const closestDogName = closestTableRow.childNodes[1].textContent
        const closestDogBreed = closestTableRow.childNodes[3].textContent
        const closestDogSex = closestTableRow.childNodes[5].textContent
       
        dogFormName.value = closestDogName
        dogFormBreed.value = closestDogBreed
        dogFormSex.value = closestDogSex
        currentDogId = event.target.dataset.id
    }
}

dogTableBody.addEventListener('click', tableBodyEvent)

// Submit Form Patch Event Listener 
const dogFormEvent = (event) => {
    event.preventDefault()
    patchDogObject()
}

    // Patch Dog Object through fetch
    const patchDogObject = () => {
        const formPatchData = {
            name: event.target.name.value,
            breed: event.target.breed.value,
            sex: event.target.sex.value
        }

        fetch(`http://localhost:3000/dogs/${currentDogId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formPatchData)
        })
        .then(reUpdateTable)
    }

        // Reupdate Table after Patching
        const reUpdateTable = () => {
            dogTableBody.innerHTML = ""
            initialFetchDog()
        }

dogForm.addEventListener('submit', dogFormEvent)

// initialFetchDog Function Call
initialFetchDog()
