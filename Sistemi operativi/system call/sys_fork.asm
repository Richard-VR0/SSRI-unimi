SECTION .data
    strch   db      'Child process', 0Ah
    strpr   db      'Parent process', 0Ah

SECTION .text
    global _start

_start:
    ; SYS_FORK
    mov eax, 2          ; caricamento in eax del codice della system call sys_fork
    int 80h             ; richiesta di interruzione

    cmp eax, 0          ; confronto con 0 del risultato della fork
    jz .child           ; controllo del risultato della fork, se risultato = 0 salta a .child
    jg .parent          ; controllo del risultato della fork, se risultato > 0 salta a .parent

    mov ebx, eax        ; caricamento in ebx del codice di errore della fork
    jmp .exit           ; salto a .exit per la sys_exit


.child:
    mov edx, 14         ; lunghezza in byte della stringa
    mov ecx, ch         ; base address della variabile creata in .data
    mov ebx, 1          ; file su cui stampare (stdout)
    mov eax, 4          ; caricamento in eax del codice della system call sys_write
    int 80h             ; richiesta di interruzione

    mov ebx, 0          ; codice d'uscita  (successo)
    jmp .exit           ; salto a .exit per la sys_exit

.parent:
    mov edx, 15         ; lunghezza in byte della stringa
    mov ecx, pr         ; base address della variabile creata in .data
    mov ebx, 1          ; file su cui stampare (stdout)
    mov eax, 4          ; caricamento in eax del codice della system call sys_write
    int 80h             ; richiesta di interruzione

    mov ebx, 0          ; codice d'uscita  (successo)
    jmp .exit           ; salto a .exit per la sys_exit

.exit:
    mov eax, 1          ; caricamento in eax del codice della system call sys_exit
    int 80h             ; richiesta di interruzione