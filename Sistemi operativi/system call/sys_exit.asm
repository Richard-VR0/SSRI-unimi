SECTION .text
    global _start

_start:
    ; SYS_EXIT
    mov ebx, 0          ; caricamento in ebx del valore d'uscita (0 = successo, 1 - 255 = codice d'errore)
    mov eax, 1          ; caricamento in eax del codice della system call sys_exit
    int 80h             ; richiesta di interruzione