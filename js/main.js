document.addEventListener('DOMContentLoaded', async () => {
  const localStoragelang = localStorage.getItem('vengLang');
  // elements
  //nav
  const links = document.querySelectorAll('nav ul.links li.link');
  const navButton = document.querySelector('.nav-button');
  const navMenu = document.querySelector('nav ul');
  const langContainer = document.querySelector('.languages-container');
  const languages = document.querySelectorAll('.languages-container li');

  // intro
  const introTitle = document.querySelector('.intro h2');
  const introText = document.querySelector('.intro .copy');

  // services
  const serviceTitle = document.querySelector('section.service h2');
  const cards = document.querySelectorAll('.cards .card');

  // footer
  const footerCopy = document.querySelector('footer .copy');

  const year = new Date().getFullYear();

  const selectLang = (ln) => {
    const activeLanguage = document.querySelector('.languages-container li.active');
    const wrapper = document.querySelector('.languages-container .wrapper');
    activeLanguage.classList.remove('active');
    const lang = ln.classList[0];
    ln.classList.add('active');
    wrapper.prepend(ln);
    localStorage.setItem('vengLang', lang);
  };

  const loadJson = async (lang) => {
    const res = await fetch(`../lang/${lang}.json`);
    const data = await res.json();
    return data[lang];
  };

  // change content to selected language
  const loadSelectedContents = (data) => {
    //navbar links
    links.forEach((link, idx) => {
      link.querySelector('a').innerHTML = data.links[idx];
    });
    //intro
    introTitle.innerHTML = data.intro.introTitle;
    introText.innerHTML = data.intro.text;
    //service
    serviceTitle.innerHTML = data.services.servicesTitle;
    cards.forEach((card, idx) => {
      card.querySelector('.image-container .text').innerHTML = data.services.serviceItems[idx].title;
      card.querySelector('.copy').innerHTML = data.services.serviceItems[idx].service;
    });
  };

  if (localStoragelang) {
    const langItem = document.querySelector(`.languages-container li.${localStoragelang}`);
    selectLang(langItem);
    const data = await loadJson(localStoragelang);

    // change content to selected language
    loadSelectedContents(data);
  }

  navButton.addEventListener('click', () => {
    navButton.classList.toggle('open');
    if (navButton.classList.contains('open')) {
      navMenu.classList.remove('mobile');
    } else {
      navMenu.classList.add('mobile');
    }
  });

  footerCopy.innerHTML = `© ${year} Veng Media. All Rights Reserved`;

  //open languages
  langContainer.addEventListener('click', function () {
    this.classList.toggle('open');
  });

  // click on language
  languages.forEach((ln) => {
    ln.addEventListener('click', async (e) => {
      if (langContainer.classList.contains('open')) {
        if (e.target.closest('.active')) {
          return;
        }
        selectLang(ln);
        const data = await loadJson(ln.classList[0]);
        loadSelectedContents(data);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.languages-container')) {
      langContainer.classList.remove('open');
    }
  });
});
