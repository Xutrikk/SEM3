.586
.model flat, stdcall
includelib kernel32.lib

ExitProcess PROTO : DWORD
MessageBoxA PROTO: DWORD, :DWORD, :DWORD, :DWORD

.stack 4096
.const
.data
MB_OK EQU 0
STR1 DB "��������� 2", 0
STR2 DB "��������� �������� = ", 0
HW DD ?
 
.code

main PROC

		MOV ax, 3
		MOV ax, 5
		ADD ax, 5
		ADD ax, 30h					; ����������� ����� � ASCII-������, �������� 30h (��� '0')
		MOV ebx, LENGTHOF STR2 - 1	; ��������� ����� ����� ������ "��������� �������� = "
		MOV [STR2 + ebx], al		; �������� ������� ���� �������� AX (AL) � ����� ������ STR2

		INVOKE MessageBoxA, HW, OFFSET STR2, OFFSET STR1, MB_OK

		push 0
		call ExitProcess
	main ENDP
end main