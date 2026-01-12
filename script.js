const botao = document.getElementById("botao");
const btnEsconder = document.getElementById("btnEsconder");
const divUsuarios = document.getElementById("usuarios");
const loading = document.getElementById("loading");

botao.addEventListener("click", () => {

  loading.classList.remove("hidden");
  
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => 
      {
      loading.classList.add("hidden");
      divUsuarios.classList.remove("hidden");
      botao.classList.add("hidden");


      divUsuarios.innerHTML = ""; 
      users.forEach(user => {
        const div = document.createElement("div");

        div.innerHTML = `
          <div class="m-4 bg-white-300 p-4 rounded-lg shadow-md">
            <h3 class="font-bold text-lg">${user.name}</h3>
            <p class="text-gray-700">Email: ${user.email}</p>
            <p class="text-gray-700">Cidade: ${user.address.city}</p>
          </div>
        `;

        divUsuarios.appendChild(div); 
      });

       const btnEsconder = document.createElement("button");
      btnEsconder.textContent = "Esconder Usuários";
      btnEsconder.className =
        "mb-4 text-white p-2 rounded-xl bg-red-500 hover:bg-red-600 transition";
      btnEsconder.addEventListener("click", () => {
        location.reload();
      });
      
      divUsuarios.appendChild(btnEsconder);
      })
      
    .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Infelizmente houve um erro, tente novamente mais tarde!",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
        });
        loading.classList.add("hidden");
        console.error("Erro:", error);
    });
});


