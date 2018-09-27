// scripts.js

// document.getElementById('id') seems to only return one element,
// so only the top static comment gets a working delete link. MUSTFIX

// i pity the poor coders lost due to the broken tutorial

// get the current movieId and reviewId
let currentUrl = new URL(window.location.href);
let currentPath = currentUrl.pathname.split('/');
let movieId = currentPath[2];
let reviewId = currentPath[4];

window.onload = function() {
    // listen for a form submit event
    if (document.getElementById("newComment") != null) {
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
                                <button class="deleteComment btn btn-link" data-comment-id=${response.data.comment._id}>Delete</button>
                                </p>
                            </div>
                        </div>
                    `
                    );
                    deleteCommentLogic();
                })
                .catch(function(error) {
                    console.log(error);
                    // handle any errors
                    alert('There was a problem saving your comment. Please try again.')
                });
        });
    }

    deleteCommentLogic();
    deleteReviewLogic();
}

function deleteCommentLogic() {
    if (document.getElementsByClassName("deleteComment") != null) {
        for (var i = 0; i < document.getElementsByClassName("deleteComment").length; i++) {
            document.getElementsByClassName("deleteComment")[i].addEventListener('click', (e) => {
                let commentId = e.target.getAttribute('data-comment-id');
                axios.delete(`/movies/${movieId}/reviews/${reviewId}/comments/${commentId}`)
                    .then(response => {
                        elementToErase = e.target.parentNode.parentNode;
                        elementToErase.parentNode.removeChild(elementToErase); // OR comment.style.display = 'none';
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
        }
    }
}

function deleteReviewLogic() {
    if (document.getElementsByClassName('deleteReview') != null) {
        for (var i = 0; i < document.getElementsByClassName('deleteReview').length; i++) {
            document.getElementsByClassName('deleteReview')[i].addEventListener('click', (e) => {
                let passedReviewId = e.target.getAttribute('data-review-id');
                axios.delete(`/admin/delete/${passedReviewId}`)
                    .then(response => {
                        elementToErase = e.target.parentNode.parentNode;
                        elementToErase.parentNode.removeChild(elementToErase);
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
        }
    }
}
