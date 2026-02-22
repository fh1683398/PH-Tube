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
    categories.forEach( category => {
        const button = document.createElement('button')
        button.innerText = category.category
        button.classList = 'bg-gray-400 text-white px-5 py-3 rounded-lg'
        
        document.getElementById('button-container').appendChild(button)
    })
}

// load Videos
const loadVideos = () => {
    fetch(videosUrl)
    .then(res => res.json())
    .then(data => showVideos(data.videos))
    .catch(error => console.log(error))
}
const showVideos = (videos) => {
    videos.forEach(video =>{
        const div = document.createElement('div')
        div.innerHTML = `
            <div>
                <img class="w-full h-[200px] object-cover rounded-lg" src="${video.thumbnail}" />
            </div>
            <div class="flex gap-4 mt-5">
                <div>
                    <img class="w-10 h-10 object-cover rounded-full" src="${video.authors[0].profile_picture}"/>
                </div>
                <div>
                    <h4 class="font-bold text-gray-800">${video.title}</h4>
                    <p class="text-gray-500">${video.authors[0].profile_name}</p>
                    <p class="text-gray-500">${video.others.views}</p>
                </div>
            </div>
        `
        document.getElementById('video-container').append(div)
    })
}

loadCategory()
loadVideos()