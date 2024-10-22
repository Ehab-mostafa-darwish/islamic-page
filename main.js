//explore button
let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click', () => {
    HadithSection.scrollIntoView({
        behavior: "smooth"
    })
})

let fixedNav = document.querySelector('.header');
scrollBtn = document.querySelector('.scrollBtn')
window.addEventListener("scroll", () => {
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    if (window.scrollY > 500) {
        scrollBtn.classList.add('active')
    } else {
        scrollBtn.classList.remove('active')
    }
})
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
//hadith changer
let hadithcontainer = document.querySelector('.hadithcontainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');

let hadithIndex = 0;
hadithchanger();
function hadithchanger() {
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
        .then(response => response.json())
        .then(data => {

            let Hadiths = data.data.hadiths;

            changeHadith();
            next.addEventListener('click', () => {
                hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
                changeHadith();
            })
            prev.addEventListener('click', () => {
                hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
                changeHadith();
            })
            function changeHadith() {
                hadithcontainer.innerText = Hadiths[hadithIndex].arab;
                number.innerText = `300 - ${hadithIndex + 1}`
            }

        })
}
//end hadiths///////////

let sections = document.querySelectorAll("section");
links = document.querySelectorAll('.header ul li');
links.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.header ul li.active').classList.remove('active')
        link.classList.add('active');
        let target = link.dataset.filter;
        console.log(target)
        sections.forEach(section => {
            if (section.classList.contains(target)) {
                section.scrollIntoView({
                    behavior: "smooth"
                })
            }
        })
    })
});
//end hadith
//start quraan
let surahsContainer = document.querySelector('.surhasContainer');
getSurahs();

function getSurahs() {
    const baseUrl = "http://api.alquran.cloud/v1";
    fetch(`${baseUrl}/meta`)
        .then(response => response.json())
        .then(data => {
            let surahs = data.data.surahs.references;
            let numberOfSurah = 114;
            for (let i = 0; i < numberOfSurah; i++) {
                surahsContainer.innerHTML += `
                    <div class="surah">
                        <p>${surahs[i].name}</p>
                        <p>${surahs[i].englishName}</p>
                    </div>
                `;
            }

            // Select all surah elements
            let SurahTitles = document.querySelectorAll('.surah');
            let popup = document.querySelector('.surah-popup');
            let AyatContainer = document.querySelector('.ayat');

            SurahTitles.forEach((title, index) => {
                title.addEventListener('click', () => {
                    fetch(`${baseUrl}/surah/${index}`)
                        .then(response => response.json())
                        .then(data => {
                            AyatContainer.innerHTML = ""; // Clear previous ayahs
                            let Ayat = data.data.ayahs;
                            Ayat.forEach(aya => {
                                popup.classList.add('active');
                                AyatContainer.innerHTML += `
                                    <p>(${aya.numberInSurah}) - ${aya.text}</p>
                                `;
                            });
                        });
                });
            });

            let closePopup = document.querySelector('.close-popup');
            closePopup.addEventListener('click', () => {
                popup.classList.remove('active');
            });
        });
}


//start the praytime
let cards = document.querySelector('.cards');
getprayTimes();

function getprayTimes() {
    fetch("https://api.aladhan.com/v1/timingsByCity/23-10-2024?city=cairo&country=egypt&method=8")
        .then(response => response.json())
        .then(data => {
            let times = data.data.timings;
            cards.innerHTML = ""; // Clear previous times

            for (let time in times) {
                cards.innerHTML += `  <!-- Use += to append each card -->
                <div class="card">
                    <div class="circle">
                        <svg>
                            <circle cx="100" cy="100" r="100"></circle>
                        </svg>
                        <div class="praytime">
                            ${times[time]}
                        </div>
                    </div>
                    <p>${time}</p>
                </div>
            `;
            }
        })
        .catch(error => console.error('Error fetching prayer times:', error)); // Handle any potential errors
}

let bars = document.querySelector('.bars'),
    SideBar = document.querySelector('.header ul');
bars.addEventListener('click', () => {
    SideBar.classList.toggle("active")
})
