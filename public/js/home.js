document.addEventListener( 'DOMContentLoaded', function () {
    new Splide( '.splide', {
        type   : 'loop',
        perPage: 3,
        perMove: 1,
        width: 1000,
        pagination: false,
        focus    : 0,
        fixedWidth: '20rem',
        classes: {
            arrow : 'splide__arrow arrow-splide',
            prev  : 'splide__arrow--prev arrow-splide-prev',
            next  : 'splide__arrow--next arrow-splide-next',
        },
	} ).mount();
} );

const width  = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
if (width < 768) {
    console.log(width)
    let img = document.getElementById("img-fila")
    let giftcard = document.getElementsByClassName("gifcard-container")[0]
    img.src = "images/contenido-pagina/slider-fila-mobile.jpg"
    giftcard.firstElementChild.src = "images/contenido-pagina/pumastyle_Giftcards.jpg"
}
