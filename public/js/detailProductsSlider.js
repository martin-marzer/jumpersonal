document.addEventListener( 'DOMContentLoaded', function () {
	new Splide( '#image-slider', {
    'rewind': true,
		'cover'      : true,
		'heightRatio': "0.7",
    'pagination': false,
    classes: {
      arrows: 'splide__arrows your-class-arrows',
      arrow : 'splide__arrow your-class-arrow',
      prev  : 'splide__arrow--prev your-class-prev',
      next  : 'splide__arrow--next your-class-next',
    }
	} ).mount();
} );
//pues aqui se especifica como se quiere el slider del detalle, pues use splidejs para hacerlo :P




