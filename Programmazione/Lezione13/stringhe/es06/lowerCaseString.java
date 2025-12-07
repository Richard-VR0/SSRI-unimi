import java.util.Scanner;

public class lowerCaseString {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String str;

        System.out.printf("Scrivi qualcosa: ");
        str = in.nextLine();

        System.out.printf("\n\n%s", str);

        str = str.toLowerCase();

        System.out.printf("\n\n%s", str);
    }
}