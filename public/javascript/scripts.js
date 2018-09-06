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
                        <div class="card">
                            <div class="card-block">
                                <h4 class="card-title">${response.data.comment.title}</h4>
                                <p class="card-text">${response.data.comment.content}</p>
                                <p>
                                <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
                                    <button class="btn btn-link" type="submit">Delete</button>
                                    </form>
                                </p>
                            </div>
                        </div>
                    `
                );
            })
            .catch(function(error) {
                console.log(error);
                // handle any errors
                alert('There was a problem saving your comment. Please try again.')
            });
    });

}
