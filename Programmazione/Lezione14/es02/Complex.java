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

    public toString() {
        return String.format("%f %f i", real, imm);
    }
}