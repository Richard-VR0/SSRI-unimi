; Compile with: nasm -f elf print.asm
; Link with (64 bit systems require elf_i386 option): ld -m elf_i386 print.o -o print
; Run with: ./print

%include        'functions.asm'                             ; inclusione dei file esterni

SECTION .data
msg1    db      'Hello world!', 0Ah, 0h                     ; prima stringa da stampare
msg2    db      'Hello world number two!', 0Ah, 0h          ; seconda stringa da stampare

SECTION .text
global  _start

_start:

    mov     eax, msg1       ; copia dell'indirizzo della prima stringa nel registro EAX
    call    sprint          ; chiamata della funzione sprint
    
    mov     eax, msg2       ; copia dell'indirizzo della prima stringa nel registro EAX
    call    sprint          ; chiamata della funzione sprint

    call    quit            ; chiamata della funzione quit