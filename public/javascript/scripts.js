// scripts.js

// get the current movieId and reviewId
let currentUrl = new URL(window.location.href);
let currentPath = currentUrl.pathname.split('/');
let movieId = currentPath[2];
let reviewId = currentPath[4];

window.onload = function() {
    // listen for a form submit event
    document.getElementById("newComment").addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();
        // serialize the form data into an object
        let comment = $(document.getElementById("newComment")).serializeArray()
        console.log(comment);
        // use axios to initialize a post request and send in the form data
        axios.post(`/movies/${movieId}/reviews/${reviewId}/comments`, comment)
            .then(function(response) {
                // wait for the success response from the server
                console.log(response);
                // remove the information from the form
                document.getElementById("newComment").reset();
                // display the data as a new comment on the page
                $(document.getElementById("comments")).prepend(
                    `
                        <div class="card" id="${response.data.comment._id}">
                            <div class="card-block">
                                <h4 class="card-title">${response.data.comment.title}</h4>
                                <p class="card-text">${response.data.comment.content}</p>
                                <p>
                                <button class="btn btn-link" id="deleteComment" data-comment-id=${response.data.comment._id}>Delete</button>
                                </p>
                            </div>
                        </div>
                    `
                );
                addDeleteLogic();
            })
            .catch(function(error) {
                console.log(error);
                // handle any errors
                alert('There was a problem saving your comment. Please try again.')
            });
    });

    addDeleteLogic();
}

function addDeleteLogic() {
    document.getElementById('deleteComment').addEventListener('click', (e) => {
        console.log("click!")
        let commentId = document.getElementById('deleteComment').getAttribute('data-comment-id');
        axios.delete(`/movies/${movieId}/reviews/${reviewId}/comments/${commentId}`)
            .then(response => {
                console.log(response)
                comment = document.getElementById(commentId)
                comment.parentNode.removeChild(comment); // OR comment.style.display = 'none';
            })
            .catch(error => {
                console.log(error)
            });
    })
}
