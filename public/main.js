$(".delete").click(function(){
    console.log("delete button clicked");
    var name = $(this).attr("name");
    
    fetch(`Kayaks/Kayaks_name:${name}`, {
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
