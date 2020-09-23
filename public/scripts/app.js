// const renderContent = (contents) => {
//   console.log(contents.resources)
//   for (const element of contents.resources) {
//     // console.log(conteelement)
//     $("#content-container").prepend(createContentElement(element))
//   }
// }

// const createContentElement = content => {
//   let $content = `
//   <article class="content">
//         <header>
//           <h2>${content.title}</h2>
//           <embed src=${content.url} type="text/html">
//           <p>${content.description}</p>
//         </header>
//       </article>`

//   return $content
// }

$(document).ready(() => {
  console.log('Ready')
  //   // $(() => {
  //   // $.ajax({
  //   //   method: "GET",  <script type="text/javascript" src="/scripts/app.js"></script>
  //   //   url: "/r",
  //   //   dataType: "JSON"
  //   // }).done((users) => {
  //   //   for (user of users) {
  //   //     $("<div>").text(user.name).appendTo($("body"));
  //   //   }
  //   // });;
  //   // });
  //   const loadContents = () => {
  //     $.ajax("/api/resources", { method: "GET", dataType: "JSON" })
  //       .then(dataReceived => {
  //         // console.log(dataReceived[0])
  //         renderContent(dataReceived)
  //       })
  //   }

  //   loadContents();
})
