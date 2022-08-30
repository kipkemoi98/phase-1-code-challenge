// write your code here
let imageCard;
function fetch(path=1){
    url = `http://localhost:3000`;
    fetch(url).then(resp => resp.json()).then(data => likingCommentingAndLoad(data))
    .catch(err => console.log(`Error: ${err}`))
}
function likingCommentingAndLoad(imageCard){
    document.querySelector('#card-image').src = imageCard.image
    document.querySelector('#card-title').textContent = imageCard.title
    document.querySelector('#like-count').textContent = `${imageCard.likes} likes`
        while(document.querySelector('#comments-list').hasChildNodes()){
        document.querySelector('#comments-list').removeChild(document.querySelector('#comments-list').lastChild)
    }
    imageCard.comments.forEach(comment => {
        let form = document.createElement('li')
        form.textContent = comment.content
        document.querySelector('#comments-list').appendChild(form)
    })

    document.querySelector('#like-button').addEventListener('click', (e) => {
        imageCard.likes += 1;
        document.querySelector('#like-count').textContent = `${imageCard.likes} Likes`
    })
    document.querySelector('#comment-form').addEventListener('submit', (e) => {
        const commentInput = document.querySelector('#comment')
        e.preventDefault()
        let form = document.createElement('li')
        form.textContent = document.querySelector('#comment').value;
        document.querySelector('#comments-list').appendChild(form)
        const newComment = {
            id: imageCard.comments.length+1,
            imageId: 1,
            content: document.querySelector('#comment').value
        }
        imageCard.comments.push(newComment)
        fetch('http://localhost:3000', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(card)
        }).then(resp => resp.json()).catch(err => console.log(`Error: ${err}`))
        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newComment)
        }).then(resp => resp.json()).then(data => console.log(data)).catch(err => console.log(`Error: ${err}`))
        
        document.querySelector('#comment-form').reset()
    });

}
function init(){
    fetchData()  
};
init()
