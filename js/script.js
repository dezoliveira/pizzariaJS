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

const mudarQuantidade = () => {
  // Ações nos botões + e - da janela modal
  seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
    qtdPizzas++
    seleciona('.pizzaInfo--qt').innerHTML = qtdPizzas
  })

  seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(qtdPizzas > 1) {
      qtdPizzas--
      seleciona('.pizzaInfo--qt').innerHTML = qtdPizzas
    }
  })
}

const adicionarNoCarrinho = () => {
  seleciona('.pizzaInfo--addButton').addEventListener('click', () => {
    console.log('Adicinonar no carrinho')

    console.log('Pizza ' + idPizza)

    let size = seleciona('.pizzaInfo--size.selected').getAttribute('data-key')
    console.log("Tamanho " + size)

    console.log("Quant. " + qtdPizzas)

    let price = seleciona('.pizzaInfo--actualPrice').innerHTML.replace('BLR&nbsp;', '')
    console.log(price)

    let identificador = pizzaJson[idPizza].id+'t'+size

    let key = cart.findIndex((item) => item.identificador == identificador)
    console.log(key)

    if(key > -1) {
      cart[key].qt += qtdPizzas
    }else {
      let pizza = {
        identificador,
        id: pizzaJson[idPizza].id,
        size,
        qt: qtdPizzas,
        price: parseFloat(price)
      }

      cart.push(pizza)
    }

    fecharModal()
    abrirCarrinho()
    atualizarCarrinho()
  })
}

const abrirCarrinho = () => {
  if(cart.length > 0) {
    // mostrar o carrinho
    seleciona('aside').classList.add('show')
    seleciona('header').style.display = 'flex'
  }

  // exibir aside do carrinho no modo mobile
  seleciona('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
      seleciona('aside').classList.add('show')
      seleciona('aside').style.left = '0'
    }
  })
}

const fecharCarrinho = () => {
  // fechar o carrinho com o botão X no modo mobile
  seleciona('.menu-closer').addEventListener('click', () => {
    seleciona('aside').style.left = '100vw' // usando 100vw ele ficará fora da tela
    seleciona('header').style.display = 'flex'
  })
}

const atualizarCarrinho = () => {
  // exibir número de itens no carrinho
  seleciona('.menu-openner span').innerHTML = cart.length
  console.log(cart.length)

  // mostrar ou não o carrinho
  if(cart.length > 0) {

    //mostra o carrinho
    seleciona('aside').classList.add('show')

    //zerar meu .cart para nao fazer insercoes duplicadas
    seleciona('.cart').innerHTML = ''

    // crie as variáveis antes do for
    let subtotal = 0
    let desconto = 0
    let total = 0

    // calcular o subtotal para preencher o carrinho
    for(let i in cart) {
      // usa o find para pegar o item por id
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
      console.log(pizzaItem)

      // em cada item pegar o subtotal
      subtotal += cart[i].price * cart[i].qt
      console.log(cart[i].price)
      console.log(cart[i].qt)
      console.log(subtotal)

      // fazer o clone, exibir na tela e depois preencher as informações
      let cartItem = seleciona('.models .cart--item').cloneNode(true)
      seleciona('.cart').append(cartItem)

      let pizzaSizeName = cart[i].size

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

      // preencher as informações
      cartItem.querySelector('img').src = pizzaItem.img
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

      // selecionar botões + e -
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
        console.log('clicou no botão mais')

        cart[i].qt ++

        atualizarCarrinho()
      })

      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
        console.log('clicou no botão menos')
        if(cart[i].qt > 1) {
          cart[i].qt --
        }else {
          cart.splice(i, 1)
        }

        (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

        // atualizar a quantidade
        atualizarCarrinho()
      })

      seleciona('.cart').append(cartItem)
    }

    desconto = subtotal * 0
    total = subtotal - desconto

    //preenchimento dos dados na tela
    seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
    seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
    seleciona('.total span:last-child').innerHTML = formatoReal(total)

  } else {
    //ocultar carrinho
    seleciona('aside').classList.remove('show')
    seleciona('aside').style.left = '100vw'
  }
  
}

const finalizarCompra = () => {
  seleciona('.cart--finalizar').addEventListener('click', () => {
    seleciona('aside').classList.remove('show')
    seleciona('aside').style.left = '100vw'
    seleciona('header').style.display = 'flex'
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

mudarQuantidade()

adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
