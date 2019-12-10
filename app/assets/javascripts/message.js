$(function(){
  var buildHTML = function(message) {
    if (message.text && message.image) {
      //data-idが反映されるようにしている
      var html = 
      `<div class="message" data-message_id=${message.id}>
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      <p class="lower-message__content">
                        ${message.text}
                      </p>
                      <img src=${message.image} class="lower-message__image">
                    </div>
                  </div>`
    } else if (message.text) {
      //同様に、data-idが反映されるようにしている
      var html = 
      `<div class="message" data-message_id=${message.id}>
        <div class="message__upper-info">
          <div class="message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="message__upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="lower-message__content">
            ${message.text}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = 
      `<div class="message" data-message_id=${message.id}>
        <div class="message__upper-info">
          <div class="message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="message__upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <img src=${message.image} class="lower-message__image">
        </div>
      </div>`
    };
    return html;
  };

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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");

    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});