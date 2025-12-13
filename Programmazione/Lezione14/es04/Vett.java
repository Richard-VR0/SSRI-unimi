public class Vett {
    double x, y;

    public Vett() {
        x = 0;
        y = 0;
    }

    public Vett(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public String toString() {
        return String.format("\n(%f,%f)\n", x, y);
    }

    public void sumVett(Vett v) {
        this.x = v.x;
        this.y = v.y;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double distanceFromZero() {
        return Math.sqrt(x*x + y*y);
    }
}