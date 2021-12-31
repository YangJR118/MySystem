

var tb = document.getElementById('tb');
const form = document.getElementById('books');



const searchf = document.getElementById('search-f').getElementsByTagName('input')[0];

searchf.addEventListener('keyup', (e) => {

console.log((document.getElementById('tb').children[0].children[ 1+ 1].children[0].textContent).indexOf(searchf.value) > -1)

  
    for (let i = 1; i < document.getElementById('tb').children[0].children.length; i++) {
        if ((document.getElementById('tb').children[0].children[i].children[0].textContent.toLowerCase()).indexOf(searchf.value.toLowerCase()) > -1) {
            document.getElementById('tb').children[0].children[i].style.display = "";

        }
        else {
            document.getElementById('tb').children[0].children[i].style.display = 'none';

        }

    }
});


const logout=document.getElementById('logout')
logout.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="login.ejs"
})

const home=document.getElementById('home')
home.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="/"
})
