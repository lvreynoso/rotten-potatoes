// scripts.js

// listen for a form submit event
document.getElementById("newComment").addEventListener("submit", e => {
    console.log("WE'VE BEEN PRESSED, LADIES!");
    // prevent the default behavior
    e.preventDefault();
    // serialize the form data into an object
    let comment = this.serializeArray()
    console.log(comment);
    console.log(this);
    // use axios to initialize a post request and send in the form data
    axios.post('/comments', comment).then(function (response) {
        // wait for the success response from the server
        console.log(response);
        // remove the information from the form
        this.reset();
        // display the data as a new comment on the page
        document.getElementById('comments').prepend(
            `
           <div class="card">
             <div class="card-block">
               <h4 class="card-title">${response.title}</h4>
               <p class="card-text">${response.content}</p>
               <p>
                  <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
                    <button class="btn btn-link" type="submit">Delete</button>
                  </form>
               </p>
             </div>
           </div>
          `
      );
    }).catch(function (error) {
        console.log(error);
        // handle errors the simple and annoying way
        alert("There was a problem saving your comment. Please try again.")
    })
})
