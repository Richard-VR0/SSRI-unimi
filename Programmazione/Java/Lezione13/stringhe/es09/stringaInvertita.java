import java.util.Scanner;

public class stringaInvertita {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String letta;
        int i;

        System.out.printf("Scrivi qualcosa: ");
        letta = in.nextLine();

        String nuova = "";

        for(i = 0; i < letta.length(); i++) {
            nuova += letta.charAt(letta.length() - i - 1);
        }

        System.out.printf("\n\n%s", nuova);
    }
}