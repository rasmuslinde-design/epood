Node version 24.9.0
Express 5.2.1

--------------------------------------------------------------------------------

Andmehaldus: Kasutab data.json faili toodete ja lemmikute salvestamiseks.

GET /api/products – Tagastab kõik tooted.

GET /api/categories – Genereerib toodete põhjal unikaalsed kategooriad.

GET /api/products/:id – Leiab konkreetse toote ID järgi.

Lemmikute süsteem: Toetab lemmikute lisamist (POST), vaatamist (GET) ja kustutamist (DELETE) kliendi ID põhiselt.

See moodul tegeleb rakenduse andmete (seisundi) ajutise hoidmisega kliendi brauseris.
--------------------------------------------------------------------------------

Ostukorv:

Kasutab LocalStorage'it, et ostukorvi sisu säiliks ka pärast lehe värskendamist.

Sisaldab meetodeid toodete lisamiseks, koguste muutmiseks ja koguhinna arvutamiseks.

Lemmikud (favorites):

Haldab lemmiktoodete loetelu suhtluses serveriga.

Kasutab sessionStorage'it kliendi unikaalse ID (clientId) tuvastamiseks.

Funktsioon toggleFavorite lisab või eemaldab toote lemmikutest dünaamiliselt.

--------------------------------------------------------------------------------
Kliendiliides ja Loogika (main.js)
See on rakenduse käivituspunkt, mis ühendab serveri andmed ja kasutajaliidese.

Sessiooni algatamine: initSession() loob igale külastajale unikaalse ID, et eristada nende ostukorve ja lemmikuid.

Vaadete juhtimine: showView() tegeleb SPA (Single Page Application) stiilis navigeerimisega, peites ja näidates erinevaid sektsioone (tootenimekiri, detailvaade, ostukorv).

Dünaamiline filtreerimine: renderCategoryFilters() loob serverist saadud andmete põhjal kategooria nupud ja võimaldab tooteid filtreerida.

Andmete pärimine: Alglaadimisel (init()) tõmmatakse serverist kõik tooted ja kategooriad ning kuvatakse need kasutajale.
--------------------------------------------------------------------------------
Sisselogimissüsteem ja Kasutajahaldus
See moodul vastutab kasutaja tuvastamise ja tema eelistuste säilitamise eest.

Hübriidne tuvastamine:  Süsteem kontrollib esmalt localStorage-it, et leida sisselogitud kasutaja.

Kui sisselogimist pole, loob initSession() külastajale unikaalse külalis-ID (clientId), mis salvestatakse sessionStorage-isse. See võimaldab kasutada lemmikute süsteemi ja ostukorvi ilma kohustusliku sisselogimiseta.

Dünaamiline kasutajaliides:  Funktsioon updateAuthUI() muudab reaalajas navigatsiooniriba: sisselogitud kasutajale kuvatakse tervitus ja "Logi välja" nupp, külalisele aga "Logi sisse" valik.

Sisselogimise vaade (login-view) on ehitatud SPA-põhimõttel – see avaneb ilma lehte laadimata ning on tänu Flexboxile alati ekraani keskel.

Andmete püsivus:

Sisselogitud kasutaja nimi salvestatakse brauserisse, et pood tunneks kliendi ära ka pärast lehe sulgemist ja uuesti avamist.

Väljalogimisel puhastatakse andmed ja rakendus suunatakse tagasi avalehele.