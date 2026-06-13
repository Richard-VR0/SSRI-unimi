public class Complex {
    float real, imm;

    public Complex() {
        real = 0.0f;
        imm = 0.0f;
    }

    public Complex(float r, float i) {
        real = r;
        imm = i;
    }

    public String toString() {
        return String.format("\n%f %f i\n", real, imm);
    }

    public void sumComplex(Complex n) {
        real += n.real;
        imm += n.real;
    }

    public void subComplex(Complex n) {
        real -= n.real;
        imm -= n.imm;
    }

    public void mulComplex(Complex n) {
        real *= n.real;
        imm *= n.imm;
    }
}