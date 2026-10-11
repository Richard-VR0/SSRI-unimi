; Compile with: nasm -f elf print.asm
; Link with (64 bit systems require elf_i386 option): ld -m elf_i386 print.o -o print
; Run: ./print

SECTION .data
msg     db      'Hello World!', 0Ah

SECTION .text
global  _start

_start:
    ; SYS_WRITE
    mov     edx, 13     ; lunghezza in byte della stringa
    mov     ecx, msg    ; indirizzo della variabile creata in .data
    mov     ebx, 1      ; indicatore file su cui scrivere (stdout)
    mov     eax, 4      ; invocazione SYS_WRITE (kernel opcode 4)
    int     80h         ; richiesta di interruzione

    ; SYS_EXIT
    mov     ebx, 0      ; ritorno del valore d'uscita - 0 = No Errors
    mov     eax, 1      ; invocazione SYS_EXIT (kernel opcode 1)
    int     80h         ; richiesta di interruzione