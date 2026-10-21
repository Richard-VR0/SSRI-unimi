import {
    cambioForm,
    registra,
    aggiorna,
    elimina,
    login,
    logout,
    isLogged, 
    controlloRistorante,
    controlloCliente 
} from './auth.js';

window.cambioForm = cambioForm;
window.registra = registra;
window.aggiorna = aggiorna;
window.elimina = elimina;
window.login = login;
window.logout = logout;
window.isLogged = isLogged;
window.controlloRistorante = controlloRistorante;
window.controlloCliente = controlloCliente;

import {
    mostraRistoranti,
    cercaRistoranti,
    caricaDettagliRistorante 
} from './ristoranti.js';

window.mostraRistoranti = mostraRistoranti;
window.cercaRistoranti = cercaRistoranti;
window.caricaDettagliRistorante = caricaDettagliRistorante;

import {
    caricaMenu,
    cercaMenu,
    apriRicetta 
} from './menu.js';

window.caricaMenu = caricaMenu;
window.cercaMenu = cercaMenu;
window.apriRicetta = apriRicetta;

import {
    aggiungiAlCarrello,
    aggiornaBadge,
    caricaCarrello,
    rimuoviDalCarrello,
    concludiOrdine 
} from './carrello.js';

window.aggiungiAlCarrello = aggiungiAlCarrello;
window.aggiornaBadge = aggiornaBadge;
window.caricaCarrello = caricaCarrello;
window.rimuoviDalCarrello = rimuoviDalCarrello;
window.concludiOrdine = concludiOrdine;

import {
    caricaOrdiniInviati,
    dashboard,
    avanzaStato,
    aggiornaMenu 
} from './ordini.js';

window.caricaOrdiniInviati = caricaOrdiniInviati;
window.dashboard = dashboard;
window.avanzaStato = avanzaStato;
window.aggiornaMenu = aggiornaMenu;

import {
    togglePassword,
    pulisciDiv
} from './utils.js';

window.togglePassword = togglePassword;
window.pulisciDiv = pulisciDiv;