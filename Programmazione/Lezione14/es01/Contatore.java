public class Contatore {
    int a;

    public Contatore() {
        a = 0;
    }

    public Contatore(int aa) {
        a = aa;
    }

    public void inc() {
        a = a + 1;
    }
    
    public void reset() {
        a = 0;
    }

    public String toString() {
        return String.format("\nContatore: %d\n", a);
    }
}