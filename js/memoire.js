//  AFFICHAGE POPUP CARTO -----------------------------------------------------------------------------

$('.index-button').magnificPopup({
  type:'inline',
  mainClass:'table',
  midClick: true
});

var magnificPopup = $.magnificPopup.instance;
$('.white-popup a').click( function () {
  magnificPopup.close();
});

// SLIDESHOW https://www.w3schools.com/howto/howto_js_slideshow.asp ------------------------------------------------------

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


// SYSTEME D'ONGLETS -----------------------------------------------------------------------------------------------------
    var onglets = document.querySelectorAll('.main .menu .lien-menu')
    for(var i=0; i<onglets.length; i++){
        onglets[i].addEventListener('click', function(){
            var div = this.parentNode.parentNode.parentNode.parentNode
            var li = this.parentNode

            //si l'onglet est déjà actif : ne rien faire
            if(div.classList.contains('active')){
                return false
            }
            //onglets principaux
            div.querySelector('nav .menu .active').classList.remove('active')
            li.classList.add('active')
            //contenu associé
            div.querySelector('.main .contenu .inactive.active').classList.remove('active')
            div.querySelector(this.getAttribute("href")).classList.add('active')
            //onglets secondaires
            div.querySelector('.main .menu .sous-menu.sm-active').classList.remove('sm-active')
            this.parentNode.querySelector('.sous-menu').classList.add('sm-active')

        })
    }
//NOTES DE BAS DE PAGE -------------------------------------------------------------------------------------
    // Options de l'API
    var options1 = {
        root: document.querySelector('#scrollArea'),
        rootMargin: '-30% 0% -30% 0%',
        threshold: 0.9
    }

    function computeLastBottomNBP(){
        allNBPActives = getAllNBPActives()
        rects = Array.from(allNBPActives)
        if (rects.length > 0){
            tempBottom = rects[rects.length-1].getBoundingClientRect()['top'] + 1
        }
    }

    function getLastNBPActive(){
        return document.querySelector(".main .contenu .nbp-active")
    }

    function getAllNBPActives(){
        return document.querySelectorAll(".main .contenu .nbp-active")
    }

    function gestionPlacementActives(entry){
        var id = entry.target.getAttribute('id')
        var anchor = document.getElementById(id+'bis')
        anchor_rect = anchor.getBoundingClientRect()
        actives = getAllNBPActives()

        ids = Array.from(actives).map(element => element.id)

        if (ids.length == 0){
            anchor.style.bottom = ''
            tempBottom = anchor_rect['bottom'] + 1
        } else {
            first_id = ids[0].substring(0,2)
            if (parseInt(first_id) < parseInt(id)){
                anchor.style.bottom = tempBottom + 'px'
                tempBottom = tempBottom + anchor_rect['height'] + 1
            } else {
                anchor.style.bottom = ''
                tempBottom = anchor_rect['height'] + 1
                actives.forEach(function(element){
                    element.style.bottom = tempBottom + 'px'
                    tempBottom = tempBottom + 1 + element.getBoundingClientRect()['height']
                })
            }
        }
    }




    // Fonction à effectuer à l'apparition dans l'espace de scroll
    var apparitionNbp = function(entries){
        entries.forEach(function (entry){
            var id = entry.target.getAttribute('id')
            var anchor = document.getElementById(id+'bis')
            //si le ratio de la note est supérieur à 0.9
            if(entry.intersectionRatio > 0.9){
                gestionPlacementActives(entry)
                anchor.classList.add('nbp-active')
            } else{
                //Disparition du texte
                anchor.classList.remove('nbp-active')
                computeLastBottomNBP()
                }
        })
    }

    // Définition de l'API
    var tempBottom
    const observerNbp = new IntersectionObserver(apparitionNbp, options1)
    //observer toutes les notes de bas de page dans le texte avec .nbp-main
    var nbps = document.querySelectorAll('.main .contenu .nbp-main')
    nbps.forEach(function (nbp){
        observerNbp.observe(nbp)
    })

// Colorier les chiffres en orange
var chiffreNdbp = document.querySelectorAll('.main .contenu .nbp-second')
chiffreNdbp.forEach(function(entry){
    var chiffreNb = entry.innerHTML.split(' ')[0]
    entry.innerHTML = entry.innerHTML.replace(chiffreNb, "<span class='chiffreNbp'>" + chiffreNb + "</span>")

})

//SUGGESTIONS -------------------------------------------------------------------------------------


// DEPLACEMENT DES VIDEOS AU CLICK -----------------------------------------------------------------------------------------



//SCROLL SPY -------------------------------------------------------------------------------------------------
    // Ratio d'intersection
    const ratio = 0.6
    const ratioBasMargin = Math.round(window.innerHeight * ratio)
    const ratioHautMargin = Math.round(window.innerHeight - ratioBasMargin - 1)

    // Fonction à effectuer
    var scrollSpy = function(entries2, observerScroll){

        entries2.forEach(function (entry){
            var id2 = entry.target.getAttribute('id')
            var anchor = document.querySelector(`.main .menu .sous-menu.sm-active a[href="#${id2}"]`)

            if (entry.intersectionRatio > 0){
                if (anchor === null){

                } else {
                    // retirer touts les coloriages
                    anchor.parentElement.parentElement.querySelectorAll('li a').forEach(function (node){
                        node.style.borderColor = 'var(--mainColor)'
                        node.style.color = 'var(--mainColor)'
                        node.style.fontWeight = '400'
                        node.style.boxShadow = 'none'
                        })

                    // ajouter les coloriages à l'endroit cible
                    anchor.style.borderColor = 'var(--mainColor2)'
                    anchor.style.color = 'var(--mainColor2)'
                    anchor.style.fontWeight = 'bolder'

                    // anchor.style.boxShadow = '-1.5px 0px var(--suppColor2)'
                }
            }

        })
    }
    // Définition de l'API
    const observerScroll = new IntersectionObserver(scrollSpy, {
        rootMargin: `-${ratioHautMargin}px 0px -${ratioBasMargin}px 0px`
    })
    // Sélection des paragraphes à observer
    var paragraphes = document.querySelectorAll('.main .contenu .scroll-observer.inactive .paragraphe')
    paragraphes.forEach(function (paragraphe){
        observerScroll.observe(paragraphe)
    })

// NAV QUERY-------------------------------------------------------------------------------------------------

var btnNav = document.querySelector('.main nav .nav-btn')
btnNav.addEventListener('click', function(){
    var nav = this.nextSibling.nextSibling
    nav.classList.toggle('nav-inactive')
})


//Bouton texte projet Fiche

var btnFiche = document.querySelectorAll(".fiche .bouton-texte-fiche")
for (let i = 0; i < btnFiche.length; i++) {
    btnFiche[i].addEventListener("click", function() {
      this.firstElementChild.classList.toggle("apparition-texte-fiche")
    })
}
