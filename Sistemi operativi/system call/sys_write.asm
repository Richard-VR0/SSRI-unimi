SECTION .data
    msg     db      'Hello World!', 0Ah

SECTION .text
    global _start

_start:
    ; SYS_WRITE
    mov edx, 13         ; lunghezza in byte della stringa
    mov ecx, msg        ; base address della variabile creata in .data
    mov ebx, 1          ; file su cui stampare (stdout)
    mov eax, 4          ; caricamento in eax del codice della system call sys_write
    int 80h             ; richiesta di interruzione

    mov ebx, 0          ; caricamento in ebx del valore d'uscita
    mov eax, 1          ; caricamento in eax del codice della system call sys_exit
    int 80h             ; richiesta di interruzione