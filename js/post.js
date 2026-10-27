const form = document.querySelector("#form-jogo");

const resposta = document.querySelector("#resposta");

const apiKey = "cv_M7s41pLZiFCaCuBb575O08Eju9K-hmXyzIuntkFP3KTToVaYgnpdwetLv8qBCluL";

const apiUrl = "https://api-ds.codeverse.dev.br/api/jogos";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const dados =  new FormData(form);

  const jogo = {
      title: dados.get("title"),
      genero: dados.get("genero"),
      plataforma: dados.get("plataforma"),
      ano_lancamento: dados.get("ano_lancamento"),
      desenvolvedora: dados.get("desenvolvedora"),
      imageUrl: dados.get("imageUrl") || null
  }

  resposta.textContent = "Enviando jogo para a API....";

try {

  const respostaApi = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },

    body: JSON.stringify(jogo),
  });

  const texto = await respostaApi.text();
  let resultado;

  try {
    resultado = texto ? JSON.parse(texto) : {};
  } catch (error) {
    resultado = error;
    return;
  }

  if(respostaApi.ok){
    resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
    form.reset();
  }
  
} catch (error) {
  console.error(error);
}

})