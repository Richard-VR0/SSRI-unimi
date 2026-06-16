public abstract class Veicolo implements Comparable<Veicolo> {
    protected String targa;
    protected String modello;
    protected int anno;
    protected int numNoleggi;

    public Veicolo(String targa, String modello, int anno) {
        this.targa = targa;
        this.modello = modello;

        if (anno >= 1800 && anno <= 2025) {
            this.anno = anno;
        }
        else {
            this.anno = 2025;
        }

        this.numNoleggi = 0;
    }
    
    public int getAnno() {
        return anno;
    }

    public String getModello() {
        return modello;
    }

    public int getNumNoleggi() {
        return numNoleggi;
    }

    public void aggiornaNumeroNoleggi() {
        this.numNoleggi += 1;
    }

    @Override
    public int compareTo(Veicolo altro) {
        return this.anno - altro.anno;
    }
}