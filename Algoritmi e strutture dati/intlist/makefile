CFLAGS = -Wall -ansi -pedantic
OBJS = menu.o itemlist.o item.o key.o
EXEC = menu

$(EXEC): $(OBJS) 
	gcc $(CFLAGS) -o $(EXEC) $(OBJS)
menu.o: menu.c 
	gcc $(CFLAGS) -c menu.c     
itemlist.o: itemlist.c
	gcc $(CFLAGS) -c itemlist.c	
item.o: item.c 
	gcc $(CFLAGS) -c item.c
key.o: key.c 
	gcc $(CFLAGS) -c key.c	
clean:
	rm -f $(EXEC) $(OBJS)	
