# Travel Applicatie
Een frontend applicatie, geschreven in Reactjs, in opdracht van NOVI Hogeschool. Het thema van deze applicatie is reizen.

![Important page](https://raw.githubusercontent.com/agoodstart/novi-app/master/screenshots/important.png)
## Inleiding
Deze applicatie bestaat uit 2 delen:
* De website: openbaar
* Het dashboard: alleen zichtbaar voor ingelogde gebruikers 

*De werking van het inlogsysteem staat beschreven in het verantwoordingsdocument*

Wanneer je de applicatie opstart kom je om de Homepagina van de website terecht. De belangrijkste pagina zit achter authenticatie. Er dient dus eerst ingelogd te worden. Na het inloggen wordt de gebruiker meteen omgeleid naar het dashboard. Navigeer vanaf hier naar **Add Travel Plan**

Op deze pagina kan je met gebruik van Embedded Google Maps maximaal 5 locaties op de wereld kiezen. De informatie van deze locaties worden aan de rechterkant weergegeven. Na het kiezen van minimaal 2 locaties wordt er een locatie gesuggereerd, op basis van afstand en weer. Uiteindelijk kies je zelf de locatie door op het sterretje naast een locatie in de weergave te klikken. Klik vervolgens op **Save chosen destination** om de locatie op te slaan.

## Benodigdheden
Het enige wat er nodig is zijn de API keys. Deze zijn bijgevoegd als apart pdf bestand bij de eindopdracht.
Verder is het aanzetten van locatieservices op je laptop handig (niet noodzakelijk)

## Installatie instructies
1. Clone deze reposity om de applicatie lokaal te draaien. Voer een van deze commando's uit in je terminal of command prompt:
    - HTTPS: `git clone https://github.com/agoodstart/novi-app.git`
    - SSH: `git clone git@github.com:agoodstart/novi-app.git`
2. Maak in de root map van het project een `.env` bestand aan. Kopieer en plak de gegevens vanuit de bijlage van de eindopdracht.
3. Er is gebruik gemaakt van node versie 16.14.0 en 16.16.0. Probeer aan deze versies te houden. Controleer de huidige versie met `node -v`, en installeer waar nodig de juiste.
4. Voer `npm install` uit in de terminal of command prompt om alle packages en dependencies op te halen.
5. Voer `npm start` uit om de applicatie op te starten. Dit is de enige commando die je nodig hebt

De applicatie maakt gebruik van locatieservices zoals GPS. Wegens privacy redenen voor de gebruiker is dit optioneel (je kan dit dus ook uitlaten). Wanneer je de pagina pagina ***Add Travel Plan*** opent, zal je huidige browser hierom vragen. Wil je gebruik maken van de GPS functionaliteit, controleer op je lokale machine of GPS aanstaat. Controleer ook in de browser of deze functie aanstaat. Ga in de browser naar Settings --> Privacy & Security --> Site Settings --> Location.

## Inloggen
Er wordt gebruik gemaakt van de NOVI backend. Er zijn geen aparte gegevens beschikbaar. Om volledig gebruik te maken van de functionaliteit van de applicatie, graag registreren en inloggen via de applicatie.

## NPM Commando's
De enige NPM commando die gebruikt wordt is `npm start`. `npm build` zou in theorie werken, dit is alleen nooit getest.

## Overige screenshots
![Home Page](https://raw.githubusercontent.com/agoodstart/novi-app/master/screenshots/homepage.png)

![Login Modal](https://raw.githubusercontent.com/agoodstart/novi-app/master/screenshots/loginmodal.png)

![Dashboard Home](https://raw.githubusercontent.com/agoodstart/novi-app/master/screenshots/dashboardhome.png)

![Unauthorized Page](https://raw.githubusercontent.com/agoodstart/novi-app/master/screenshots/unauthorized.png)
