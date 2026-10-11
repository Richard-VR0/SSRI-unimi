; -------------------------------------------------------
; funzione per il calcolo della lunghezza della stringa
; -------------------------------------------------------
slen:
    push    ebx
    mov     ebx, eax

nextchar:
    cmp     byte [eax], 0
    jz      finished
    inc     eax
    jmp     nextchar

finished:
    sub     eax, ebx
    pop     ebx
    ret

; -------------------------------------------------------
; funzione per la stampa di una stringa
; -------------------------------------------------------
sprint:
    push    edx
    push    ecx
    push    ebx
    push    eax
    call    slen

    mov     edx, eax
    pop     eax

    mov     ecx, eax
    mov     ebx, 1
    mov     eax, 4
    int     80h

    pop     ebx
    pop     ecx
    pop     edx
    ret

; -------------------------------------------------------
; funzione per la stampa di una stringa con ritorno a capo
; -------------------------------------------------------
sprintLF:
    call    sprint

    push    eax        ; push del valore di EAX nello stack per preservare il valore precedente
    mov     eax, 0Ah   ; copia 0Ah (ritorno a capo) nel registro EAX
    push    eax        ; push del valore di EAX nello stack (0Ah)
    mov     eax, esp   ; copia del valroe dello stack pointer in EAX
    call    sprint     ; chiamata alla funzione sprint
    pop     eax        ; pop del valore contenuto nello stack nel registro EAX (0Ah)
    pop     eax        ; ripristino del contenuto originale di EAX
    ret                ; ritorno dalla funzione

; -------------------------------------------------------
; funzione per la chiamata alla SYS_EXIT
; -------------------------------------------------------
quit:
    mov     ebx, 0
    mov     eax, 1
    int     80h
    ret