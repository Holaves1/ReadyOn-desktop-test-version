const body = document.getElementById('body')

if (body.addEventListener) {
    if ('onwheel' in document) {
      body.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      body.addEventListener("mousewheel", onWheel);
    } else {
      body.addEventListener("MozMousePixelScroll", onWheel);
    }
  } else { 
    body.attachEvent("onmousewheel", onWheel);
  }
  
  function onWheel(e) {
    e = e || window.event;
    if(e.deltaY == 100){
        $(function(){
            $('#mouse-down').css('background-color', '#D9A728')
            setTimeout(() => {
                $('#mouse-down').css('background-color', '#DE131E')
            },500)
        })
    }
    else if(e.deltaY == -100){
        $(function(){
            $('#mouse-top').css('background-color', '#D9A728')
            setTimeout(() => {
                $('#mouse-top').css('background-color', '#DE131E')
            },500)
        })
    }
  }


  $(function() {
	
		$(".marquee").endlessScroll({ 
			width: "100%", 
			steps: 1, 
			speed: 10, 
			mousestop: true 
		});
		
    
	});

let MItem = document.getElementsByClassName('marquee-item')
const Marq = document.getElementById('marquee')

Marq.addEventListener('mouseover', (e) => {MarqOver(e)})
function MarqOver(e) {
  if(e.target.getAttribute('class') !== 'loupe'){document.querySelectorAll('.loupe').forEach(c => {c.removeAttribute('class')})}
  if(e.target.getAttribute('class') === 'loupe'){return}
  else{e.target.firstChild.setAttribute('class', 'loupe')}
}

const Gt3Body = document.querySelector('.N11-GT3_body')
Gt3Body.addEventListener('mouseover', (e) => {AN(e)})

function AN(e) {
  if(e.target.getAttribute('class') === 'N11-GT3_body'){
    document.querySelectorAll('.loupe').forEach(c => {c.removeAttribute('class')})
  }
}
document.querySelector('.GT3In').addEventListener('mouseover', () => {document.querySelectorAll('.loupe').forEach(c => {c.removeAttribute('class')})})



