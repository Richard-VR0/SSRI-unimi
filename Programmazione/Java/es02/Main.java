import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        List<Dipendente> azienda = new ArrayList<>();

        azienda.add(new Programmatore("Mario", "Rossi", 2000, "JavaScript"));
        azienda.add(new Venditore("Luigi", "Bianchi", 1500, 50, 10));

        for (Dipendente d : azienda) {
            System.out.println(d.toString() + "\nStipendio: " + d.calcolaStipendioMensile() + " euro\n");
        }
    }
}