// Tính năng phát nhạc
const aPlayer = document.querySelector("#aplayer")
if(aPlayer){
  const dataSong = JSON.parse(aPlayer.getAttribute("data-song"))
  const singerName = aPlayer.getAttribute("data-singer")
  const rollingAvatar = document.querySelector(".inner-play .inner-avatar")
  const listenNumber = document.querySelector(".inner-actions .inner-listen span")

  const ap = new APlayer({
    container: aPlayer,
    lrcType: 1,
    audio: [{
        name: dataSong.title,
        artist: singerName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics
    }],
    autoplay: true
  });

  ap.on("play", () => {
    rollingAvatar.style.animationPlayState = "running"
  })

  ap.on("pause", () => {
    rollingAvatar.style.animationPlayState = "paused"
  })

  ap.on("ended", () => {
    fetch(`/songs/listen/${dataSong._id}`, {
      method: "PATCH"
    })
      .then(res => res.json())
      .then(data => {
        listenNumber.innerHTML = data.listen
      })
  })
}
// Hết Tính năng phát nhạc

// Tính năng like
const likeButton = document.querySelector(".inner-actions .inner-like")
if(likeButton){
  likeButton.addEventListener("click", () => {
    const songId = likeButton.getAttribute("button-like")
    let status = ""

    if(likeButton.classList.contains("active")){
      likeButton.classList.remove("active")
      status = "decrease"
    }
    else{
      likeButton.classList.add("active")
      status = "increase"
    }

    const fullData = {
      songId: songId,
      status: status
    }

    fetch("/songs/like", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fullData)
    })
    .then(res => res.json())
    .then(data => {
      const numberLike = likeButton.querySelector("span")
      if(numberLike){
        numberLike.innerHTML = data.like
      }
    })
  })
}
// Hết Tính năng like

// Tính năng yêu thích bài hát
const buttonFavorite = document.querySelectorAll("[button-favorite]")

if(buttonFavorite.length > 0){
  buttonFavorite.forEach(button => {
    button.addEventListener("click", () => {
      const songId = button.getAttribute("button-favorite")
      
      button.classList.toggle("active")

      fetch("/songs/favorite", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          songId: songId
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    })
  })
  
}
// Hết tính năng yêu thích bài hát

// Tính năng suggest khi tìm kiếm
const inputBox = document.querySelector(`.box-search input[name="keyword"]`)
if(inputBox){
  inputBox.addEventListener("keyup", () => {
    const value = inputBox.value
    
    fetch(`/songs/search/suggest?keyword=${value}`)
      .then(res => res.json())
      .then(data => {
        if(data.code == "success"){
          const innerSuggest = document.querySelector(".box-search .inner-suggest")
          const innerList = document.querySelector(".box-search .inner-list")
          if(data.songs.length > 0){
            const htmls = data.songs.map(item => {
              return `
                <a class="inner-item" href="/songs/detail/${item.slug}">
                <div class="inner-image">
                  <img src="${item.avatar}">
                </div>
                <div class="inner-info">
                  <div class="inner-title">${item.title}</div>
                  <div class="inner-singer">
                    <i class="fa-solid fa-microphone-lines"></i> ${item.singerFullName}
                  </div>
                </div>
              </a>
              `
            })
            innerSuggest.classList.add("show")
            innerList.innerHTML = htmls.join("")
          }
          else{
            innerSuggest.classList.remove("show")
            innerList.innerHTML = ""
          }
        }
      })
  })
}
// Hết tính năng suggest khi tìm kiếm