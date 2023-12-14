//留言板
var messages = JSON.parse(localStorage.getItem('messages')) || [];

    /*function loadMessages() {
      var messageList = document.getElementById('message-list');
      messageList.innerHTML = '';

      messages.forEach(function (message, index) {
        var messageHTML = `
          <div>
            <strong>${message.author}</strong> - ${message.time}
            <p style="color: rgba(97, 4, 97, 1);font-size: 30px;">${message.text}</p>
            <!--此处可以选择是否显示“删除留言”之开关--><!--<button class="button" onclick="deleteMessage(${index})">删除该留言</button>-->
          </div>`;
        messageList.innerHTML += messageHTML;
      });
    }*/

    function saveMessages() {
      localStorage.setItem('messages', JSON.stringify(messages));
    }

    function postMessage() {
      var messageText = document.getElementById('message').value;
      var anonymousName = document.getElementById('anonymous-name').value;

      var messageAuthor = anonymousName ? anonymousName : '匿名访客';
      var now = new Date();
      var messageTime = now.toLocaleString();

      var newMessage = {
        author: messageAuthor,
        time: messageTime,
        text: messageText,
      };

      messages.push(newMessage);

      saveMessages();
      loadMessages();

      document.getElementById('message').value = '';
      document.getElementById('anonymous-name').value = '';
      document.getElementById('anonymous-options').style.display = 'none';

      showNotification(true);
    }

    function deleteMessage(index) {
      messages.splice(index, 1);
      saveMessages();
      loadMessages();
    }

    function showNotification(success) {
      var notification = document.getElementById('notification');
      notification.textContent = success ? '发布成功！' : '发布失败，请检查网络！';
      notification.style.opacity = 1;

      setTimeout(function () {
        notification.style.opacity = 0;
      }, 3000);
    }

    var anonymousOptionsVisible = false;

    document.getElementById('anonymous-toggle').addEventListener('click', function () {
      anonymousOptionsVisible = !anonymousOptionsVisible;
      document.getElementById('anonymous-options').style.display = anonymousOptionsVisible ? 'block' : '';
    });

    document.getElementById('anonymous-publish').addEventListener('click', function () {
      document.getElementById('anonymous-options').style.display = 'none';
    });

      /* 设置留言时间格式 */
  // 格式化时间函数
function formatMessageTime(timeString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const formattedTime = new Date(timeString).toLocaleString('en-US', options);
  return formattedTime.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$3年$1月$2日 $4:$5:$6');
}

// 修改加载留言的函数，调用 formatMessageTime 函数
function loadMessages() {
  var messageList = document.getElementById('message-list');
  messageList.innerHTML = '';

  messages.forEach(function (message, index) {
    var messageHTML = `
      <div class="message">
        <strong class="message-author">${message.author} </strong>
        <span class="message-time">${formatMessageTime(message.time)}</span>
        <p class="message-text">${message.text}</p>
        <!--此处可以选择是否显示“删除留言”之开关--><!--<button class="button" onclick="deleteMessage(${index})">删除该留言</button>-->
      </div>`;
    messageList.innerHTML += messageHTML;
  });
}

    /* 插入emoji */

    // 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
  var emojiButton = document.getElementById('emojiButton');
  var emojiList = document.getElementById('emojiList');
  var messageInput = document.getElementById('message');

  // 当点击表情按钮时，显示或隐藏 emoji 列表，并将光标定位到文字末尾
  emojiButton.addEventListener('click', function (event) {
    event.stopPropagation();
    emojiList.style.display = emojiList.style.display === 'none' ? 'block' : 'none';
    messageInput.focus();
    messageInput.setSelectionRange(messageInput.value.length, messageInput.value.length);
  });

  // 在 emoji 列表中点击时插入 emoji 并保持光标在插入的 emoji 后面
  emojiList.addEventListener('click', function (event) {
    if (event.target.classList.contains('emoji')) {
      insertEmoji(event.target.textContent);
      messageInput.focus();
      event.stopPropagation();
    }
  });

  // 在留言输入框和 emoji 列表中点击时不隐藏 emoji 列表
  messageInput.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  emojiList.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  // 在页面其他地方点击时隐藏 emoji 列表
  document.addEventListener('click', function () {
    emojiList.style.display = 'none';
  });

  // 插入 emoji 到留言输入框中的光标位置
  function insertEmoji(emoji) {
    const cursorPos = messageInput.selectionStart;

    if (typeof cursorPos === 'number') {
      const textBefore = messageInput.value.substring(0, cursorPos);
      const textAfter = messageInput.value.substring(cursorPos);

      messageInput.value = textBefore + emoji + textAfter;

      // 更新光标位置，确保光标位于插入的 emoji 后面
      messageInput.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
    } else {
      messageInput.value += emoji;
      messageInput.setSelectionRange(messageInput.value.length, messageInput.value.length);
    }
  }
});

    loadMessages(); // 加载留言列表