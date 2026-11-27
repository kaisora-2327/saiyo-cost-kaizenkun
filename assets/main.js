(function(){
  var tabs=[].slice.call(document.querySelectorAll('.tab'));
  function select(t){
    tabs.forEach(function(x){
      var on=x===t;
      x.setAttribute('aria-selected',on?'true':'false');
      x.tabIndex=on?0:-1;
      document.getElementById(x.getAttribute('aria-controls')).hidden=!on;
    });
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){select(t)});
    t.addEventListener('keydown',function(e){
      var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
      if(!d)return;
      var n=tabs[(i+d+tabs.length)%tabs.length];select(n);n.focus();e.preventDefault();
    });
  });
  var form=document.getElementById('contact-form'),msg=document.getElementById('form-msg');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var bad=[].slice.call(form.querySelectorAll('[required]')).filter(function(el){return !el.value.trim()||(el.type==='email'&&!/^\S+@\S+\.\S+$/.test(el.value))});
    if(bad.length){msg.hidden=false;msg.style.color='var(--warn)';msg.style.background='var(--warn-soft)';msg.textContent='会社名・お名前・メールアドレスを正しく入力してください。';bad[0].focus();return;}
    msg.hidden=false;msg.style.color='';msg.style.background='';
    msg.textContent='入力内容を確認しました。このページは公開前のプレビューのため、送信は行われていません。';
  });
})();
