.586
.model flat,stdcall
includelib kernel32.lib

ExitProcess PROTO : DWORD
MessageBoxA PROTO : DWORD, : DWORD, : DWORD, : DWORD

.stack 4096
.const
.data

MB_OK EQU 0  

STR1 DB "Хуторцов Кирилл Владимирович 2 курс 9 группа", 0 
SUM_BUFFER DB 10 DUP(0) ; Буфер для записи числа в прямом порядке
REVERSED_BUFFER DB 10 DUP(0) ; Буфер для записи числа в обратном порядке
HW DD ?  

.data
; Тип данных: unsigned
uchar DWORD 541
; Тип данных: long
intlong DWORD 54453




.code
main PROC
    ; Преобразование и вывод переменной uchar
    xor EAX, EAX        ; Очистка регистра EAX
    mov EAX, uchar      ; Загрузка значения uchar в EAX

    xor EBX, EBX        ; Сброс EBX для индекса буфера
    mov ECX, 10         ; Делитель 10

CONVERT_UCHAR_TO_ASCII:
    xor EDX, EDX        ; Сброс остатка
    div ECX             ; Деление EAX на 10, результат в EAX, остаток в EDX
    add DL, '0'         ; Преобразование остатка в ASCII
    mov SUM_BUFFER[EBX], DL ; Сохранение символа в буфер
    inc EBX             ; Увеличение индекса буфера
    test EAX, EAX       ; Проверка: остались ли цифры для обработки
    jnz CONVERT_UCHAR_TO_ASCII ; Если EAX != 0, повторить

    ; EBX сейчас указывает на первый свободный индекс, уменьшим на 1
    dec EBX

    ; Копирование данных в обратном порядке из SUM_BUFFER в REVERSED_BUFFER
    xor ESI, ESI        ; Сброс индекса для REVERSED_BUFFER
COPY_UCHAR_BUFFER:
    mov AL, SUM_BUFFER[EBX] ; Чтение элемента из конца SUM_BUFFER
    mov REVERSED_BUFFER[ESI], AL ; Запись элемента в REVERSED_BUFFER
    dec EBX             ; Перемещение к предыдущему элементу в SUM_BUFFER
    inc ESI             ; Увеличение индекса в REVERSED_BUFFER
    cmp EBX, -1         ; Проверка, достигли ли начала буфера
    jg COPY_UCHAR_BUFFER ; Если нет, продолжить

    ; Добавить null-терминатор для строки в REVERSED_BUFFER
    mov BYTE PTR REVERSED_BUFFER[ESI], 0

    ; Вывод переменной uchar
    invoke MessageBoxA, HW, OFFSET REVERSED_BUFFER, OFFSET STR1, MB_OK

    ; Преобразование и вывод переменной intlong
    xor EAX, EAX        ; Очистка регистра EAX
    mov EAX, intlong    ; Загрузка значения long в EAX

    xor EBX, EBX        ; Сброс EBX для индекса буфера
    mov ECX, 10         ; Делитель 10

CONVERT_INTLONG_TO_ASCII:
    xor EDX, EDX        ; Сброс остатка
    div ECX             ; Деление EAX на 10, результат в EAX, остаток в EDX
    add DL, '0'         ; Преобразование остатка в ASCII
    mov SUM_BUFFER[EBX], DL ; Сохранение символа в буфер
    inc EBX             ; Увеличение индекса буфера
    test EAX, EAX       ; Проверка: остались ли цифры для обработки
    jnz CONVERT_INTLONG_TO_ASCII ; Если EAX != 0, повторить

    ; EBX сейчас указывает на первый свободный индекс, уменьшим на 1
    dec EBX

    ; Копирование данных в обратном порядке из SUM_BUFFER в REVERSED_BUFFER
    xor ESI, ESI        ; Сброс индекса для REVERSED_BUFFER
COPY_INTLONG_BUFFER:
    mov AL, SUM_BUFFER[EBX] ; Чтение элемента из конца SUM_BUFFER
    mov REVERSED_BUFFER[ESI], AL ; Запись элемента в REVERSED_BUFFER
    dec EBX             ; Перемещение к предыдущему элементу в SUM_BUFFER
    inc ESI             ; Увеличение индекса в REVERSED_BUFFER
    cmp EBX, -1         ; Проверка, достигли ли начала буфера
    jg COPY_INTLONG_BUFFER ; Если нет, продолжить

    ; Добавить null-терминатор для строки в REVERSED_BUFFER
    mov BYTE PTR REVERSED_BUFFER[ESI], 0

    ; Вывод переменной intlong
    invoke MessageBoxA, HW, OFFSET REVERSED_BUFFER, OFFSET STR1, MB_OK

    ; Завершение программы
    push 0  
    CALL ExitProcess 

main ENDP 
end main
