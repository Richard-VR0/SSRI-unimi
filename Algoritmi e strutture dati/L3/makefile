main: main.o func.o
	gcc -o main main.o func.o
main.o: main.c
	gcc -c main.c
aux-main.o: func.c
	gcc -c func.c