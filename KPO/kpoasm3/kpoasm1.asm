.586
.MODEL FLAT, STDCALL  

includelib kernel32.lib 

ExitProcess PROTO: DWORD 
MessageBoxA PROTO : DWORD, : DWORD, : DWORD, : DWORD 

.STACK 4096  

.CONST
.DATA
Arr BYTE 5, 3, 2, 4, 6, 9  ; Объявление массива байтов
myWords WORD 8Ah, 3Bh, 44h, 5Fh, 99h  ; Объявление массива слов
MB_OK	EQU 0  

STR1	DB "Хуторцов К.В. 2 курс 9 группа", 0 
STR2	DB "Массив содержит нулевой элемент", 0 
STR3	DB "Массив не содержит нулевой элемент", 0 
HW		DD ?  

.CODE

main PROC
START:
	mov ESI, OFFSET myWords  ; Загрузка адреса массива слов в регистр ESI.
	mov AX, [ESI + 4] ;44h  ; Загрузка значения четвертого элемента массива слов в регистр AX.
	mov BX, [ESI + 2] ;3Bh  ; Загрузка значения второго элемента массива слов в регистр BX.

	xor EAX, EAX  ; Обнуление регистра EAX.
	xor EBX, EBX  ; Обнуление регистра EBX.

	add AL, [Arr] ; Добавление значения первого элемента массива байтов к младшему байту регистра AL. 
	add AL, [Arr + 1] 
	add AL, [Arr + 2]  
	add AL, [Arr + 3]  
	add AL, [Arr + 4]  
	add AL, [Arr + 5]  

	xor EAX, EAX  ; Обнуление регистра EAX.
	mov ECX, LENGTHOF Arr  ; Загрузка длины массива байтов в регистр ECX.
	mov EBX, 1  ; Установка значения EBX в 1.

CYCLE:
	cmp [Arr + EAX], 0  ; Сравнение значения элемента массива байтов с 0.
	je TRUE  ; Если равно 0, переход к метке TRUE.
	jne FALSE  ; Если не равно 0, переход к метке FALSE.

TRUE:
	mov EBX, 0  ; Установка значения EBX в 0.
	invoke MessageBoxA, HW, OFFSET STR2, OFFSET STR1, MB_OK 
	jmp ENDOFCYCLE  ; Переход к метке ENDOFCYCLE.

FALSE:
	add EAX, 1  ; Увеличение значения регистра EAX на 1.
	loop CYCLE  ; Повторение цикла, пока значение регистра ECX не станет равным 0.

ENDOFCYCLE:

	cmp EBX, 1  ; Сравнение значения EBX с 1.
	je CHECKF  ; Если равно 1, переход к метке CHECKF.
	jne CHECKT  ; Если не равно 1, переход к метке CHECKT.

CHECKF:
	invoke MessageBoxA, HW, OFFSET STR3, OFFSET STR1, MB_OK  

CHECKT:

	push 0  
	CALL ExitProcess 

main ENDP 
end main  