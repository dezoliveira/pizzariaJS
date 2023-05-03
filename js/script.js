let idPizza = 0

let qtdPizzas = 1

let cart = []

// funções auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BLR' })
}

const formataValor = (valor) => {
  if(valor) {
    return valor.toFixed(2)
  }
}

const abrirModal = () => {
  seleciona('.pizzaWindowArea').style.opacity = 0 // transparente
  seleciona('.pizzaWindowArea').style.display = 'flex'
  setTimeout(() => seleciona('.pizzaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
  seleciona('.pizzaWindowArea').style.opacity = 0 // transparente
  setTimeout(() => seleciona('.pizzaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
  // BOTÕES FECHAR MODAL
  selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton')
  .forEach((item) => {
    item.addEventListener('click', fecharModal)
  })
}

const preencheDadosDasPizzas = (pizzaItem, item, index) => {
  pizzaItem.setAttribute('data-key', index)
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector('.pizza-item--price').innerHTML = formatoReal(item.price[2])
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
  seleciona('.pizzaBig img').src = item.img
  seleciona('.pizzaInfo h1').innerHTML = item.name
  seleciona('.pizzaInfo--desc').innerHTML = item.description
  seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

const pegarKey = (e) => {
  // .closest retorna o elemento mais proximo que tem a class que passamos
  // o id do .pizza-item através do data-key
  let key = e.target.closest('.pizza-item').getAttribute('data-key')
  console.log('Pizza clicada ' + key)
  console.log(pizzaJson[key])

  // garante que a quantidade de pizzas inicial é 1
  qtdPizzas = 1

  // pega o id da pizza
  idPizza = key

  return key
}

const preencherTamanhos = (key) => {
  // tirar a selecao de tamanho atual e selecionar o tamanho grande
  seleciona('.pizzaInfo--size.selected').classList.remove('selected')

  // selecionar todos os tamanhos
  selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
    // selecionar o tamanho grande
    (sizeIndex == 2) ? size.classList.add('selected') : ''
    size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
  })
}

const escolherTamanhoPreco = (key) => {
  // Ações nos botões de tamanho
  // selecionar todos os tamanhos
  selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
      // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
      // tirar a selecao de tamanho atual e selecionar o tamanho grande
      seleciona('.pizzaInfo--size.selected').classList.remove('selected')
      // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
      size.classList.add('selected')

      // mudar o preço de acordo com o tamanho
      seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
    })
  })
}

pizzaJson.map((item, index) => {

  let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
  seleciona('.pizza-area').append(pizzaItem)

  // preencher os dados de cada pizza
  preencheDadosDasPizzas(pizzaItem, item, index)

  // pizza clicada
  pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
    e.preventDefault()

    let chave = pegarKey(e)

    // abrir janela modal
    abrirModal()

    // preenchimento dos dados
    preencheDadosModal(item)

    // pegar tamanho selecionado
    preencherTamanhos(chave)

    seleciona('.pizzaInfo--qt').innerHTML = qtdPizzas


    // selecionar o tamanho e preco com o clique no botao
    escolherTamanhoPreco(chave)

  })

  botoesFechar()    
})