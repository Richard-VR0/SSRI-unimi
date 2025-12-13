public class Cerchio {
    double raggio;
    Vett centro;

    public Cerchio() {
        raggio = 0;

        centro = new Vett(0, 0);
    }

    public Cerchio(double raggio) {
        this.raggio = raggio;
        
        centro = new Vett(0, 0);
    }

    public Cerchio(double raggio, Vett centro) {
        this.raggio = raggio;
        
        this.centro = new Vett(centro.x, centro.y);
    }

    public String toString() {
        return String.format("\nRaggio: %f\nCentro: (%f,%f)\n", raggio, centro.x, centro.y);
    }

    public void setRaggio(double raggio) {
        this.raggio = raggio;
    }

    public void setCentro(Vett centro) {
        this.centro = centro;
    }

    public double getCirconferenza() {
        return 2 * Math.PI * raggio;
    }

    public double getArea() {
        return Math.PI * raggio * raggio;
    }

    public Boolean isConcetric(Cerchio c) {
        return this.centro.x == c.centro.x && this.centro.y == c.centro.y;
    }

    private double distanceFromAnothCenter(Cerchio c) {
        return Math.sqrt(Math.pow(this.centro.x - c.centro.x, 2) + Math.pow(this.centro.y - c.centro.y, 2));
    }

    public Boolean contains(Cerchio c) {
        return (distanceFromAnothCenter(c) + this.raggio) <= c.raggio;
    }
}