const categoryUrl = 'https://openapi.programming-hero.com/api/phero-tube/categories'
const videosUrl = 'https://openapi.programming-hero.com/api/phero-tube/videos'

// load Category
const loadCategory = () => {
    fetch(categoryUrl)
        .then(res => res.json())
        .then(data => showCategories(data.categories))
        .catch(error => console.log(error))
}
const showCategories = (categories) => {
    categories.forEach(category => {
        // console.log(categories)
        const button = document.createElement('button')
        button.innerText = category.category;
        button.onclick = () => loadCategoryVideos(category.category_id)
        button.classList = 'bg-gray-400 text-white px-5 py-3 rounded-lg'

        document.getElementById('button-container').appendChild(button)
    })
}

//load videos based on given category
const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => showVideos(data.category))
}
// load Videos
const loadVideos = () => {
    fetch(videosUrl)
        .then(res => res.json())
        .then(data => showVideos(data.videos))
        .catch(error => console.log(error))
}
const showVideos = (videos) => {
    const videoContainer = document.getElementById('video-container')
    document.getElementById('video-container').innerHTML = ""

    if(videos.length === 0){
        videoContainer.classList.remove('grid')
        document.getElementById('video-container').innerHTML = `
            <div class="flex flex-col items-center justify-center h-[calc(100vh-270px)]">
                <img src="assets/Icon.png" />
                <h2>No content here</h2>
            </div>
        `
    }else{
        videoContainer.classList.add('grid')
    }
    videos.forEach(video => {
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="relative">
                <img class="w-full h-[300px] md:h-[200px] object-cover rounded-lg" src="${video.thumbnail}" />
                ${video.others.posted_date.length === 0 ? "" : `<p class="absolute right-2 bottom-2 bg-black text-white text-xs px-2 py-1 rounded-md">${convertTime(video.others.posted_date)}</p>`
            }
                
            </div>

            <div class="flex gap-4 mt-5">
                <div>
                    <img class="w-10 h-10 object-cover rounded-full" src="${video.authors[0].profile_picture}"/>
                </div>
                <div>
                    <h4 class="font-bold text-gray-800">${video.title}</h4>
                    <div class="flex gap-2">
                        <p class="text-gray-500 text-sm">${video.authors[0].profile_name}</p>
                        
                        ${video.authors[0].verified === true ? '<img class="w-5 h-5" src="./assets/verify.png" />' : ""}
                    </div>
                    <p class="text-gray-500 text-sm">${video.others.views}</p>
                </div>
            </div>
        `
        document.getElementById('video-container').append(div)
    })
}


//time converting function
const convertTime = (time) => {
    let day = ""
    let hour = ""
    let minute = ""

    if(time > 86400){
        day = Math.floor(time / 86400)
    }
    let remainingSecond = time % 86400

    if (time > 3600) {
        hour = parseInt(remainingSecond / 3600)
    }
    remainingSecond = time % 3600

    if (time > 60) {
        minute = parseInt(remainingSecond / 60)
    }
    remainingSecond = remainingSecond % 60

    return [
        day > 0 ? `${day}d` : "", 
        hour > 0 ? `${hour}h` : "",
        minute > 0 ? `${minute}m` : 0,
        remainingSecond > 0 ? `${remainingSecond}s` : ""
    ].join(" ")
}

loadCategory()
loadVideos()