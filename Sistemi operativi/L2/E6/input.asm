; Compile with: nasm -f elf input.asm
; Link with (64 bit systems require elf_i386 option): ld -m elf_i386 input.o -o input
; Run with: ./input

%include        'functions.asm'                         ; inclusione dei file esterni

SECTION .data
msg1        db      'Please enter your name: ', 0h      ; stringa da stampare per richiedere l'input all'utente
msg2        db      'Hello, ', 0h                       ; stringa da stampare dopo l'input dell'utente

SECTION .bss
sinput:     resb    255                                ; reserve a 255 byte space in memory for the users input string

SECTION .text
global  _start

_start:

    mov     eax, msg1       ; copia dell'indirizzo della stringa nel registro EAX
    call    sprint          ; chiamata alla funzione sprint

    mov     edx, 255        ; numero di byte da leggere
    mov     ecx, sinput     ; spazio riservato per salvare l'input (buffer)
    mov     ebx, 0          ; scrittura su file stdin
    mov     eax, 3          ; invocazione SYS_READ (kernel opcode 3)
    int     80h             ; richiesta di interruzione

    mov     eax, msg2       ; copia dell'indirizzo della stringa nel registro EAX
    call    sprint          ; chiamata alla funzione sprint

    mov     eax, sinput     ; copia del valore inserito dall'utente
    call    sprint          ; chiamata alla funzione sprint

    call    quit            ; chiamata alla funzione quit