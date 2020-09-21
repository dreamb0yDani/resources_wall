/*
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
*/
//this helper loops through an array of reviews from database
const renderReviews = (reviewsArray) => {

  for (let review of reviewsArray) {

    $('#resource-reviews').append(createReviewElement(review));
  }
};
$(document).ready(() => {

  const loadReviews = function() {

    $.ajax({
      url: '/resources',
      method:"GET",
      success: (response) => {
        $('form').trigger('reset');
        $('#resource-reviews').empty();
        renderTweets(response);
      }
    });
  };
  //GET right after definition to load initial tweets;
  loadReviews();

  $('#submit-review').on('submit', function(evt) {
    //form-validation here:
    //const userInput = $('textArea').val();
    //$('.error').slideUp();
      evt.preventDefault();
      //serialize value of form because server is set to receive query string
      const  userReview = $(this).serialize();

      $.ajax({
        url: '/resources/:id/reviews',
        method: 'POST',
        dataType: 'text',
        data: userReview,
        success: loadReviews
      });
    })
  });

