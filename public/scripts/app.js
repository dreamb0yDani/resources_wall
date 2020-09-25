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
          <h2><a href="/resources/${content.id}">${content.title}</a></h2>
          <img src=${content.image_url}>
          <p>${content.description}</p>
        </header>
      </article>`

  return $content
}

const renderReviews = (reviewsList) => {

  //$("#past-reviews-container").empty();

  for (const reviewObj of reviewsList) {
    if (reviewObj.comment) {
      $("#past-reviews-container").append(createReviewElement(reviewObj));
    }
  }

}

const createReviewElement = review => {

  if (review.liked) {
    let $review = `
    <article class="single-review">

      <div class="single-review-component">user ${review.user_id} says:</div>
      <div class="single-review-component single-review-comment"><p>${review.comment}</p></div>
      <div class="single-review-component"><p>user ${review.user_id} liked your resource!</p></div>
      <div class="single-review-component"><p>rating: ${review.rating}</p></div>

    </article>
    `
    return $review;

  } else {

    let $review = `
    <article class="single-review">

      <div class="single-review-component">user ${review.user_id} says:</div>
      <div class="single-review-component single-review-comment"><p>${review.comment}</p></div>
      <div class="single-review-component"><p></p></div>
      <div class="single-review-component"><p>rating: ${review.rating}</p></div>

    </article>
    `
    return $review;

  }

}

const loadReviews = function (id) {

  $.ajax({
    url: `/api/resources/${id}/reviews`,
    method: 'GET',
    dataType: 'JSON',
    //data: {id: req.params.id}
  })
    .then(result => {
      $("#past-reviews-container").empty();
      renderReviews(result)
    })
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

  const inputVal = $("input[name='rating-value']");
  const input = document.getElementById("like");

  $("#like").on("click", function () {
    if (inputVal.val() === String(false)) {
      inputVal.val("true");
      input.innerText = "Unlike"
    } else {
      inputVal.val("false");
      input.innerText = "Like"
    }
    $("review-contents").submit()
  });

})
/*
const loadReviews = function (id) {

  $.ajax({
    url: `/api/resources/${id}/reviews`,
    method: 'GET',
    dataType: 'JSON',
    //data: {id: req.params.id}
  })
    .then(result => {
      $("#past-reviews-container").empty();
      renderReviews(result)
    })
    .catch(err => console.log(err.message))
}
*/


const renderLikedResources = (likedResourcesList) => {

  //$("#past-reviews-container").empty();

  for (const likedResourceObj of reviewsList) {

      $("#my-liked-resources-container").append(createLikedResourceElement(likedResourceObj));

  }

}

const createLikedResourceElement = likedResource => {

  if (likedResource.liked) {
    let $likedResource = `
      <a href="/resources/<%= resource.id %>" class="single-liked-resource">
                <div class='resource-title'><%= resource.title %></div>
                <!-- <div class='resource-url'><%= resource.url %></div> -->
                <div class='resource-description'><%= resource.description %></div>
      </a>
    `
    return $likedResource

  /*}
  else {

    let $review = `
    <article class="single-review">

      <div class="single-review-component">user ${review.user_id} says:</div>
      <div class="single-review-component single-review-comment"><p>${review.comment}</p></div>
      <div class="single-review-component"><p></p></div>
      <div class="single-review-component"><p>rating: ${review.rating}</p></div>

    </article>
    `
    return $review;
    */

  }

}
