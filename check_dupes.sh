grep "id: " src/data/materiaMedica.ts | sort | uniq -c | grep -v "  1 "
