let data = [];

let tbody = document.getElementById("tbody");
let total=0

document.getElementById("search").addEventListener("keyup", function (e) {
  let val = e.target.value.toUpperCase();

  let searchData = data.filter((ele) => !ele.list.toUpperCase().indexOf(val));

  showData(searchData);
});

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let id = document.getElementById("id").value;
  let todo_list = document.getElementById("todo_list").value;
  let todo_val = document.getElementById("todo_val").value;
  if (id) {
    let updateData = data.map((ele) => {
      if (ele.id == id) {
        ele.list = document.getElementById("todo_list").value;
        ele.val = document.getElementById("todo_val").value;

        document.getElementById("submit").innerHTML = "Enter Task";
        document.getElementById("submit").style.background = "#380E60";
      }
      return ele;
    });

    localStorage.setItem("data", JSON.stringify(updateData));
    data = JSON.parse(localStorage.getItem("data"));
    showData(data);
  } else {
    let num = Math.random();
    let obj = {
      id: Math.round(num * 1000),
      list: todo_list,
      val: todo_val,
      status: false,
      time: Date(),
    };

    data.push(obj);

    localStorage.setItem("data", JSON.stringify(data));
    data = JSON.parse(localStorage.getItem("data"));
    showData(data);
  }
  document.getElementById("id").value = "";
  document.getElementById("todo_list").value = "";
  document.getElementById("todo_val").value = "";
});


function dele(id) {
  let deleData = data.filter((ele) => ele.id != id);
  localStorage.setItem("data", JSON.stringify(deleData));
  data = JSON.parse(localStorage.getItem("data"));
  showData(data);
}

function update(id) {
  let updatedData = data.filter((ele) => {
    if (ele.id == id) {
      document.getElementById("todo_list").value = ele.list;
      document.getElementById("todo_val").value = ele.val;
      document.getElementById("id").value = ele.id;
    }
  });

  document.getElementById("submit").innerHTML = "update";
  document.getElementById("submit").style.background = "#FFC107";
 
}

function showData(data) {
  tbody.innerHTML = "";

  data.map((ele) => {
    tbody.innerHTML += `
                   <tr class=" fs-4     ${
                     ele.status ? "table-success" : "table-danger"
                   }" id="box">
                        <td class="" >
<input id="stat" onchange="check(${ele.id})" value="true" type="checkbox" ${
      ele.status ? "checked" : ""
    } class="status1" />



</td>
                        <td>${ele.list}</td>
                         <td>${ele.val}</td>
                        <td><button onclick="update(${
                          ele.id
                        })" class="btn btn-danger fs-2" ><i class="ri-ball-pen-line"></i></button></td>
                        <td><button onclick="dele(${
                          ele.id
                        })" class="btn btn-red fs-2" ><i class="ri-close-large-line"></i></i></button></td>
                        <td>
                        <button class="btn fs-2 btn-blue" onclick="moreCanvas(${
                          ele.id
                        })" type="button" >⁝</button></td>
                    </tr>
    `;
  });
}

data = JSON.parse(localStorage.getItem("data")) || [];

data.map((ele) => {
  tbody.innerHTML += `

      <tr class="  fs-4     ${
        ele.status ? "table-success " : "table-danger"
      }" id="box">
                 
<td class="" >

<input id="stat" onchange="check(${ele.id})" value="true" type="checkbox" ${
    ele.status ? "checked" : ""
  } class="status1" />

</td>
                    <td>${ele.list}</td>
                    <td>${ele.val}</td>

                    <td><button onclick="update(${
                      ele.id
                    })" class="btn btn-yellow fs-2" ><i class="ri-ball-pen-line"></i></button></td>
                    <td><button onclick="dele(${
                      ele.id
                    })" class="btn btn-red fs-2" ><i class="ri-close-large-line"></i></i></button></td>
 <td>
                        <button class="btn fs-2 btn-blue" onclick="moreCanvas(${
                          ele.id
                        })" type="button" >⁝</button></td>
                </tr>
`;
});

setInterval(function () {
  let time = new Date();
  document.getElementById("time").innerHTML = `
${time.getHours()} :
${time.getMinutes()} :
${time.getSeconds()}
`;
}, 1000);

data.map((ele) => {
  total += Number(ele.val);
  
  console.log(total)
  
});

document.getElementById("totals").innerText ="total expense: " +  total;
