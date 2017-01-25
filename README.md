# MAZI Prinzessinengarten

Installation for the Mazi Prinzessinengarten Event



## Install

* clone repository

* go to *src/server/node* 

  * run `npm install` to install dependencies

  * run `cp config.default.js config.js` to copy config file

  * modify password in *config.js*

    ​

## Router Setup

### enable/disable internet and redirect all trafic to rasp pi

- go to network -> wifi -> "the wan wifi" -> disable
- login by ssh : `ssh root@192.168.72.1` uncomment line in */etc/dnsmasq.conf*: `address=/#/192.168.72.2`




## TODO

* Passwort abfrage beim erstellen von Einträgen

* Nicht zugeordnete Attachments farbig markieren

* Nicht-sound-dateien nicht unter Fragen anzeigen

* Deutsch-Englisch Schprachauswahl

* zusätzliche Kategorie mit Datei-Ansicht

* Möglichkeit Sound Aufnahme zu pausieren

* Sound aufnahme auch speichern, wenn nicht auf "Stop" gedrückt wird.

* Erklärung, wie System funktioniert, wo liegen daten, etc...

  ​