read n;

while inotifywait -e modify data.xml;
 do kill -12 $n;
done


