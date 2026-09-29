begin Alg1(list)
    for each i from 0 to list.length-2 do
        for each j from i to list.length-2 do
            if list[j] > list[j+1]
                swap(list[j], list[j+1])
            end if
        end for
    end for
    
    return list
end Alg1