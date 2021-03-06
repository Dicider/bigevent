$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

})
var form = layui.form
var layer = layui.layer
form.verify({
  pwd: [
    /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
  ],
  repwd: function (value) {
    var pwd = $('.reg-box [name=password]').val()
    if (value != pwd)
      return "两次密码不一致！"
  }
})

// $('#form_reg').on('submit',function(e){
//   e.preventDefault()
//   $.post('http://ajax.frontend.itheima.net/api/reguser',
//   {username:$('#form_reg [name=username]').val(),
//   password:$('#form_reg [name=password]').val()},function(res){
//     if(res.status !== 0){
//       return console.log(res.massage)}
//     alert("注册成功");
//   })
// })

$('#form_reg').on('submit', function (e) {
  e.preventDefault()
  // 2. 发起Ajax的POST请求
  var data = {
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()
  }
  $.post('/api/reguser', data, function (res) {
    if (res.status !== 0) {
      return layer.msg(res.message);
    }
    console.log(res);
    layer.msg('注册成功，请登录！')
    // 模拟人的点击行为
    $('#link_login').click()
  })
})

$("#form_login").on('submit',function(e){
  e.preventDefault()
  $.ajax({
    url:'/api/login',
    method:"POST",
    data:$(this).serialize(),
    success:function(res){
      if(res.status!== 0){
        return layer.msg('登陆失败！')
      }
      layer.msg('登陆成功！')
      localStorage.setItem('token',res.token)
      location.href='/index.html'
    }
  })
})