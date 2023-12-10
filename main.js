const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('.header')
const textauto = $('.auto')
const btnemail = $('.btn--email')
const app ={
    currentIndex: 0,
    describes:['I Enjoy Web Design', 
    'Always Learn To Develop', 
    'Completed Several Projects'],

    render: function(){
        const describe = this.describes[this.currentIndex];
        textauto.innerHTML = `<span class="typewrite">${describe}</span>`;
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

    handleEvents: function(){
        document.onscroll = function(){
            // console.log(window.scrollY);
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            if (scrollTop >= 200){
                heading.classList.add('scroll');
            }
            else {
                heading.classList.remove('scroll');
            }
            // console.log(scrollTop)
        }

        btnemail.onclick = function(){
           
        }
    },

    start: function(){
        
        this.handleEvents();
        this.render();
        
    }
}
app.start(); 
