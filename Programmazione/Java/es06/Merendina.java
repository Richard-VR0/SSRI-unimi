public class Merendina extends Prodotto {
    private int calorie;

    public Merendina(String nome, int costo, int calorie) {
        super(nome, costo);

        this.calorie = calorie;
    }
    
    public int getCalorie() {
        return calorie;
    }
}