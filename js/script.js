pizzaJson.map((item, index) => {

  let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
  document.querySelector('.pizza-area').append(pizzaItem)

  // preencher os dados de cada pizza
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector('.pizza-item--price').innerHTML = formataValor(item.price)
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

  // pizza clicada
  pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Clicou na pizza')

    // abrir janela modal
    document.querySelector('.pizzaWindowArea').style.display = 'flex'

    // preenchimento dos dados
    document.querySelector('.pizzaBig img').src = item.img
    document.querySelector('.pizzaInfo h1').innerHTML = item.name
    document.querySelector('.pizzaInfo--desc').innerHTML = item.description
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = formataValor(item.price)

  })

  document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', () => {
    document.querySelector('.pizzaWindowArea').style.display = 'none'
  })

  document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', () => {
    document.querySelector('.pizzaWindowArea').style.display = 'none'
  })                    

})

function formataValor(valor) {
  return 'R$' + valor.toFixed(2).replace('.',',')
}