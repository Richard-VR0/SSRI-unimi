public class Frazione {
    int num, den;

    public Frazione(int num, int den) {
        if (den == 0) {
            throw new IllegalArgumentException("Denominatore zero");
        }

        if (den < 0) {
            num = -num;
            den = -den;
        }

        this.num = num;
        this.den = den;
    }

    public String toString() {
        return String.format("\n%d/%d\n", num, den);
    }

    public Boolean isMinore(Frazione f) {
        return (long) this.num * f.den < (long) f.num * this.den;
    }

    public Boolean isMaggiore(Frazione f) {
        return (long) this.num * f.den > (long) f.num * this.den;
    }

    public Boolean equals(Frazione f) {
        return this.num == f.num && this.den == f.den;
    }

    public Frazione inversa() {
        int aux = num;
        num = den;
        den = aux;
    }

    private int mcd() {
        int a = num, b = den, aux;

        while (b != 0) {
            aux = b;
            b = a % b;
            a = aux;
        }

        return a;
    }

    public Frazione semplifica() {
        int mcd = mcd();

        num /= mcd;
        den /= mcd;
    }
}