(function () {


    var letters = document.querySelectorAll("ul[class=letters] li"),
            password = document.querySelector("ul[class=ans]"),
            button = document.querySelector("button"),
            result = document.querySelector("div[class=span2] img"),
            passwords = ["Ala ma kota",
                "Kapitan Ameryka",
                "Pancernik",
                "Andrzej Duda",
                "Wakacje w Gdańsku",
                "Hetman Zamość"],
            activePassword,
            counter = 5;







    function checkLetter() {


        var indices = [],
                letterIndex = activePassword.indexOf(this.textContent),
                letter = this.textContent,
                field = this,
                licz = 0;


        if (letterIndex !== -1) {
            field.classList.add("disabled");
            while (letterIndex !== -1) {
                indices.push(letterIndex);
                letterIndex = activePassword.indexOf(this.textContent, letterIndex + 1);

            }


            for (var i = 0; i < indices.length; i++) {
                var field = password.children[indices[i]];
                field.textContent = letter;
            }

            for (var i = 0; i < activePassword.length; i++) {

                var test = password.children[i].textContent;
                var test2 = password.children[i];
                if (test !== "" || test2.className === "space") {
                    licz++;
                }
                console.log("licznik: " + licz);
                if (licz === activePassword.length) {
                    alert("Wygrałeś");
                    lose();
                }

            }

        } else {
            counter--;
            switch (counter) {
                case 4:
                    result.src = "img/2.png";
                    break;
                case 3:
                    result.src = "img/3.png";
                    break;
                case 2:
                    result.src = "img/4.png";
                    break;
                case 1:
                    result.src = "img/5.png";
                    break;
                case 0:
                    result.src = "img/6.png";
            }

//        result.textContent = counter;
            if (counter === 0) {
                alert("Przegrałeś");
                lose();
            }
        }
    }

    function lose() {
        disableLetters();
        result.innerHTML = "";

        for (var i = 0; i < letters.length; i++) {
            letters[i].removeEventListener("click", checkLetter, false);
        }

    }

    function randomPassword() {
        var passLength = passwords.length;
        var randomNum = Math.floor(Math.random() * passLength) + 0;

        return passwords[randomNum];
    }

    function enableLetters() {

        for (var i = 0; i < letters.length; i++) {
            letters[i].classList.remove("disabled");
        }

    }

    function disableLetters() {

        for (var i = 0; i < letters.length; i++) {
            letters[i].classList.add("disabled");
        }

    }



    function play() {
        password.innerHTML = "";
        result.src = "img/1.png";
        activePassword = randomPassword().toUpperCase();
        var passLength = activePassword.length;

        for (var i = 0; i < letters.length; i++) {
            letters[i].addEventListener("click", checkLetter, false);
        }

        for (var i = 0; i < passLength; i++) {
            var li = document.createElement("li");

            if (activePassword[i] === " ") {
                li.classList.add("space");
            }
            password.appendChild(li);
        }

        enableLetters();
        counter = 5;
        result.textContent = counter;



    }


    button.addEventListener("click", play, false);

})();

