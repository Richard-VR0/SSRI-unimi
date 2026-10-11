; Compile with: nasm -f elf print-len-subroutine.asm
; Link with (64 bit systems require elf_i386 option): ld -m elf_i386 print-len-subroutine.o -o print-len-subroutine
; Run with: ./print-len-subroutine

SECTION .data
msg     db      'Hello world!', 0Ah
 
SECTION .text
global  _start

_start:

    mov     eax, msg        ; copia dell'indirizzo della stringa nel registro EAX
    call    strlen          ; chiamata alla funzione strlen per calcolare la lunghezza della stringa

    mov     edx, eax        ; copia della lunghezza nel registro EDX al ritorno dalla funzione strlen
    mov     ecx, msg        ; indirizzo della stringa
    mov     ebx, 1          ; indicazione del file su cui scrivere (stdout)
    mov     eax, 4          ; invocazione SYS_WRITE (kernel opcode 4)
    int     80h             ; richiesta di interruzione

    mov     ebx, 0          ; ritorno del valore d'uscita - 0 = No Errors
    mov     eax, 1          ; invocazione SYS_EXIT (kernel opcode 1)
    int     80h             ; richiesta di interruzione

strlen:
    push    ebx             ; push del contenuto di EBX nello stack per preservare il valore precendentemente contenuto
    mov     ebx, eax        ; copia dell'indirizzo da EAX in EBX

nextchar:
    cmp     byte [eax], 0   ; comparazione del puntato dal registro EAX con lo 0 per trovare il terminatore di stringa
    jz      finished        ; salto a finished, se la comparazione ha dato esito positivo
    inc     eax             ; incremento dell'indirizzo in EAX di un byte, perchè non è stato ancora trovato il terminatore di stringa
    jmp     nextchar        ; salto a nextchar, perchè la comparazione ha dato esito negativo

finished:
    sub     eax, ebx        ; sottrazione tra gli indirizzi contenuti nei registri EBX (punta all'inizio della stringa)  e EAX (punta al termine della stringa e salavataggio in EAX
    pop     ebx             ; pop del valore contenuto nello stack nel registro EBX per ripristinare il valore contenuto in precedenza da EBX
    ret                     ; ritorno dalla funzione