var tb = document.getElementById('tb');
const form = document.getElementById('books');

form.addEventListener('submit', addbook);

// addbook 
function addbook(e) {
    

    var title = document.getElementById('title').value;
    var author = document.getElementById('Author').value;
    var isbn = document.getElementById('ISBN#').value;
    var link= document.getElementById("link").value;
    var c=0;


    if (title.trim().length!=0 && author.trim().length!=0 && isbn.trim().length!=0 && link.trim().length!=0) {
        
        for (let i = 0; i < document.getElementById('tb').children[0].childElementCount; i++) {
            if (document.getElementById('tb').children[0].children[i].children[2].textContent==isbn) {
                c+=1;
                break;
            }
            
        }
        // if same ISBN#  number not found in the entries
        if (c==0){

            //将该值存储到一个数组 "a "中
            
            var a=[];
            a.push(title, author, isbn,link)
            
            var tbody = document.getElementsByTagName('tbody')
            var tr = document.createElement('tr');
            
            //为元素'tr'添加一个类
            tr.className = 'tr';
            
            //在表格中添加单行
         
            let td1 = document.createElement('td');
            td1.className = 'td';
            td1.appendChild(document.createTextNode(a[0]))
            tr.appendChild(td1)
         
            let td2 = document.createElement('td');
            td2.className = 'td';
            td2.appendChild(document.createTextNode(a[1]))
            tr.appendChild(td2)
            
         
            let td3 = document.createElement('td');
            td3.className = 'td';
            td3.appendChild(document.createTextNode(a[2]))
            tr.appendChild(td3)
            
            
            let td4 = document.createElement('td');
            td4.className = 'td';
            let anchor=document.createElement("a");
            anchor.href.value=a[3];
            
            td4.appendChild(anchor)
            tr.appendChild(td4)

           
            let td5 = document.createElement('td');
            td5.className = 'td';
            td5.innerHTML = '<button class="remove">X</button>';
            tr.appendChild(td5)
            
            tbody[0].appendChild(tr);
            tb.appendChild(tbody[0]);
            

            let msg = document.getElementById('msg');
            msg.style.backgroundColor = 'rgb(241, 195, 107)';
            msg.innerText = "Book Added succesfully";
            

        }
        // 如果ISBN相同
        else{
            c=0;
            let msg = document.getElementById('msg');
            msg.style.backgroundColor = 'rgb(241, 195, 107)';
            msg.innerText = "book already exist";

        }
    }
    else {
        let msg = document.getElementById('msg');
        msg.style.backgroundColor = 'rgb(241, 195, 107)';
        msg.innerText = "Plz Enter value in each field";

        

    }

}

// 通过点击 "x "按钮删除特定元素
tb.addEventListener('click', (e) => {
    var check = e.target.className;
    if (check == 'remove') {
        e.target.parentNode.parentElement.remove();
    }

})


// 按作者姓名、书名搜索书籍。

const searchf = document.getElementById('search-f').getElementsByTagName('input')[0];

searchf.addEventListener('keyup', (e) => {

    // 根据搜索框输入("值")来过滤书籍。   
    for (let i = 0; i < document.getElementById('tb').children[0].childElementCount; i++) {
        if ((document.getElementById('tb').children[0].children[i + 1].children[0].textContent.toLocaleLowerCase()).indexOf(searchf.value.toLocaleLowerCase()) > -1) {
            document.getElementById('tb').children[0].children[i + 1].style.display = "";

        }
        else {
            document.getElementById('tb').children[0].children[i + 1].style.display = 'none';

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
