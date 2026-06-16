import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        Scaffale mio = new Scaffale("fantasy");

        mio.aggiungiLibro(new Libro("Il signore degli Anelli", "Giovanni della Verga"));
        mio.aggiungiLibro(new Libro("Assassyn's Creed Origins", "Giuseppe di Membro"));
        mio.aggiungiLibro(new Libro("Zio Danilo: l'osso è duro ma la carne dentro è un burro", "Manuel Laragosta"));

        mio.visualizzaLibri();

        mio.attivaPrestito(1);
        
        mio.visualizzaLibri();

        mio.attivaPrestito(2);
        
        mio.visualizzaLibri();

        mio.terminaPrestito(1);

        mio.visualizzaLibri();

        mio.visualizzaDisponibili();

        mio.visualizzaInPrestito();

    }
}