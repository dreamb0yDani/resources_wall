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
          <embed src=${content.url} type="text/html">
          <p>${content.description}</p>
        </header>
      </article>`

  return $content
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
})
