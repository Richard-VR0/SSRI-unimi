OBJS = main.o func.o
EXEC = main

main: main.o func.o
	gcc -o main main.o func.o -lm
main.o: main.c
	gcc -c main.c
func.o: func.c
	gcc -c func.c
clean:
	rm -f $(OBJS) $(EXEC)