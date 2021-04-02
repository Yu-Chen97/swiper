window.addEventListener('load', function () {
  // 获取元素
  var mainBox = document.querySelector('.main')
  var left = document.querySelector('.left')
  var right = document.querySelector('.right')
  var ul = document.querySelector('.big')
  var lis = document.querySelectorAll('.big li')
  var first_li = ul.children[0]
  // var last_two_li = ul.children[ul.children.length - 1]
  var focusWidth = first_li.offsetWidth

  // 前后添加图片
  var last_li = first_li.cloneNode(true)
  ul.appendChild(last_li)

  // 点击左右切换  点击切换 把num给circle
  var num = 0
  // var circle = 0
  right.addEventListener('click', function () {
    if (num >= ul.children.length - 1) {
      ul.style.left = 0
      num = 0 //小图能跟随大图 同步
    }
    num++
    // 大图移动
    animate(ul, -focusWidth * num)
    // circle++
    // 给小图当前项去除阴影
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].children[0].className = ''
    }
    ol.children[num].children[0].className = 'active'
    // 让circle在中间段时，ol向右移动，最后几个时ol停止移动，当circle在最后一个时，下一次直接跳到最前面
    // console.log(num);
    if (num >= 1 && num < 3) {
      ol.style.left = -188.8 / 16 + 'rem'
    } else if (num >= 3 && num < ol.children.length - 1) {
      ol.style.transition = 'all .5s'
      ol.style.left = ((2 - num) * 188.8) / 16 + 'rem'
      // animate(ol, (3 - num) * 188.8)
    } else {
      ol.style.transition = 'none'
      ol.style.left = -(6 * 188.8) / 16 + 'rem'
    }
  })
  left.addEventListener('click', function () {
    if (num <= 0) {
      num = ul.children.length - 1 //num 9
      // console.log(num);
      ul.style.left = -num * focusWidth / 16 + 'rem'
    }
    num-- //num 8
    animate(ul, -focusWidth * num)
    // circle--
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].children[0].className = ''
    }
    ol.children[num].children[0].className = 'active'
    console.log(num);
    if (num < 2 && num >= 0) {
      ol.style.left = 0
    } else if (num >= 2 && num < ol.children.length - 3) {
      ol.style.transition = 'all .5s'
      ol.style.left = ((1 - num) * 188.8) / 16 + 'rem'
    } else {
      // ol.style.transition = 'none'
      ol.style.left = -(5 * 188.8) / 16 + 'rem'
    }
  })

  // 小图相关
  var ol = document.querySelector('.small-img')
  var li = document.querySelectorAll('.small-img li')
  // 添加索引 点击小图  切换当前项 把index给circle
  for (var i = 0; i < ol.children.length; i++) {
    li[i].setAttribute('index', i)
    li[i].addEventListener('click', function (e) {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].children[0].className = ''
      }
      clearInterval(timer)
      this.children[0].className = 'active'
      var index = this.getAttribute('index')
      num = index
      animate(ul, -index * focusWidth)


    })
  }
  // 滑动移动图片
  var currentX = 0 //当前的X坐标
  var moveX = 0 // 移动距离
  mainBox.addEventListener('mousedown', function (e) {
    // console.log(ul.offsetLeft);
    var currentOffsetLeft = ul.offsetLeft //点击时  获得当前ul的offsetLeft

    clearInterval(timer)
    currentX = e.clientX
    // 图片移动的距离= 原有offsetLeft + 拖拽的距离moveX如果拖拽距离大于750/3/16 rem则切换图片
    mainBox.addEventListener('mousemove', move)

    function move(el) {
      clearInterval(timer)
      moveX = el.clientX - currentX
      ul.style.left = (ul.offsetLeft + moveX) / 16 + 'rem'

    }
    // 鼠标抬起时， 判断偏移量是否超过一半Math.abs(moveX) > 设定值
    mainBox.addEventListener('mouseup', function () {
      mainBox.removeEventListener('mousemove', move)
      if (Math.abs(moveX) > 150) {
        //切换
        if (moveX >= 0) {
          //向左移动 减去一个正值
          ul.style.left = (currentOffsetLeft - focusWidth) / 16 + 'rem'
        } else {
          //向右移动 加上一个正值
          ul.style.left = (currentOffsetLeft + focusWidth) / 16 + 'rem'
        }
      } else {
        ul.style.left = currentOffsetLeft / 16 + 'rem' //拖拽距离不够 返回当前offsetLeft
      }

    })

  })

  var last_small_li = li[0].cloneNode(true)
  ol.appendChild(last_small_li)
  // 自动播放
  var timer = setInterval(function () {
    right.click()
  }, 2000)

  // 鼠标悬停停止自动播放
  ul.addEventListener('mouseenter', function () {
    clearInterval(timer)
    timer = null
  })
  // 鼠标离开重新开启自动播放
  // ul.addEventListener('mouseleave', function () {
  //   if (full.style.display == 'none') {
  //     timer = setInterval(function () {
  //       right.click()
  //     }, 2000)
  //   }
  // })
  // 点击 全屏预览
  var big_li = document.querySelectorAll('.big li')
  var full_img = document.querySelector('.full_img')
  var full = document.querySelector('.full')
  for (var i = 0; i < ul.children.length; i++) {
    big_li[i].setAttribute('big_index', i)
    big_li[i].addEventListener('click', function (e) {
      full_img.src = e.target.src
      full_img.style.display = full.style.display = 'block'
    })
  }
  // 点击退出预览
  window.addEventListener('click', function () {
    quit()
  }, true)
  window.addEventListener('keyup', function (e) {
    if (e.key.charCodeAt() == 69) {
      quit()
      timer = setInterval(function () {
        right.click()
      }, 2000)
    }
    return
  })
  // 阴影蒙版
  function quit() {
    full_img.style.display = full.style.display = 'none'
  }
})

// 动画函数
function animate(obj, target, callback) {
  clearInterval(obj.timer)
  obj.timer = setInterval(() => {
    var step = (target - obj.offsetLeft) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer)
    }
    obj.style.left = (obj.offsetLeft + step) / 16 + 'rem'
    callback && callback()
  }, 15);
}