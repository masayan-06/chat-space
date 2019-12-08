	
$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    //メッセージに画像が含まれる場合のHTMLを作る
    if (message.image) {
      var html =`<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${message.text}
                    </p>
                  </div>
                </div>`
    }
    //メッセージに画像が含まれない場合のHTMLを作る
    else {
      var html =`<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${message.text}
                    </p>
                    <img class="lower-message__image">
                      ${message.image}
                  </div>
                </div>`
    }
    return html
  }

  $("#new_message").on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')  //attrメソッド
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false); //連続クリック
      $("#new_message")[0].reset(); //テキストと画像を一括して空にする
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});