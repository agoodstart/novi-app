# Travel Applicatie
Een frontend applicatie, geschreven in Reactjs, in opdracht van NOVI Hogeschool. Het thema van deze applicatie is reizen.
Link naar de git repo: https://github.com/agoodstart/novi-app

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

## Installatie instructies voor first-time-users
Is dit de eerste keer werken met Git of Nodejs, of heb je wat meer uitleg nodig, dan volgen hier uitgebreidere instructies. Staan er stappen tussen die je al hebt uitgevoerd, dan kan je die stappen overslaan.
1. Ga naar de [NodeJS website](https://nodejs.org/en/ "Named link title") en download de LTS versie (dus niet de Current versie). Doorloop de installatie instructies van het programma.
2. Open een command prompt of terminal en type in `node -v`. Als je de installatie instructies goed hebt doorlopen, zal er een node versie te zien zijn in de output.
3. De meeste Operating Systems beschikken al over Git. Mocht dat niet zo zijn, ga naar de [Git website](https://git-scm.com/ "Named link title") en download de laatste versie. Volg de installatie instructies van het programma.
4. Open opnieuw een command prompt of terminal (dus niet dezelfde van stap 2) en type `git -v`. Als het goed is zal de output een Git-versie terugsturen.
5. Nu je beide programma's hebt geinstalleerd, kan je deze repository clonen. Klik rechtsboven in de repository op de groene knop "Code". Je ziet verschillende opties om deze repository op je lokale PC te zetten. Om het makkelijk te maken, gebruik de HTTPS-optie en kopieer het command. 
    - Je kan de repository ook downloaden als ZIP-bestand. Dit raad ik echter af, omdat er dan geen lokale branch is die gelinkt staat met de remote branch. In dat geval kan je geen aanpassingen ophalen die zijn doorgevoerd in deze repository.
6. Plak het command in de terminal en voer het uit. Git zal automatisch alle bestanden ophalen.
7. Open lokaal de repository in een gewenste IDE. Je zal dezelfde mappenstructuur zien als op github, maar er missen nog 2 onderdelen: een node_modules map, en een .env bestand.
8. Zorg dat je in de terminal in de root van deze repository zit. Voer vervolgens het volgende commando uit: `npm install`. Dit zorgt ervoor dat alle benodigde packages worden opgehaald om dit project te ondersteunen. De packages kan je terugzien in package.json, onder "dependencies". Wanneer dit goed verloopt, verschijnt er een node_modules map. Pas hier niets in aan, zorg er alleen voor dat deze map bestaat.
9. Maak handmatig in de root van dit project een bestand .env aan (let op de punt aan het begin). Hier worden alle globale variabelen gedefinieerd wat heel de Reactjs applicatie kan gebruiken. In de bijlage LeestDitEerst.pdf staat onderaan de code met de API keys. Kopieer en plak dit in het .env bestand.
10. Als laatste stap hoef je alleen dit command uit te voeren in de terminal: `npm start` (vanuit de root folder van dit project). Hiermee start je de applicatie op zonder fouten (hoop ik).

De applicatie maakt gebruik van locatieservices zoals GPS. Wegens privacy redenen voor de gebruiker is dit optioneel (je kan dit dus ook uitlaten). Wanneer je de pagina pagina ***Add Travel Plan*** opent, zal je huidige browser hierom vragen. Wil je gebruik maken van de GPS functionaliteit, controleer op je lokale machine of GPS aanstaat. Controleer ook in de browser of deze functie aanstaat. Ga in de browser naar Settings --> Privacy & Security --> Site Settings --> Location.

## Inloggen
Er wordt gebruik gemaakt van de NOVI backend. Er zijn geen aparte gegevens beschikbaar. Om volledig gebruik te maken van de functionaliteit van de applicatie, graag registreren en inloggen via de applicatie.

## NPM Commando's
De enige NPM commando die gebruikt wordt is `npm start`. `npm build` zou in theorie werken, dit is alleen nooit getest.

## Overige screenshots

### Home Page
![Home Page](https://raw.githubusercontent.com/agoodstart/novi-app/master/screenshots/homepage.png)

### Login Modal
![Login Modal](https://raw.githubusercontent.com/agoodstart/novi-app/master/screenshots/loginmodal.png)

### Dashboard Home
![Dashboard Home](https://raw.githubusercontent.com/agoodstart/novi-app/master/screenshots/dashboardhome.png)

### Unauthorized
![Unauthorized Page](https://raw.githubusercontent.com/agoodstart/novi-app/master/screenshots/unauthorized.png)
