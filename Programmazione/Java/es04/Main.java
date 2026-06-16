public class Main {
    public static void main(String[] args) {
        Hotel hotel = new Hotel();

        // Aggiungi stanze
        hotel.aggiungiStanza(new Standard(101, 2));
        hotel.aggiungiStanza(new Standard(102, 3));
        hotel.aggiungiStanza(new Suite(201, 4, 3));
        hotel.aggiungiStanza(new Suite(202, 2, 2));

        // Assegna stanze
        Stanza s1 = hotel.assegna("Mario Rossi", false, 2);
        System.out.println("\nAssegnata a Mario Rossi: " + s1);

        Stanza s2 = hotel.assegna("Luigi Bianchi", true, 3);
        System.out.println("\nAssegnata a Luigi Bianchi: " + s2);

        // Tenta assegnazione impossibile (nessuna suite con 10 letti)
        Stanza s3 = hotel.assegna("Anna Verdi", true, 10);
        System.out.println("\nAssegnata ad Anna Verdi: " + (s3 == null ? "nessuna stanza disponibile" : s3));

        // Libera una stanza
        Stanza liberata = hotel.liberaStanza("Mario Rossi");
        System.out.println("\nLiberata: " + liberata);

        // Tenta di liberare un ospite inesistente
        Stanza nonEsiste = hotel.liberaStanza("Ospite Fantasma");
        System.out.println("\nRisultato: " + (nonEsiste == null ? "ospite non trovato" : nonEsiste));

        // Stampa riepilogo hotel
        System.out.println(hotel);
    }
}