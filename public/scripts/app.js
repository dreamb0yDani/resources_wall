const renderContent = (contents) => {
  $("#content-container").empty();
  for (const element of contents) {
    // console.log(conteelement)
    $("#content-container").prepend(createContentElement(element))
  }
}

const createContentElement = content => {
  let $content = `
  <article class="content">
        <header>
          <h2><a href="/resources/<%= resource.id %>"">${content.title}</a></h2>
          <img src=${content.image_url}>
          <p>${content.description}</p>
        </header>
      </article>`

  return $content
}

const renderReviews = (reviewsList) => {

  //$("#past-reviews-container").empty();

  for (const reviewObj of reviewsList) {
    $("#past-reviews-container").append(createReviewElement(reviewObj));
  }

}

const createReviewElement = review => {

  if (review.liked) {
    let $review = `
    <article class="single-review">

      <div class="single-review-component">user ${review.user_id} says</div>
      <div class="single-review-component single-review-comment"><p>${review.comment}</p></div>
      <div class="single-review-component">user ${review.user_id} liked your resource!</div>
      <div class="single-review-component">${review.rating}</div>

    </article>
    `
    return $review;

  } else {

    let $review = `
    <article class="single-review">

      <div class="single-review-component">user ${review.user_id} says</div>
      <div class="single-review-component single-review-comment"><p>${review.comment}</p></div>
      <div class="single-review-component"></div>
      <div class="single-review-component">${review.rating}</div>

    </article>
    `
    return $review;

  }

}

const loadReviews = function(id) {

  $.ajax({
    url: `/api/resources/${id}/reviews`,
    method: 'GET',
    dataType: 'JSON',
    //data: {id: req.params.id}
  })
  .then(result => {
    console.log('inside loadReviews. then')
    $("#past-reviews-container").empty();
    renderReviews(result)})
    .catch(err => console.log(err.message))
}



$(document).ready(() => {
  console.log('Ready')

  $(() => {
    const searchBox = $("input[type='search']")
    searchBox.on("keypress", (e) => {
      if (e.which === 13) {
        const searchQuery = searchBox.val();

        //if we are doing the search query on backend

        $.ajax({
          url: `/api/resources/?search=${searchQuery}`,
          method: 'GET',
          dataType: 'JSON'
        })
          .then(result => renderContent(result))
          .catch(err => console.log(err.message))
      }
    })
  })



  //loadReviews();

  /*
  $(window).scroll(function() {

    $.fn.scrollBottom = function() {
      return $(document).height() - this.scrollTop() - this.height();
    };

    if($(window).scrollBottom() == $(document).height() - $(window).height()) {

      $.ajax({
        url: `/resources/:id/reviews`,
        method: 'GET',
        dataType: 'JSON'
      })
      .then(result => renderReviews(result))
      .catch(err => console.log(err.message))
    }
    */
  })




