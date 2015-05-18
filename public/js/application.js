$(document).ready(function() {
  var hideCreateButton = function() {
    $(".create_note").hide();
  };

  var showCreateButton = function() {
    $(".create_note").show();
  };

  var clearContentArea = function() {
    $(".content_area").empty();
  };
  // event handler to add form to page
  $(".create_note").on("submit", function(event){
    event.preventDefault();
    // console.log("button clicked");
    var url = $(this).attr("action")
    $.ajax({
      url: url,
    })
    .done(function(response){
      console.log("success " + response)
      // hide link
      hideCreateButton();
      // append form
      $(".content_area").append(response);
    })
    .fail(console.log("Error"));
  })


  // event handler to delegate form submission
  $(".content_area").on("submit", ".new_note_form", function(event){
    event.preventDefault();
    // console.log("form submit button clicked");
    var note = $(this).serialize();
    var url = $(this).attr('action');
    var type = "POST";
    // console.log(note);
    // console.log(url);
    $.ajax({
      url: url,
      type: type,
      data: note,
    })
    .done(function(response){
      // Add note to the list
      console.log("success " + response);
      $(".notes_list").prepend(response);
      // remove the form
      // debugger
      $(".content_area").children().first().remove();
      $(".cancel_new_form").remove();
      // show the button
      showCreateButton();
    })
    .fail(console.log("Error"));
  })

  $(".content_area").on("submit",".cancel_new_form", function(event){
    event.preventDefault();
    console.log("cancel new form button clicked");
    $(".new_note_form").remove();
    $(".cancel_new_form").remove();
    $(".create_note").show();
  })

  // implement show note section in content area when a note clicked
  // add eventlistener to list of notes
  $(".notes_list").on("click", "a", function(event){
    event.preventDefault();
    var url = $(this).attr("href");
    // console.log(url);
    // retrieve note content
    $.ajax({
      url: url,
    })
    .done(function(response){
      console.log("success " + response);
      // append to content area
      $(".content_area").append(response);
    })
    .fail(console.log("Error"))
  })

  // add event listeners to show edit form button
  $(".content_area").on("click", ".edit_note_link", function(event){
    event.preventDefault();
    // console.log("edit button clicked");
    var url = $(this).attr("href");
    // console.log(url);
    $.ajax({
      url: url,
    })
    .done(function(response){
      console.log("success " + response);
      // remove note show from content area
      $(".note_show").remove();
      // append edit form to content area
      $(".content_area").append(response);
    })
  })

  // add event listener to edit form submit button
  $(".content_area").on("submit", ".edit_note", function(event){
    event.preventDefault();
    // console.log("edit form submit clicked");
    // console.log(this);
    var url = $(this).attr("action");
    var method = "put";
    var updatedNote = $(this).serialize();
    $.ajax({
      url: url,
      type: method,
      data: updatedNote,
    })
    .done(function(response){
      console.log("success " + response);
      // find note in DOM
      var noteId = $(response).attr("data-note_id");
      // console.log(noteId);
      // delete form
      // debugger
      $(".edit_note").remove();
      // update existing note instance
      $("[data-note_id=" + noteId + "]").remove();
      // prepend updated note to DOM
      $(".notes_list").prepend(response);
    })
  })

  // add event listener to delete link
  // append confirm delete message with confirm and cancel buttons
  $(".content_area").on("click", ".delete_note_link", function(event){
    event.preventDefault();
    console.log("delete event link clicked");
    // console.log(this);
    var url = $(this).attr("href");
    // console.log(url);
    $.ajax({
      url: url,
    })
    .done(function(response){
      console.log("success " + response)
      // remove note from content div
      $(".note_show").remove();
      // append delete confirmation form to div
      $(".content_area").append(response);
    })
    .fail(console.log("Error"));
  })
  // confirm delete button
  $(".content_area").on("submit", ".confirm_delete", function(event){
    event.preventDefault();
    console.log("delete confirm clicked");
    // console.log(this);
    var url = $(this).attr("action");
    var noteId = $(".delete_confirmation").attr("data-note_id");
    // console.log(url);
    // console.log(noteId);
    var method = "delete";
    $.ajax({
      url: url,
      type: method,
    })
    .done(function(response){
      console.log("Success " + response);
      // console.log(url);
      // console.log(noteId);
      $("[data-note_id=" + noteId + "]").remove();
    })
    .fail(console.log("Error"));
  })

  // cancel delete link


});


