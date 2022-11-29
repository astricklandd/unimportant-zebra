$(".delete").click(function(){
    console.log("delete button clicked");
    var name = $(this).attr("_id");
    
    fetch(`Renters/renters_id:${name}`, {
      method:"delete",
      headers: {'Content-Type': 'applications/json'}
    })
  
  })
  
  $(".update").click(function(){
    console.log("update button clicked");
    var name = $(this).attr("name");
  
    fetch(`Kayaks/Kayaks_name:${name}`, {
      method: "put",
      header: {'Content-Type': 'applications/json'}
    })
  
  })

  $('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});
