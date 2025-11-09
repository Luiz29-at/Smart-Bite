// Configuração do Firebase
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
const page = window.location.pathname.split("/").pop();

function showMessage(text, color = "red") {
  if (msg) {
    msg.style.color = color;
    msg.textContent = text;
  }
}

function traduzErro(code) {
  switch (code) {
    case "auth/email-already-in-use": return "E-mail já está em uso.";
    case "auth/invalid-email": return "E-mail inválido.";
    case "auth/weak-password": return "Senha muito fraca.";
    case "auth/user-not-found": return "Usuário não encontrado.";
    case "auth/wrong-password": return "Senha incorreta.";
    default: return "Erro: " + code;
  }
}

// LOGIN
if (page === "index.html" || page === "") {
  const btn = document.getElementById("btnLogin");
  if (btn) {
    btn.addEventListener("click", () => {
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();
      if (!email || !senha) return showMessage("Preencha todos os campos!");

      auth.signInWithEmailAndPassword(email, senha)
        .then(() => {
          showMessage("Login realizado com sucesso!", "lime");
          setTimeout(() => window.location.href = "painel.html", 800);
        })
        .catch(err => showMessage(traduzErro(err.code)));
    });
  }
}

// CADASTRO
if (page === "cadastro.html") {
  const btn = document.getElementById("btnCadastro");
  if (btn) {
    btn.addEventListener("click", () => {
      const nome = document.getElementById("nome").value.trim();
      const cnpj = document.getElementById("cnpj").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const nasc = document.getElementById("nascimento").value.trim();
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();

      if (!nome || !cnpj || !telefone || !nasc || !email || !senha)
        return showMessage("Preencha todos os campos!");

      auth.createUserWithEmailAndPassword(email, senha)
        .then(() => {
          showMessage("Cadastro concluído!", "lime");
          setTimeout(() => window.location.href = "index.html", 1000);
        })
        .catch(err => showMessage(traduzErro(err.code)));
    });
  }
}

// PAINEL
if (page === "painel.html") {
  auth.onAuthStateChanged(user => {
    if (!user) window.location.href = "index.html";
    else document.getElementById("usuario").textContent = user.email;
  });

  const sair = document.getElementById("btnSair");
  if (sair) sair.addEventListener("click", () => auth.signOut().then(() => window.location.href = "index.html"));
}
