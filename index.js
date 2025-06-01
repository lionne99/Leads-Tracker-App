
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
            databaseURL: "https://leads-tracker-94d47-default-rtdb.firebaseio.com/"
        };
        
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");
        
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")


onValue(referenceInDB, function(snapshot) {
    if(snapshot.exists()) {
        const snapshotValues = snapshot.val();
        const leads = Object.values(snapshotValues);
        render(leads);
    }
});


inputBtn.addEventListener("click", function() {
    let input = inputEl.value;
    if (input) {
        if (!input.startsWith("http://") && !input.startsWith("https://")) {
            push(referenceInDB, "https://" + input);
        } else {
            push(referenceInDB, input);
        }
        inputEl.value = "";
    }
});


deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB);
    ulEl.innerHTML = "";
})

function render(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `

    }
    ulEl.innerHTML = listItems
}
        