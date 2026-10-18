SECTION .data
msg     db      'Hello World!', 0Ah

SECTION .bss
siinput:    resb    255

SECTION .text
global _start

_start:
    ; SYS_WRITE
    mov edx, 13         ; lunghezza in byte della stringa
    mov ecx, msg        ; indirizzo della variabile creata in -data
    mov ebx, 1          ; indicatore file su cui stampare (stdout)
    mov eax, 4          ; invocazione SYS_Write (kernel opccode 4)
    int 80h             ; richiesta di interruzione

    ; SYS_READ
    mov edx, 255        ; numero di byte da leggere
    mov ecx, sinput     ; spazio riservato per salvare l'input (buffer)
    mov ebx, 0          ; indicatore file su cui scrivere (stdin)
    mov eax, 3          ; invocazione SYS_READ (kernel opcode 3)
    int 80h

    ; SYS_EXIT
    mov ebx, 0          ; ritorno del valore d'uscita - 0 = No Errors
    mov eax, 1          ; invocazione SYS_EXIT (kernel opcode 1)
    int 80h             ; richiesta di interruzione