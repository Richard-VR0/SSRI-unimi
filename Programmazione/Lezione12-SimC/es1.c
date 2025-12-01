#include <stdio.h>

void cifra(char*, int);
void decifra(char*, int);

int main(void) {
    int chiave;
    char str[BUFSIZ];

    printf("Inserisci una chiave: ");
    scanf("%d", &chiave);

    getchar();

    printf("Scrivi qualcosa: ");
    fgets(str, sizeof(str), stdin);
    
    printf("\n\nStringa in chiaro: %s\n", str);

    cifra(str, chiave);

    decifra(str, chiave);

    printf("\nStringa codificata: %s\n\n", str);
    
    return 0;
}

void cifra(char* str, int chiave) {
    int i;

    for (i = 0; *(str+i) != '\0'; i++) {
        *(str+i) = (*(str+i) + chiave);
    }
}

void decifra(char* str, int chiave) {
    int i;

    for (i = 0; *(str+i) != '\0'; i++) {
        *(str+i) = (*(str+i) - chiave);
    }
}