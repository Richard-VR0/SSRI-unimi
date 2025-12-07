import java.util.Scanner;

public class inversioneCaratteri {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String letta;

        System.out.printf("Scrivi qualcosa: ");
        letta = in.nextLine();

        String nuova = letta.charAt(letta.length() - 1) + letta.substring(1, letta.length() - 1) + letta.charAt(0);

        System.out.printf("\n\n%s", nuova);
    }
}