SECTION .bss
    sinput:    resb    255

SECTION .text
    global _start

_start:
    ; SYS_READ
    mov edx, 255        ; numero di byte da leggere
    mov ecx, sinput     ; spazio riservato per salvare l'input (buffer)
    mov ebx, 0          ; file su cui scrivere (stdin)
    mov eax, 3          ; caricamento in eax del codice della system call sys_read
    int 80h             ; richiesta di interruzione

    mov ebx, 0          ; caricamento in ebx del valore d'uscita
    mov eax, 1          ; caricamento in eax del codice della system call sys_exit
    int 80h             ; richiesta di interruzione