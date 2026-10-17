# Con test di esistenza
if [ -f /bin/dog ] ; then echo "Trovato" ; else echo "Non trovato" ; fi
if [ -f /bin/cat ] ; then echo "Trovato" ; else echo "Non trovato" ; fi
if [ -f /bin/fish ] ; then echo "Trovato" ; else echo "Non trovato" ; fi

# Con /bin/ls
if /bin/ls /bin/dog &> /dev/null ; then echo "Trovato" ; else echo "Non trovato" ; fi
if /bin/ls /bin/cat &> /dev/null ; then echo "Trovato" ; else echo "Non trovato" ; fi
if /bin/ls /bin/fish &> /dev/null ; then echo "Trovato" ; else echo "Non trovato" ; fi