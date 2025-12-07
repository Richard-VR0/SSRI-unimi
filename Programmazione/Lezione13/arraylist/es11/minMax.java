import java.util.Scanner;
import java.util.ArrayList;

public class minMax {
    public static int getMax(ArrayList <Integer> items) {
        int max = items.get(0);

        for(Integer i: items) {
            if (i > max) {
                max = i;
            }
        }

        return max;
    }

    public static int getMin(ArrayList <Integer> items) {
        int min = items.get(0);

        for(Integer i: items) {
            if (i < min) {
                min = i;
            }
        }

        return min;
    }

    public static void main(String[] args) {
        final int N = 0;

        Scanner in = new Scanner(System.in);
        ArrayList <Integer> items = new ArrayList <Integer>();
        int num;

        do {
            System.out.printf("Inserisci un numero: ");
            num = in.nextInt();

            if(num != N) {
                items.add(num);
            }
        } while(num != N);

        System.out.printf("\n\nMassimo: %d\n\nMinimo: %d", getMax(items), getMin(items));
    }
}