// Slider-jq
$(function(){
  // Slider with buttons
  let position = 0
  const slidesToShow = 4
  const slidersToScroll = 1

  const sliderItem = $(".slider-block__item")
  const slider = $(".slider")
  const sliderContainer = $(".slider-container")
  const BtnBack = $(".arrow-back")
  const BtnNext = $(".arrow-next")
  const itemsCount = sliderItem.length
  

  let element = document.getElementById("element-1"),
  style = window.getComputedStyle(element),
  sliderItemWidth2 = style.getPropertyValue('width');
  let sliderItemWidth = Number(sliderItemWidth2.replace(/[^\d]/g, '')) + 30

  let movePosition = sliderItemWidth * slidersToScroll
  

  BtnBack.click(function() {
    position += movePosition
    setPosition()
  })

  BtnNext.click(function() {
    position -= movePosition
    setPosition()
  })

  const setPosition = () => {
    slider.css({
      transform: `translateX(${position}px)`
    })
    cheackBtns()
    checkBtnsState()
  }
  const cheackBtns = () => {
      BtnBack.prop('disabled',position === 0)
      BtnNext.prop(
        'disabled',
        position <= -(itemsCount - slidesToShow) * sliderItemWidth
      )
  }
  const checkBtnsState = () => {
    if(position <= -950){
      document.getElementById('arrow-next').setAttribute('class', 'arrow-next-disable')
    }
    else{
      document.getElementById('arrow-next').setAttribute('class', 'arrow-next')
    }

    if(position == 0){
      document.getElementById('arrow-back').setAttribute('class', 'arrow-back-disable')
    }
    else{
      document.getElementById('arrow-back').setAttribute('class', 'arrow-back')
    }
    console.clear

  }
  cheackBtns()
  checkBtnsState()

  // Slider with paginate

  const PaginateItemsArrray = [
    {'itemName': document.getElementById('paginate-item-1'), 'num' : 1},
    {'itemName': document.getElementById('paginate-item-2'), 'num' : 2},
    {'itemName': document.getElementById('paginate-item-3'), 'num' : 3},
    {'itemName': document.getElementById('paginate-item-4'), 'num' : 4},
    {'itemName': document.getElementById('paginate-item-5'), 'num' : 5},
    {'itemName': document.getElementById('paginate-item-6'), 'num' : 6},
    {'itemName': document.getElementById('paginate-item-7'), 'num' : 7}
  ]


  const paginateBar = document.querySelector('.paginate-panel')

  paginateBar.addEventListener('click', (e) => {
    let target = e.target

    if(target.getAttribute('class') == 'rect'){
      target = target.closest('.paginate-item')
      setClassPaginate(target)

      paginate(target)
      
    }
    if(target.getAttribute('data-pag') == 'true' || target.getAttribute('class') === 'paginate-item'){
      setClassPaginate(target)

      paginate(target)
    }
    
    if(target.getAttribute('class') === 'paginate-panel'){
      return
    }
    

  })


  function paginate(target) {
    let indetif = 0
    document.querySelectorAll('.paginate-item').forEach((item, index) => {
      let result
      result =  target.getAttribute('id') ===  item.getAttribute('id') ? index : false
      if(result){
        indetif = result
      }
    })
    
    element = PaginateItemsArrray[indetif].num 
    element --
    if(indetif  < 4){
      position = -(movePosition * element)
      setPosition()
      setClassPaginate(target)
    }
    else{
      position = -(movePosition * 3)
      setPosition()
      
    }

  }

  function setClassPaginate(eTarget){

    document.querySelectorAll('.paginate-item_active').forEach((el) =>{
      el.classList.remove(el.classList.item(1))
    })
    eTarget.classList.add('paginate-item_active')
  }


  // According

  // const accordingItems = $('.accroding-item')
  const accordingButtons = $('.accroding-item__header__OpenCloseButton')
  $('.accroding-item__body').each(function(index) {
    let $TH = String($(this).height())
    let $TT = $(this).text()
    $(this).attr('data-number', $TH)
    $(this).attr('data-text', $TT)

  })
  accordingButtons.each(function() {
    let el = $(this).parent().next()
    if($(this).attr('data-toggle') == 'false'){
      el.css({
        'height' : '0px',
        'marginTop' : '0px',
        'opacity': '1',
      })
    }
  })
  



  let print;
  function printText(element) {
    element.text('')
    const text = element.attr('data-text')
    let counter = 0
    let newText = ''
    clearInterval(print)  
    print = setInterval(() => {
      if (counter <= text.length && text[counter] != undefined) {
        newText = newText + text[counter]
        counter++
      } else {
        clearInterval(print)
      }
      element.text(newText)
    }, 30)
  }
  printText($("[data-text"))
  setTimeout(() => printText($("[data-text")),1000)



  accordingButtons.click(function(){
    const $target = $(this)
    const $targetBody = $target.attr('class') === 'polygon-but' ? $target.parent().parent().next() : $target.parent().next()

    if($target.attr('data-toggle') == 'true'){
      $targetBody.animate({
        opacity: 0.0,
        height: `0px`,
        marginTop : '0px'
      }, 200)
      buttonTransform($target,() => {
        $target.attr('data-toggle', 'false')
      })
    }
    else if($target.attr('data-toggle') == 'false'){
      $targetBody.animate({
        opacity: 1,
        height: `+=${$targetBody.attr('data-number')}`,
        marginTop : '37px'
      }, 200)
      buttonTransform($target,() => {
        $target.attr('data-toggle', 'true')
      })
      clearInterval(print)

      printText($targetBody)

    }
    
  })
  function buttonTransform(TargetBtn, callback) {
      if(TargetBtn.attr('data-toggle') == 'false'){
        TargetBtn.attr('class', 'accroding-item__header__OpenCloseButton_active')
      }
      else{
        TargetBtn.attr('class', 'accroding-item__header__OpenCloseButton')
      }
      callback()
    
  }



})
// Проверка ввода формы

const submitBtn = document.getElementById('btnSub')
const emailInput = document.getElementById('userEmail')
const nameInput = document.getElementById('userName')
const checkBox = document.getElementById('happy')
const msgInput = document.getElementById('message')

let minEmailLenght = 4
let minNameLenght = 1
let minMsgLenght = 10

checkBox.addEventListener('change', () => {
  let checkInputsResult = (function(){
    let a = emailInput.value.length >= minEmailLenght && nameInput.value.length >= minNameLenght && msgInput.value.length >= minMsgLenght ? true : false
    return a
  })()
  let counter = 0

  if(checkBox.checked){counter = 1}
  if(checkBox.checked && checkInputsResult === true){counter = 2}
  if(counter === 1){
    if(emailInput.value.length < minEmailLenght){
      warningInput(emailInput, minEmailLenght)
    }
    if(nameInput.value.length < minNameLenght){
      warningInput(nameInput, minNameLenght)
    }
    if(msgInput.value.length < minMsgLenght){
      warningInput(msgInput, minMsgLenght)
    }
    submitBtn.setAttribute('class', 'button_order3__disabled')
    submitBtn.setAttribute('disabled')
  }else if(counter === 2){
    submitBtn.setAttribute('class', 'button_order3')
    submitBtn.removeAttribute('disabled')

  }
})

function warningInput(el, minLenght) {
  el.value = ''
  console.log(el)
  el.setAttribute('placeholder', `Пожалуйста введите не менее ${minLenght} символов`)
}