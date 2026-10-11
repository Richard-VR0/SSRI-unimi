; Compile with: nasm -f elf syscallext.asm
; Link with (64 bit systems require -m elf_i386 option): ld -I /lib/ld-linux.so.2 -lc -e main syscallext.o -o syscallext
; Run with: ./syscallext

segment .text
    global main
    extern printf

main:
    push msg
    call printf             ; chiamata di libreria (stampa mediante funzione printf)

    mov edx, msg_size       ; dimensione della stringa
    mov ecx, msg            ; indirizzo della stringa
    mov ebx, 1              ; file su cui stampare (stdout)
    mov eax, 4              ; invocazione SYS_WRITE (kernel opcode 4)
    int 0x80                ; richiesta di interruzione

    mov eax, 1              ; invocazione SYS_EXIT (kernel opcode 1)
    int 0x80                ; richiesta di interruzione
       

segment .rodata
msg db 'Hello World!',10,0
msg_size equ $ - msg        ; calcolo automatico della lunghezza della stringa