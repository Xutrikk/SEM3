.586
.model flat,stdcall
includelib kernel32.lib

ExitProcess PROTO : DWORD
MessageBoxA PROTO : DWORD, : DWORD, : DWORD, : DWORD

.stack 4096
.const
.data

MB_OK EQU 0  

STR1 DB "�������� ������ ������������ 2 ���� 9 ������", 0 
SUM_BUFFER DB 10 DUP(0) ; ����� ��� ������ ����� � ������ �������
REVERSED_BUFFER DB 10 DUP(0) ; ����� ��� ������ ����� � �������� �������
HW DD ?  

.data
; ��� ������: unsigned
uchar DWORD 541
; ��� ������: long
intlong DWORD 54453




.code
main PROC
    ; �������������� � ����� ���������� uchar
    xor EAX, EAX        ; ������� �������� EAX
    mov EAX, uchar      ; �������� �������� uchar � EAX

    xor EBX, EBX        ; ����� EBX ��� ������� ������
    mov ECX, 10         ; �������� 10

CONVERT_UCHAR_TO_ASCII:
    xor EDX, EDX        ; ����� �������
    div ECX             ; ������� EAX �� 10, ��������� � EAX, ������� � EDX
    add DL, '0'         ; �������������� ������� � ASCII
    mov SUM_BUFFER[EBX], DL ; ���������� ������� � �����
    inc EBX             ; ���������� ������� ������
    test EAX, EAX       ; ��������: �������� �� ����� ��� ���������
    jnz CONVERT_UCHAR_TO_ASCII ; ���� EAX != 0, ���������

    ; EBX ������ ��������� �� ������ ��������� ������, �������� �� 1
    dec EBX

    ; ����������� ������ � �������� ������� �� SUM_BUFFER � REVERSED_BUFFER
    xor ESI, ESI        ; ����� ������� ��� REVERSED_BUFFER
COPY_UCHAR_BUFFER:
    mov AL, SUM_BUFFER[EBX] ; ������ �������� �� ����� SUM_BUFFER
    mov REVERSED_BUFFER[ESI], AL ; ������ �������� � REVERSED_BUFFER
    dec EBX             ; ����������� � ����������� �������� � SUM_BUFFER
    inc ESI             ; ���������� ������� � REVERSED_BUFFER
    cmp EBX, -1         ; ��������, �������� �� ������ ������
    jg COPY_UCHAR_BUFFER ; ���� ���, ����������

    ; �������� null-���������� ��� ������ � REVERSED_BUFFER
    mov BYTE PTR REVERSED_BUFFER[ESI], 0

    ; ����� ���������� uchar
    invoke MessageBoxA, HW, OFFSET REVERSED_BUFFER, OFFSET STR1, MB_OK

    ; �������������� � ����� ���������� intlong
    xor EAX, EAX        ; ������� �������� EAX
    mov EAX, intlong    ; �������� �������� long � EAX

    xor EBX, EBX        ; ����� EBX ��� ������� ������
    mov ECX, 10         ; �������� 10

CONVERT_INTLONG_TO_ASCII:
    xor EDX, EDX        ; ����� �������
    div ECX             ; ������� EAX �� 10, ��������� � EAX, ������� � EDX
    add DL, '0'         ; �������������� ������� � ASCII
    mov SUM_BUFFER[EBX], DL ; ���������� ������� � �����
    inc EBX             ; ���������� ������� ������
    test EAX, EAX       ; ��������: �������� �� ����� ��� ���������
    jnz CONVERT_INTLONG_TO_ASCII ; ���� EAX != 0, ���������

    ; EBX ������ ��������� �� ������ ��������� ������, �������� �� 1
    dec EBX

    ; ����������� ������ � �������� ������� �� SUM_BUFFER � REVERSED_BUFFER
    xor ESI, ESI        ; ����� ������� ��� REVERSED_BUFFER
COPY_INTLONG_BUFFER:
    mov AL, SUM_BUFFER[EBX] ; ������ �������� �� ����� SUM_BUFFER
    mov REVERSED_BUFFER[ESI], AL ; ������ �������� � REVERSED_BUFFER
    dec EBX             ; ����������� � ����������� �������� � SUM_BUFFER
    inc ESI             ; ���������� ������� � REVERSED_BUFFER
    cmp EBX, -1         ; ��������, �������� �� ������ ������
    jg COPY_INTLONG_BUFFER ; ���� ���, ����������

    ; �������� null-���������� ��� ������ � REVERSED_BUFFER
    mov BYTE PTR REVERSED_BUFFER[ESI], 0

    ; ����� ���������� intlong
    invoke MessageBoxA, HW, OFFSET REVERSED_BUFFER, OFFSET STR1, MB_OK

    ; ���������� ���������
    push 0  
    CALL ExitProcess 

main ENDP 
end main
