const msg = document.getElementById("msg").innerText;//获取该元素对象
console.log(msg.length)
const submit = document.getElementById('login');
submit.addEventListener("submit", (e) => {

    console.log("clicke")
    if (msg.length > 0) {

        msg.innerText = `${msg}`
        setTimeout(() => {//setTimeout() 是属于 window 的方法，该方法用于在指定的毫秒数后调用函数或计算表达式。
            document.getElementById("msg").innerText = "";
            console.log("inside timeout")

        }, 2000)

    }
    else {

    }


})
console.log(msg)

const signUp = document.getElementById('reg')
signUp.addEventListener("click", () => {
    console.log("clicked")
    window.location.href = "register.ejs"
})

const home = document.getElementById('home')
home.addEventListener("click", () => {
    console.log("clicked")
    window.location.href = "/"
})

const about = document.getElementById('About')
about.addEventListener("click", () => {
    console.log("clicked")
    window.location.href = "about.ejs"
})

