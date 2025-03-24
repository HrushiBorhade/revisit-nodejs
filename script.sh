for ((i=0; i<10;i++));
do
    curl http://localhost:8000
    echo "GET Request to port 8000"
done;