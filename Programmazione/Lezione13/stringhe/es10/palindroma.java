import java.util.Scanner;

public class palindroma {
    public static boolean isPalindroma(String letta) {
        boolean palindroma = true;
        int i;

        for(i = 0; i < letta.length() && palindroma == true; i++) {
            if (letta.charAt(i) != letta.charAt(letta.length() - i - 1)) {
                palindroma = false;
            }
        }
        
        return palindroma;
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String letta;
        int i;

        System.out.printf("Scrivi qualcosa: ");
        letta = in.nextLine();

        System.out.printf("%s is palindroma? %b", letta, isPalindroma(letta));
    }
}