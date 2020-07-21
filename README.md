# Agile Webentwicklung mit Python

<!-- Nr   Name       MatrNr  Studiengang+Sem,   E-mail -->

1. Luis Schweigard, #2023014, INF6, <Luis.Schweigard@hs-augsburg.de>
2. Nico Winkler, #2026523, INF6, <Nico.Winkler@hs-augsburg.de>

## Programm ausführen

### Requirements
Um dieses Programm ausführen zu können, benötigt man `Python >3.7`, `Node.js >10.12` und `yarn 1.22`.

### API/Backend
Um das Backend zu starten, navigiert man zuerst in den `API` Ordner und befolgt dann folgende Schritte:

Die nächsten drei Schritte sind für die Erstellung eines Virtual Environments. Wir empfehlen ein Virtual Environment zu nutzen, da man garantieren kann, dass Dependencies keine Probleme machen. Man kann aber auch einfach die eigene Python Installation als Environment nutzen.
1. Sicher stellen, dass `virtualenv` als Python dependency installiert ist, falls nicht: `pip install virtualenv`
2. Virtual Python Environment erstellen: `python -m venv <VirtualEnvironmentName>`
3. Das Virtual Environment aktivieren: 
- Windows => `<VirtualEnvironmentName>\Scripts\activate.bat`  
- Unix/MacOS => `<VirtualEnvironmentName>/bin/activate`
4. Die in der requirements.txt spezifizierten Dependencies installieren: `pip install -r requirements.txt`
5. Sobald die Installation abgeschlossen ist das Programm starten mit: `uvicorn main:app` oder `uvicorn main:app --reload` um das Programm neuzustarten wenn es eine Änderung in einer Datei gab
6. Das Backend ist nun erreichbar auf `http://localhost:8000`, um die Swagger UI zu nutzen navigiert man auf `http://localhost:8000/docs`

### WebUI/Frontend
Um das Frontend zu starten, navigiert man zuerst in den `WebUI` Ordner und befolgt dann folgene Schritte:
1. Installation der Dependencies: `yarn` (dieser Vorgang kann einige Minuten dauern)
2. Ausführen des Frontends: `yarn start`
3. Das Frontend ist nun erreichbat auf `http://localhost:3000`, es existieren die folgenden Route: `/login`, `/register`, `/exam` und `/home`