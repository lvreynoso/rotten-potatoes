// scripts.js

// listen for a form submit event
document.getElementById("newComment").addEventListener("submit", e => {
    // prevent the default form behavior
    e.preventDefault();
    // serialize the form data into an object
    let comment = this.serializeArray()
    // use axios to initialize a post request and send in the form data


    axios.post('/user', comment)
      .then(function (response) {
        // wait for the success response from the server
        console.log(response);
        // remove the information from the form
        // display the data as a new comment on the page
      })
      .catch(function (error) {
        console.log(error);
        // handle any errors
        alert('There was a problem saving your comment. Please try again.')
      });
});
