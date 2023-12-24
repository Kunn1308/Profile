const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const htmlElement = document.documentElement
const girds = $$('.grid')
const heading = $('.header')
const headernav = $('.header__navbar')
const textauto = $('.auto')
const btnemail = $('.btn--email')
const btnmenu = $('.mobile-menu-btn')
const containers = $$('.container-section')
const navbarlist = $('.header__navbar-list')
const progressbars = $$('.progress__bar')
const aboutimfors = $$('.about__imfor-item')
const imformations = $$('.imformation-tiem')
const blogimages = $$('.blog__content-image')
const navitems = $$('.header__navbar-item')
const navlinks = $$('.header__navbar-item-link')
var headerHeight = headernav.clientHeight
const heightnav=['0','749','1605','2771','4396']
const app ={
    currentIndex: 0,
    imageindex: 0,
    describes:['I Enjoy Web Design', 
    'Always Learn To Develop', 
    'Completed Several Projects'],
    render: function(){
        const describe = this.describes[this.currentIndex];
        textauto.innerHTML = ''; // Clear existing content
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < describe.length) {
                // console.log(describe.length,charIndex);
                textauto.innerHTML += describe.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100); // Adjust the speed (milliseconds per character)
            } 
            else {
                
                // Move to the next sentence after typing the current one
                setTimeout(function () {
                    deleteCharacters();
                }, 2000); // Wait for 1 second before moving to the next sentence
            }
        }

        function deleteCharacters() {
            if (charIndex >= 0) {
                // console.log(charIndex + " characters")
                const partialText = describe.substring(0, charIndex);
                textauto.innerHTML = partialText;
                charIndex--;
                setTimeout(deleteCharacters, 100);
                if(charIndex < 0){
                    textauto.innerHTML = partialText+"_";
                } // Adjust the speed (milliseconds per character)
            } else {
                // Move to the next sentence after deleting the current one
                setTimeout(function () {
                    app.currentIndex = (app.currentIndex + 1) % app.describes.length;
                    app.render();
                }, 100); // Wait for 1 second before moving to the next sentence
            }
        }

        typeWriter(); // Start typing the current sentence
    },

    progressbar: function(){
        Array.from(progressbars).map((result,index)=>{
            const progressnow = result.getAttribute('aria-valuenow');
            result.style.width = progressnow + '%';
        })
         
    },



    handleEvents: function(){

        window.onscroll =()=>{
            containers.forEach(sec=>{
                const top = window.scrollY;
                const offset = sec.offsetTop;
                const height = sec.offsetHeight;
                const id = sec.getAttribute('id');
                console.log(id);
                if(top >= offset && top < offset + height){
                    navlinks.forEach((links,index)=>{
                        links.classList.remove('activeme');
                        $('.header__navbar-item a[href="#'+ id +'"]').classList.add('activeme');
                    })
                }
            })
        }

        document.onscroll = function(){
            // console.log(window.scrollY);
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            if (scrollTop >= 200){
                heading.classList.add('scroll');
            }
            else {
                heading.classList.remove('scroll');
            }
            
        }
        
        navitems.forEach((item,index)=>{
            const link = navlinks[index + 1];
            item.onclick = function(){
                console.log(link);
                $('.header__navbar-item-link.activeme').classList.remove('activeme');
                link.classList.add('activeme');
            }

        })

        aboutimfors.forEach((result,index)=>{
            const imformation = imformations[index]
            
            result.onclick = function(){
                // console.log(imformation)
                $('.about__imfor-item.active').classList.remove('active');
                $('.imformation-tiem.active').classList.remove('active');
               this.classList.add('active');
               imformation.classList.add('active');
            }
        })

        // const pagewitdth = htmlElement.clientWidth;
        
        girds.forEach((result, i) => {
            // console.log(result)
            if (i == 2 || i == 3 || i == 5 || i == 7) {
               result.classList.add('grid__full-width');
            }
        })

        blogimages.forEach((image, i) => {
            image.style.backgroundImage = `url('assets/img/blog${i+1}.jpg')`
        })

        btnmenu.onclick = function() {
            var isClosed = headernav.clientHeight === headerHeight
            // console.log(isClosed, headerHeight)
            if(isClosed){
                navbarlist.classList.add('open')
                heading.style.height = 'auto';
            }

            else{
                navbarlist.classList.remove('open')
                heading.style.height = null;
            }
        }
    },

    start: function(){
        
        this.handleEvents();
        this.render();
        this.progressbar();
        
    }
}
app.start(); 
