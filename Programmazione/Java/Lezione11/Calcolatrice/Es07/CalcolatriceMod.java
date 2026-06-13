import java.util.Scanner;

public class CalcolatriceMod {
    public static double somma(double a, double b) {
        return a + b;
    }

    public static double sottrazione(double a, double b) {
        return a - b;
    }

    public static double moltiplicazione(double a, double b) {
        return a * b;
    }

    public static double divisione(double a, double b) {
        return a / b;
    }

    public static void main(String []args) {
        Scanner in = new Scanner(System.in);
        double a, b;
        int scelta;

        System.out.printf("Inserisci il primo numero: ");
        a = in.nextDouble();

        System.out.printf("Inserisci il secondo numero: ");
        b = in.nextDouble();

        do {
            System.out.printf("\n0. Cambia Operandi\n1. Addizione\n2. Sottrazione\n3. Moltiplicazione\n4.Divisione\n5. Esci\n>");
            scelta = in.nextInt();

            if (scelta != 5) {
                switch(scelta) {
                    case 0:
                        System.out.printf("\nInserisci il primo numero: ");
                        a = in.nextDouble();

                        System.out.printf("\nInserisci il secondo numero: ");
                        b = in.nextDouble();
                        break;

                    case 1:
                        System.out.printf("\n%f + %f = %f\n", a, b, somma(a, b));
                        break;

                    case 2:
                        System.out.printf("\n%f - %f = %f\n", a, b, sottrazione(a, b));
                        break;

                    case 3:
                        System.out.printf("\n%f * %f = %f\n", a, b, moltiplicazione(a, b));
                        break;

                    case 4:
                        if (b != 0.0) {
                            System.out.printf("\n%f / %f = %f\n", a, b, divisione(a, b));
                        }
                        else {
                            System.out.printf("Errore! Hai provato ad eseguire una divisione per 0\n");
                        }
                        break;
                    
                    default:
                        System.out.printf("Errore! Operatore non valido\n");
                }
            }

        } while (scelta != 5);
    }
}