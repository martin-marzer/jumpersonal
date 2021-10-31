window.addEventListener("load", () => {
    // dependiendo q dispositivo se corre x funcion
  let width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
  
  //esto es para mostrar en los dispositivos moviles el sidenav de los filtros
  if (width <= 992 ) {
    $('.btn').click(function(){
      $(".sidenav-filter").addClass("open-filter");
      $('body').css('overflow', 'hidden');
    });
    $('.closebtn-filter').click(function(){
      $(".sidenav-filter").removeClass("open-filter");
      $('body').css('overflow', 'auto');
    });
    
  
  }
  
  
  // esto es la logica de lo q sucede con los filtros

})


  


  

  
  
  

  
  
  
  
  
  
  