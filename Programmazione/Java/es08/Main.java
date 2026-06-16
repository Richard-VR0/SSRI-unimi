import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Studente studente = new Studente("Riccardo");

        EsameOrale o1 = new EsameOrale("Matematica", 28, "Rossi", 45);
        EsameOrale o2 = new EsameOrale("Fisica", 24, "Bianchi", 30);
        EsameOrale o3 = new EsameOrale("Informatica", 30, "Rossi", 60);
        EsameScritto s1 = new EsameScritto("Inglese", 27, 20, true);
        EsameScritto s2 = new EsameScritto("Storia", 22, 15, false);
        EsameScritto s3 = new EsameScritto("Chimica", 10, 10, false);
        EsameScritto s4 = new EsameScritto("Diritto", 25, 12, true);

        studente.aggiungiEsame(o1);
        studente.aggiungiEsame(o2);
        studente.aggiungiEsame(o3);
        studente.aggiungiEsame(s1);
        studente.aggiungiEsame(s2);
        studente.aggiungiEsame(s3);
        studente.aggiungiEsame(s4);

        System.out.println("=== Lista ordinata per voto ===");
        studente.sort();
        for (Esame e : studente.getListaEsami()) {
            System.out.println(e.materia + " | voto: " + e.voto);
        }

        System.out.println("\n=== Media voti ===");
        System.out.printf("Media: %.2f%n", studente.mediaVoti());

        System.out.println("\n=== Cerca orale (Rossi, voto min 27) ===");
        EsameOrale trovato = studente.cercaOrale("Rossi", 27);
        if (trovato != null) {
            System.out.println("Trovato: " + trovato.materia + " | voto: " + trovato.getVoto() + " | professore: " + trovato.getProfessore());
        } else {
            System.out.println("Nessun esame trovato");
        }

        System.out.println("\n=== Cerca orale (Verdi, voto min 20) ===");
        EsameOrale nonTrovato = studente.cercaOrale("Verdi", 20);
        if (nonTrovato != null) {
            System.out.println("Trovato: " + nonTrovato.materia);
        } else {
            System.out.println("Nessun esame trovato");
        }

        System.out.println("\n=== Esami scritti superati ===");
        ArrayList<EsameScritto> superati = studente.scrittiSuperati();
        if (superati.isEmpty()) {
            System.out.println("Nessun esame superato");
        } else {
            for (EsameScritto s : superati) {
                System.out.println(s.materia + " | voto: " + s.getVoto());
            }
        }

        System.out.println("\n=== Test voto default ===");
        System.out.println("Chimica | voto: " + s3.getVoto() + " (inserito 10, atteso 18)");
    }
}