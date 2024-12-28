.586
.model flat, stdcall
includelib kernel32.lib

ExitProcess PROTO : DWORD
MessageBoxA PROTO: DWORD, :DWORD, :DWORD, :DWORD

.stack 4096
.const
.data
MB_OK EQU 0
STR1 DB "Программа 2", 0
STR2 DB "Результат сложения = ", 0
HW DD ?
 
.code

main PROC

		MOV ax, 3
		MOV ax, 5
		ADD ax, 5
		ADD ax, 30h					; Преобразуем число в ASCII-символ, добавляя 30h (код '0')
		MOV ebx, LENGTHOF STR2 - 1	; Вычисляем адрес конца строки "Результат сложения = "
		MOV [STR2 + ebx], al		; Копируем младший байт регистра AX (AL) в конец строки STR2

		INVOKE MessageBoxA, HW, OFFSET STR2, OFFSET STR1, MB_OK

		push 0
		call ExitProcess
	main ENDP
end main