// 🔥 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB83kRUQb-V8SgppM1m_idpqSSarVocvU0",
  authDomain: "smart-bite-879c1.firebaseapp.com",
  projectId: "smart-bite-879c1",
  storageBucket: "smart-bite-879c1.firebasestorage.app",
  messagingSenderId: "886687766123",
  appId: "1:886687766123:web:8ab31d776e88671ade032e",
  measurementId: "G-6DVX4M4HMS"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const msg = document.getElementById("msg");

// 🔍 Detecta qual página está aberta
const pagina = window.location.pathname.split("/").pop();

// 🧾 Função para traduzir erros Firebase
function traduzErro(codigo) {
  switch (codigo) {
    case "auth/email-already-in-use": return "E-mail já está em uso.";
    case "auth/invalid-email": return "E-mail inválido.";
    case "auth/weak-password": return "Senha muito fraca. Use mais caracteres.";
    case "auth/user-not-found": return "Usuário não encontrado.";
    case "auth/wrong-password": return "Senha incorreta.";
    case "auth/network-request-failed": return "Erro de rede. Verifique sua conexão.";
    default: return "Erro: " + codigo;
  }
}

// 💻 LOGIN
if (pagina === "index.html" || pagina === "") {
  const btnLogin = document.getElementById("btnLogin");
  if (btnLogin) {
    btnLogin.addEventListener("click", () => {
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();

      if (!email || !senha) {
        msg.textContent = "⚠️ Preencha todos os campos.";
        return;
      }

      auth.signInWithEmailAndPassword(email, senha)
        .then(() => {
          msg.style.color = "green";
          msg.textContent = "✅ Login realizado com sucesso!";
          setTimeout(() => window.location.href = "painel.html", 1000);
        })
        .catch(err => {
          msg.style.color = "red";
          msg.textContent = "❌ " + traduzErro(err.code);
        });
    });
  }
}

// 🧩 CADASTRO
if (pagina === "cadastro.html") {
  const btnCadastro = document.getElementById("btnCadastro");
  if (btnCadastro) {
    btnCadastro.addEventListener("click", () => {
      const nome = document.getElementById("nome").value.trim();
      const cnpj = document.getElementById("cnpj").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const nascimento = document.getElementById("nascimento").value;
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();

      if (!nome || !cnpj || !telefone || !nascimento || !email || !senha) {
        msg.textContent = "⚠️ Preencha todos os campos.";
        return;
      }

      auth.createUserWithEmailAndPassword(email, senha)
        .then(() => {
          msg.style.color = "green";
          msg.textContent = "✅ Conta criada com sucesso!";
          setTimeout(() => window.location.href = "index.html", 1200);
        })
        .catch(err => {
          msg.style.color = "red";
          msg.textContent = "❌ " + traduzErro(err.code);
        });
    });
  }
}

// 🍽️ PAINEL (futuro)
if (pagina === "painel.html") {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "index.html";
    } else {
      document.getElementById("usuario").textContent = user.email;
    }
  });

  const sair = document.getElementById("btnSair");
  if (sair) {
    sair.addEventListener("click", () => {
      auth.signOut().then(() => {
        window.location.href = "index.html";
      });
    });
  }
              }
